import Input from "../../form/Input";
import styles from "../../form/Form.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [user, setUser] = useState({});

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
  };

  return (
    <section className={styles.form_container}>
      <h1>Registrar</h1>
      <form onSubmit={handleSubmit}>
        <Input
          text='Nome'
          type='text'
          name='name'
          placeholder='Digite seu nome'
          handleOnChange={handleChange}
        />
        <Input
          text='Telefone'
          type='text'
          name='phone'
          placeholder='Digite seu telefone'
          handleOnChange={handleChange}
        />
        <Input
          text='Email'
          type='email'
          name='email'
          placeholder='Digite seu email'
          handleOnChange={handleChange}
        />
        <Input
          text='Senha'
          type='password'
          name='password'
          placeholder='Digite sua senha'
          handleOnChange={handleChange}
        />
        <Input
          text='Confirme sua senha'
          type='password'
          name='confirmPassword'
          placeholder='Confirme sua senha'
          handleOnChange={handleChange}
        />

        <input type='submit' value='Cadastrar' />
      </form>
      <p>
        Já possui uma conta? <Link to='/login'>Clique aqui</Link>
      </p>
    </section>
  );
};

export default Register;
