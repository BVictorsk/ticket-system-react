import { useContext } from 'react'
import { AuthContext } from '../../context/user'
import { Link } from 'react-router-dom'
import { FiHome, FiUser, FiSettings } from "react-icons/fi";
import './header.css'
import avatar from "../../assets/avatar.png"

export default function Header (){
    const { user } = useContext(AuthContext)
    
  return (
    <div className="sidebar">
        <div>
            <img src={user.avatarUrl === null ? avatar : user.avatarUrl} alt="avatar" />
        </div>

        <Link to="/dashboard">
        <FiHome color="e9ecef" size={34} />
        Chamados
        </Link>
        <Link to="/customers">
        <FiUser color="e9ecef" size={34} />
        Clientes
        </Link>
        <Link to="/profile">
        <FiSettings color="e9ecef" size={34} />
        Configurações
        </Link>
    </div>
  )
}
