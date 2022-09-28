import { useState, useEffect } from 'react'
import Header from '../../components/header/header';
import Title from '../../components/title/title'
// import { AuthContext } from '../../context/user'
import './dashboard.style.css' 
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import firebase from '../../services/firebaseConfig'
import { format } from 'date-fns'

const listRef = firebase.firestore().collection('tickets').orderBy('created', 'desc');

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState();


  useEffect(()=> {

    loadChamados();

    return () => {

    }
  }, []);

  
  async function loadChamados(){
    await listRef.limit(5)
    .get()
    .then((snapshot) => {
      updateState(snapshot)
    })
    .catch((err)=>{
      console.log('Deu algum erro: ', err);
      setLoadingMore(false);
    })

    setLoading(false);

  }


  async function updateState(snapshot){
    const isCollectionEmpty = snapshot.size === 0;

    if(!isCollectionEmpty){
      let list = [];

      snapshot.forEach((doc)=>{
        list.push({
          id: doc.id,
          subject: doc.data().subject,
          client: doc.data().client,
          clientId: doc.data().clientId,
          created: doc.data().created,
          createdFormated: format(doc.data().created.toDate(), 'dd/MM/yyyy'),
          status: doc.data().status,
          description: doc.data().description
        })
      })

      const lastDoc = snapshot.docs[snapshot.docs.length -1]; //Pegando o ultimo documento buscado

      setTickets(tickets => [...tickets, ...list]);
      setLastDocs(lastDoc);

    }else{
      setIsEmpty(true);
    }

    setLoadingMore(false);

  }
 
  return (
    <div>
      <Header />

      <div className="content">
        <Title name="Atendimentos" >
        <FiMessageSquare size={25} />
        </Title>

        {tickets.length === 0 ? (
          <div className="container dashboard">
            <span>Nenhum chamado registrado</span>
        
            <Link to="/new" className="new">
              <FiPlus size={25} color="fff" />
              Novo chamado
             </Link>
          </div>
        ) : (
          <>
            <Link to="/new" className="new">
              <FiPlus size={25} color="fff" />
              Novo chamado
            </Link>

            <table>

              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Status</th>
                  <th scope="col">Criado em</th>
                  <th scope="col">#</th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td data-label="Cliente">Cliente teste</td>
                  <td data-label="Assunto">Suporte</td>
                  <td data-label="Status">
                    <span className="badge" style={{backgroundColor: "#52b69a"}}>Em aberto</span>
                  </td>
                  <td data-label="Criado">24/09/2022</td>
                  <td data-label="#">
                    <button className="action" style={{backgroundColor: '#00a896'}}>
                      <FiSearch color="#f8f9fa" size={17} />
                    </button>
                    <button className="action" style={{backgroundColor: '#f3722c'}}>
                      <FiEdit2 color="#f8f9fa" size={17} />
                    </button>
                  </td>
                </tr>
              </tbody>

            </table>
          </>
        )}

      </div>

    </div>
  )
}
