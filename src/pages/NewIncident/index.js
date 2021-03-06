import React, { useState } from 'react';
import './styles.css';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import { FiArrowLeft } from 'react-icons/fi';
import logoImg from '../../assets/logo.svg'; 

export default function NewIncident() {
  const[title, setTitle] = useState('');
  const[description, setDescription] = useState('');
  const[value, setValue] = useState('');
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');

  async function handleNewIncident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    }

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId,
        }
      });
      history.push('/profile')
    } catch (erro) {
      alert('Erro ao cadastrar caso, tente novamente');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
        
            <img src={logoImg} alt="Be The Hero"/>
          

          <h1>Register new Incident</h1>
          <p>Describe the case in detail to find a hero to solve this.</p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041"/>
            Back to home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input 
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          />
          <textarea 
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          />
          <input 
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Value"/>

          <button className="button" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}