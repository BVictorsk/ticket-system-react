import Header from "../../components/header/header"
import Title from "../../components/title/title"
import { FiSettings } from 'react-icons/fi'
import "./style.css"

export default function Profile() {
  return (
    <div>
        <Header />

        <div className="content">
          <Title name="Meu perfil" >
            <FiSettings size={25} />
          </Title>
        </div>
    </div>
  )
}
