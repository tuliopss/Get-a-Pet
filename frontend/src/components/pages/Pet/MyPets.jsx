import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const MyPets = () => {
  const [pets, setPets] = useState([]);

  return (
    <section>
      <div>
        <h1>MyPets</h1>
        <Link to='/pet/add'>Cadastrar pet</Link>
      </div>
      <div>
        {pets.length > 0 && <p>Meus pets cadastrados:</p>}
        {pets.length === 0 && <p>Sem pets cadastrados</p>}
      </div>
    </section>
  );
};

export default MyPets;
