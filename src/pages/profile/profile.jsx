import { useContext, useState } from "react"
import { AuthContext } from "../../context/user"
import Header from "../../components/header/header"
import Title from "../../components/title/title"
import { FiSettings, FiUpload } from 'react-icons/fi'
import "./profile.style.css"
import avatar from "../../assets/avatar.png"

export default function Profile() {
  const { user, signOut } = useContext(AuthContext);

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);

   function handleSave() {
    alert('Save')
   }

  return (
    <div>
        <Header />

        <div className="content">
          <Title name="Meu perfil" color="212529">
            <FiSettings size={25} color="212529" />
          </Title>

          <div className="container">
            <form className="form-profile" onSubmit={handleSave} >
              <label className="label-avatar">
                <span>
                  <FiUpload color="#adb5bd" size={25} />
                </span>
                <input type="file" accept="image/*" /><br />
                { avatarUrl === null ? 
                <img src={avatar} width="250" height="250" alt="foto de perfil do usuário"/>
                :
                <img src={avatarUrl} width="250" height="250" alt="foto de perfil do usuário"/>
                 }
              </label>

              <label>Nome</label>
              <input type="text" value={name} onChange={ e => setName(e.target.value) } />

              <label>E-mail</label>
              <input type="text" value={email} disabled />

              <button Type="submit">Salvar</button>

            </form>
          </div>

          <div className="container">
            <button className="logout-button" onClick={() => signOut()}>Sair</button>
          </div>

        </div>
    </div>
  )
}
