import { useState, useEffect } from "react";
import styles from "./PetDetails.module.css";
import api from "../../../utils/api";
import { useParams, Link } from "react-router-dom";
import useFlashMessage from "../../../hooks/useFlashMessages";
const PetDetails = () => {
  const [pet, setPet] = useState({});
  const { id } = useParams();
  const { setFlashMessage } = useFlashMessage();
  const [token] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    api.get(`/pets/${id}`).then((response) => setPet(response.data.pet));
  }, [id]);
  return (
    <>
      {pet.name && (
        <section className={styles.pet_details_container}>
          <div className={styles.pet_details_header}>
            <h1>Conhecendo o pet {pet.name}</h1>
            <p>Se tiver interesse, marque uma visita!</p>
          </div>
          <div className={styles.pet_images}>
            {pet.images.map((map, index) => (
              <img
                src={`http://localhost:5000/images/pets/${pet.images}`}
                alt={pet.name}
                key={index}
              />
            ))}
          </div>
          <p>
            <span className='bold'>Peso: </span>
            {pet.weight}kg
          </p>
          <p>
            <span className='bold'>Idade:</span>
            {pet.age} anos
          </p>
          {token ? (
            <button>Solicitar visita</button>
          ) : (
            <p>
              Você precisa <Link to='/register'>criar uma conta</Link> para
              solicitar uma visita
            </p>
          )}
        </section>
      )}
    </>
  );
};

export default PetDetails;
