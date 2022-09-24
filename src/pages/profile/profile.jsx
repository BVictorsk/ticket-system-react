import { useContext, useState } from "react"
import { AuthContext } from "../../context/user"
import Header from "../../components/header/header"
import Title from "../../components/title/title"
import { FiSettings, FiUpload } from 'react-icons/fi'
import firebase from "../../services/firebaseConfig"
import "./profile.style.css"
import avatar from "../../assets/avatar.png"

export default function Profile() {
  const { user, signOut, setUser, storageUser } = useContext(AuthContext);

  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);


  //preview da imagem
  function handleFile(e) {

    if(e.target.files[0]) {
      const image = e.target.files[0];

      if( image.type === "image/jpeg" || image.type === 'image/png'  ) {
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(e.target.files[0]))
      } else {
        alert('Envie uma imagem do tipo PNG ou JPG');
        setImageAvatar(null);
        return null;
      }

    }
    
  }


  async function handleUpload() {
    const  currentUid = user.uid;

    const uploadTask = await firebase.storage().ref(`images/${currentUid}/${imageAvatar.name}`)
    .put(imageAvatar).then(async () => {
      console.log('foto enviada com sucesso');

      await firebase.storage().ref(`images/${currentUid}`).child(imageAvatar.name).
      getDownloadURL().then( async (url) => {
        let urlPicture = url;

        await firebase.firestore().collection('users').doc(user.uid).update({
          avatar: urlPicture,
          name: name
        })
        .then(() => {
          let data  ={
            ...user,
            avatarUrl: urlPicture,
            name: name
          };
          setUser(data);
          storageUser(data);
        })
      })
      
    })

  }

  //salvar alteração
   async function handleSave(e) {
    e.preventDefault();

    if(imageAvatar === null & name !== '') {

      await firebase.firestore().collection('users').doc(user.uid).update({
        name: name
      }).then( () => {
        let data = {
          ...user,
          name: name
        };

        setUser(data);
        storageUser(data);

      }) 

    }

    else if(name !== '' && imageAvatar !== null) {
      handleUpload();
    }

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
                <input type="file" accept="image/*" onChange={handleFile } /><br />
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
