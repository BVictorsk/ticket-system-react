import { useContext } from 'react'
import { AuthContext } from '../../context/user'

export default function Dashboard() {
  const { signOut } = useContext(AuthContext);
  return (
    <>
    <div>Pagina Dashboard</div>
    <button onClick={() => signOut()}>fazer logout</button>
    </>
  )
}
