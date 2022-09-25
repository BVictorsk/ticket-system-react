import { useState } from 'react'
import Header from '../../components/header/header';
import Title from '../../components/title/title'
// import { AuthContext } from '../../context/user'
import './dashboard.style.css' 
import { FiMessageSquare, FiPlus } from 'react-icons/fi'
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [tickets, steTickets] = useState([]);

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
          </>
        )}

      </div>

    </div>
  )
}
