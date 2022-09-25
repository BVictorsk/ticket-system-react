import { useState } from 'react'
import Title from '../../components/title/title';
import Header from '../../components/header/header';
import { FiPlus } from 'react-icons/fi'
import './new.style.css'

export default function New() {
    const [subject, setSubject] = useState('Suporte')
    const [status, setStatus] = useState('Aberto')
    const [description, setDescription] = useState('');

    function handleRegister(e) {
        e.preventDefault();

        alert('teste')
    }

    //troca de assunto
    function handleChangeSelect(e) {
        setSubject(e.target.value);
    }

    //troca de status
    function handleOptionChange(e) {
        setStatus(e.target.value);
    }

  return (
    <div>
        <Header />

        <div className="content">
            <Title name="Novo chamado">
                <FiPlus size={25} />
            </Title>

            <div className="container">

                <form className="form-profile" onSubmit={handleRegister}>

                    <label>Cliente</label>
                    <select>
                        <option  key={1} value={1} > teste </option>
                    </select>


                    <label>Assunto</label>
                    <select value={subject} onChange={handleChangeSelect} >
                        <option value="Financeiro">Financeiro</option>
                        <option value="Suporte">Suporte</option>
                        <option value="Visita tecnica">Visita tecnica</option>
                    </select>

                    <label>Status</label>
                    <div className="status">
                        <input type="radio" name="radio" value="Aberto" onChange={handleOptionChange} checked={status === 'Aberto'} />
                        <span>Em Aberto</span>

                        <input type="radio" name="radio" value="Em Andamento" onChange={handleOptionChange} checked={status === 'Em Andamento'}  />
                        <span>Em Andamento</span>

                        <input type="radio" name="radio" value="Finalizado" onChange={handleOptionChange} checked={status === 'Finalizado'}  />
                        <span>Finalizado</span>
                    </div>

                    <label>Descrição</label>
                    <textarea type="text" placeholder="Descrição do problema" value={description}  onChange={(e) => setDescription(e.target.value)} />

                    <button type="submit">Registrar</button> 

                </form>

            </div>

        </div>

    </div>
  )
}
