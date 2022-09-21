import { useContext } from 'react'
import { AuthContext } from '../../context/user'
import { Link } from 'react-router-dom'
import { FiHome, FiUser, FiSettings } from "react-icons/fi";
import './style.css'
import avatar from "../../assets/avatar.png"

export const Header = () => {
    const { user } = useContext(AuthContext)
    
  return (
    <div className="sidebar">
        <div>
            <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="avatar" />
        </div>

        <Link to="/dashboard">
        <FiHome color="fff" size={34} />
        Chamados
        </Link>
        <Link to="/dashboard">
        <FiUser color="fff" size={34} />
        Clientes
        </Link>
        <Link to="/dashboard">
        <FiSettings color="fff" size={34} />
        Configurações
        </Link>
    </div>
  )
}
