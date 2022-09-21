import { useContext } from 'react'
import Header from '../../components/header/header';
import { AuthContext } from '../../context/user'

export default function Dashboard() {
  const { signOut } = useContext(AuthContext);
  return (
    <div>
      <Header />
      <div>Pagina Dashboard</div>
      <button onClick={() => signOut()}>fazer logout</button>
    </div>
  )
}
