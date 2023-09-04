import { useContext } from "react";

import { Link } from "react-router-dom";

import styles from "./Navbar.module.css";
import Logo from "../../assets/logo.png";

import { Context } from "../../context/UserContext";

const Navbar = () => {
  const { authenticated, logout } = useContext(Context);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <img src={Logo} alt='Get a Pet' />
        <Link className={styles.title} to='/'>
          Get a Pet
        </Link>
      </div>
      <ul>
        <li>
          <Link to='/'>Adotar</Link>
        </li>

        {authenticated ? (
          <>
            <li>
              <Link to='/pet/myadoptions'>Minhas adoções</Link>
            </li>
            <li>
              <Link to='/pet/mypets'>Meus pets</Link>
            </li>
            <li>
              <Link to='/user/profile'>Meu perfil</Link>
            </li>
            <li onClick={logout}>Sair</li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>Entrar</Link>
            </li>

            <li>
              <Link to='/register'>Cadastrar</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
