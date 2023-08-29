import { useState, useContext } from "react";
import Input from "../../form/Input";

import styles from "../../form/Form.module.css";

import { Context } from "../../../context/UserContext";
import { Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({});

  const { login } = useContext(Context);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(user);
  };

  return (
    <section className={styles.form_container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text='Email'
          type='email'
          name='email'
          placeholder='Digite o seu email'
          handleOnChange={handleChange}
        />
        <Input
          text='Senha'
          type='password'
          name='password'
          placeholder='Digite a sua senha'
          handleOnChange={handleChange}
        />

        <input type='submit' value='Entrar' />
      </form>
      <p>
        Não possui uma conta? <Link to='/register'>Clique aqui</Link>
      </p>
    </section>
  );
};

export default Login;
