import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault(); // previnir o carregamento da página

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    // chama a API e faz o cadastro
    try {
      const response = await api.post('ongs', data);
      alert(`Seu ID de acesso: ${response.data.id}`);
      history.push('/') //envia o usuario para a pagina de login
    } catch (err) {
      alert('Erro no cadastro, tente novamente');
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          

          <h1>Sign Up</h1>
          <p>Register, enter the platform and help people find the cases of your ONG.</p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041"/>
            Back to home
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input 
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          />
          <input 
          type="email" 
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}/>
          <input 
          placeholder="WhatsApp"
          value={whatsapp}
          onChange={e => setWhatsapp(e.target.value)}/>

          <div className="input-group">
            <input 
            placeholder="City"
            value={city}
            onChange={e => setCity(e.target.value)}/>
            <input 
            placeholder="UF" 
            style={{ width: 80 }}
            value={uf}
            onChange={e => setUf(e.target.value)}/>
          </div>

          <button className="button" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}