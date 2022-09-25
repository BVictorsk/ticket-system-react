import { useState } from 'react'
import Header from '../../components/header/header';
import Title from '../../components/title/title'
// import { AuthContext } from '../../context/user'
import './dashboard.style.css' 
import { FiMessageSquare, FiPlus, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [tickets, steTickets] = useState([1]);

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
