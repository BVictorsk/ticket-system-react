import { useState, useEffect } from 'react'
import Header from '../../components/header/header';
import Title from '../../components/title/title'
// import { AuthContext } from '../../context/user'
import './dashboard.style.css' 
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import firebase from '../../services/firebaseConfig'
import { format } from 'date-fns'
import Modal from '../../components/modal/modal';

const listRef = firebase.firestore().collection('tickets').orderBy('created', 'desc');

export default function Dashboard(){
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [lastDocs, setLastDocs] = useState();

  const [showPostModal, setShowPostModal] = useState(false);
  const [detail, setDetail] = useState();

  useEffect(()=> {
    async function loadTickets(){
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

    loadTickets();

    return () => {

    }
  }, []);


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


  async function handleMore(){
    setLoadingMore(true);
    await listRef.startAfter(lastDocs).limit(5)
    .get()
    .then((snapshot)=>{
      updateState(snapshot)
    })
  }

  function togglePostModal(item) {
    setShowPostModal(!showPostModal)
    setDetail(item)
  }
 

  if(loading){
    return(
      <div>
        <Header/>

        <div className="content">
          <Title name="Atendimentos">
            <FiMessageSquare size={25} />
          </Title>  

          <div className="container dashboard">
            <span>Buscando chamados...</span>
          </div>

        </div>      
      </div>
    )
  }

  return(
    <div>
      <Header/>

      <div className="content">
        <Title name="Atendimentos">
          <FiMessageSquare size={25} />
        </Title>

        {tickets.length === 0 ? (
          <div className="container dashboard">
            <span>Nenhum chamado registrado...</span>

            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>
          </div>
        )  : (
          <>
            <Link to="/new" className="new">
              <FiPlus size={25} color="#FFF" />
              Novo chamado
            </Link>

            <table>
              <thead>
                <tr>
                  <th scope="col">Cliente</th>
                  <th scope="col">Assunto</th>
                  <th scope="col">Status</th>
                  <th scope="col">Cadastrado em</th>
                  <th scope="col">#</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((item, index)=>{
                  return(
                    <tr key={index}>
                      <td data-label="Cliente">{item.client}</td>
                      <td data-label="Assunto">{item.subject}</td>
                      <td data-label="Status">
                        <span className="badge" style={{ backgroundColor: item.status === 'Aberto' ? '#5cb85c' : '#999' }}>{item.status}</span>
                      </td>
                      <td data-label="Cadastrado">{item.createdFormated}</td>
                      <td data-label="#">
                        <button className="action" style={{backgroundColor: '#3583f6' }} onClick={() => togglePostModal(item)}>
                          <FiSearch color="#FFF" size={17} />
                        </button>
                        <button className="action" style={{backgroundColor: '#F6a935' }}>
                          <FiEdit2 color="#FFF" size={17} />
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            
            {loadingMore && <h3 style={{textAlign: 'center', marginTop: 15 }}>Buscando dados...</h3>}
            { !loadingMore && !isEmpty && <button className="button-more" onClick={handleMore}>Buscar mais</button> }

          </>
        )}

      </div>

      {showPostModal && (
        <Modal 
          content={detail}
          close={togglePostModal}
        />
      )}

    </div>
  )
}