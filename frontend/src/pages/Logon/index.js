import React from 'react';
import './styles.css';
import '../../global.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';


function Logon() {
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Logo" />
                <form>
                    <h1>Faça seu Logon</h1>
                    <input placeholder="Sua ID" />
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