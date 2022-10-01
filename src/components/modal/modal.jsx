import { FiX } from 'react-icons/fi'
import './modal.style.css'

export default function Modal({content, close}) {
  return (
    <div className="modal">
        <div className="container">
            <button className="close" onClick={close} >
                <FiX size={23} color="#fff" />
                {content.client}
            </button>

            <div>
                <h2>Detalhes do chamado</h2>

                <div className="row">
                    <span>
                        Cliente: <a> {content.client} </a>
                    </span>
                </div>

                <div className="row">
                    <span>
                        Assunto: <a> {content.subject} </a>
                    </span>
                    <span>
                        Criação: <a> {content.createdFormated} </a>
                    </span>
                </div>

                <div className="row">
                    <span>
                        Status: <a style={{color: '#fff', backgroundColor: content.status === 'Aberto' ? '#5cb85c' : '#999'}}> {content.status} </a>
                    </span>
                </div>

                {content.description !== '' && (
                    <>
                    <h3>Descrição</h3>
                    <p>
                        {content.description}
                    </p>
                    </>
                )}

            </div>
        </div>
    </div>
  )
}
