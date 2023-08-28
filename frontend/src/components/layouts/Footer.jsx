import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        <span className='bold'>Get a Pet</span> &copy; 2023
      </p>
    </footer>
  );
};

export default Footer;
