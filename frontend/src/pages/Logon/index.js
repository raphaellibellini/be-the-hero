import React, { useState} from 'react';
import './styles.css';
import '../../global.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

function Logon() {
    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogon(e) {
        e.preventDefault();
        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id); /* salva a informação no local storage do navegador para te-la disponivel em toda a aplicação */
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch(err) {
            alert('Falha no logon, tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Logo" />
                <form onSubmit={handleLogon}>
                    <h1>Faça seu Logon</h1>
                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    {/* Usar o "Link" ao invés do "a" faz com que não seja necessário carregar toda a página */ }
                    <Link className="link" to="/register"><FiLogIn size={16} color="#E02041" />Não tenho cadastro</Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}

export default Logon;