import React from 'react';
import { Link } from 'react-router-dom';

// import { Container } from './styles';

export default function signup() {
  return (
    <div>
      <h1>SignUp</h1>

      <form>
        <input placeholder="Seu nome completo" />
        <input type="email" placeholder="Seu e-mail" />
        <input type="password" placeholder="Sua senha secreta" />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho login</Link>
      </form>
    </div>
  );
}
