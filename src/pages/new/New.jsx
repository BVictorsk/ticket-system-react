import { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/user';
import { FiPlus } from 'react-icons/fi'
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router';
import firebase from '../../services/firebaseConfig';
import Title from '../../components/title/title';
import Header from '../../components/header/header';
import './new.style.css'

export default function New() {
    const [loadCustomers, setLoadCustomers] = useState(true)
    const [customers, setCustomers] = useState([])
    const [customerSelected, setCustomerSelected] = useState(0) 
    const [subject, setSubject] = useState('Suporte')
    const [status, setStatus] = useState('Aberto')
    const [description, setDescription] = useState('');
    const [ idCustomer, setIdCustomer ] = useState(false);

    const { user } = useContext(AuthContext);
    const { id } = useParams();

    const history = useHistory()

    useEffect(() => {
        async function loadCustomers() {
            await firebase.firestore().collection('customers').get()
            .then((snapshot) => {
                let list = [];

                snapshot.forEach((doc) => {
                    list.push({
                        id: doc.id,
                        fantasyName: doc.data().fantasyName,
                    })
                })

                if(list.length === 0){
                    console.log('nenhuma empresa encontrada');
                    setCustomers([ {id: 1, fantasyName: 'freela'}]);
                    setLoadCustomers(false);
                    return;
                }

                setCustomers(list);
                setLoadCustomers(false);

                if(id) {
                    loadId(list);
                }

            })
            .catch((err) => {
                console.error("deu algum erro", err)
                setLoadCustomers(false);
                setCustomers([ {id: 1, fantasyName: ''} ])
            })
        }

        loadCustomers();

    }, [])

    async function loadId(list) {
        await firebase.firestore().collection('tickets').doc(id).get()
        .then((snapshot) => {
            setSubject(snapshot.data().subject);
            setStatus(snapshot.data().status);
            setDescription(snapshot.data().description);

            let index = list.findIndex(item => item.id === snapshot.data().clientId);
            setCustomerSelected(index);
            setIdCustomer(true)
        })
        .catch(err => {
            console.error('Erro no id passado',err);
            setIdCustomer(false)
        })
    }

    //registrar novo chamado
    async function handleRegister(e) {
        e.preventDefault();

        if(idCustomer) {
            await firebase.firestore().collection('tickets').doc(id)
            .update({
                client: customers[customerSelected].fantasyName,
                clientId: customers[customerSelected].id,
                subject: subject,
                status: status,
                description: description,
                userId: user.uid
            })
            .then(() => {
                toast.success("Chamado editado com sucesso");
                setCustomerSelected(0);
                setDescription('');
                history.push('/dashboard');
            })
            .catch((err) => {
                toast.error('Ops erro ao registrar')
                console.log(err)
            })

            return ;
        }

        await firebase.firestore().collection('tickets').add({
            created: new Date(),
            client: customers[customerSelected].fantasyName,
            clientId: customers[customerSelected].id,
            subject: subject,
            status: status,
            description: description,
            userId: user.uid
        }).then(() => {
            toast.success("Chamado registrado com sucesso")
            setDescription('');
            setCustomerSelected(0)
        })
        .catch((error) => {
            toast.error("Erro ao registrar, tente novamente mais tarde")
            console.error(error)
        })
    }

    //troca de assunto
    function handleChangeSelect(e) {
        setSubject(e.target.value);
    }

    //troca de status
    function handleOptionChange(e) {
        setStatus(e.target.value);
    }
    
    //troca de clientes     
    function handleChangeCustomers(e) {
        // console.log('index do cliente selecionado: ', e.target.value);
        //  console.log('Cliente selecionado: ', customers[e.target.value]);
         setCustomerSelected(e.target.value)
    }

  return (
    <div>
        <Header />

        <div className="content">
            <Title name="Novo chamado">
                <FiPlus size={25} />
            </Title>

            <div className="container">

                <form className="form-profile" onSubmit={handleRegister}>

                    <label>Cliente</label>

                    {loadCustomers ? (
                        <input type="text" disabled={true} value="Carregando Clientes" />
                    ) : (
                        <select value={customerSelected} onChange={handleChangeCustomers} >
                            {customers.map((item, index) => {
                                return(
                                    <option key={item.id} value={index} >
                                        {item.fantasyName}
                                    </option>
                                )
                            })}
                        </select>
                    ) }


                    <label>Assunto</label>
                    <select value={subject} onChange={handleChangeSelect} >
                        <option value="Financeiro">Financeiro</option>
                        <option value="Suporte">Suporte</option>
                        <option value="Visita tecnica">Visita tecnica</option>
                    </select>

                    <label>Status</label>
                    <div className="status">
                        <input type="radio" name="radio" value="Aberto" onChange={handleOptionChange} checked={status === 'Aberto'} />
                        <span>Em Aberto</span>

                        <input type="radio" name="radio" value="Em Andamento" onChange={handleOptionChange} checked={status === 'Em Andamento'}  />
                        <span>Em Andamento</span>

                        <input type="radio" name="radio" value="Finalizado" onChange={handleOptionChange} checked={status === 'Finalizado'}  />
                        <span>Finalizado</span>
                    </div>

                    <label>Descri????o</label>
                    <textarea type="text" placeholder="Descri????o do problema" value={description}  onChange={(e) => setDescription(e.target.value)} />

                    <button type="submit">Registrar</button> 

                </form>

            </div>

        </div>

    </div>
  )
}