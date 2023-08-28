import Input from "../../form/Input";
import styles from "../../form/Form.module.css";
import { Link } from "react-router-dom";

const Register = () => {
  const handleChange = (e) => {
    e.preventDefault();
  };
  return (
    <section className={styles.form_container}>
      <h1>Registrar</h1>
      <form>
        <Input
          text='Nome'
          type='text'
          name='name'
          placeholder='Digite seu nome'
        />
        <Input
          text='Telefone'
          type='text'
          name='phone'
          placeholder='Digite seu telefone'
        />
        <Input
          text='Email'
          type='email'
          name='email'
          placeholder='Digite seu email'
        />
        <Input
          text='Senha'
          type='password'
          name='password'
          placeholder='Digite sua senha'
        />
        <Input
          text='Confirme sua senha'
          type='password'
          name='confirmPassword'
          placeholder='Confirme sua senha'
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
