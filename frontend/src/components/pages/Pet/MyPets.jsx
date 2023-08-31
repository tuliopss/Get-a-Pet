import { useState, useEffect } from "react";
import api from "../../../utils/api";

import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";
import RoundedImage from "../../layouts/RoundedImage";
import useFlashMessage from "../../../hooks/useFlashMessages";

const MyPets = () => {
  const [pets, setPets] = useState([]);
  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get("/pets/mypets", {
        headers: {
          authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setPets(response.data.pets);
      });
  }, [token]);

  const removePet = async (id) => {
    let msgType = "success";

    const data = await api
      .delete(`/pets/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        const updatedPet = pets.filter((pet) => pet._id != id);

        setPets(updatedPet); //Remove o pet do front
        return response.data;
      })
      .catch((error) => {
        msgType = "error";
        return error.response.data;
      });

    setFlashMessage(data.message, msgType);
  };

  return (
    <section>
      <div className={styles.petlist_header}>
        <h1>MyPets</h1>
        <Link to='/pet/add'>Cadastrar pet</Link>
      </div>
      <div className={styles.petlist_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div className={styles.petlist_row} key={pet._id}>
              <RoundedImage
                src={`http://localhost:5000/images/pets/${pet.images[0]}`}
                alt={pet.name}
                width='px75'
              />

              <span className='bold'>{pet.name}</span>
              <div className={styles.actions}>
                {pet.available ? (
                  <>
                    {pet.adopter && (
                      <button className={styles.conclude_btn}>
                        Concluir adoção
                      </button>
                    )}
                    <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                    <button
                      onClick={() => {
                        removePet(pet._id);
                      }}
                      className={styles.btn_delete}>
                      Excluir
                    </button>
                  </>
                ) : (
                  <p>Pet já adotado.</p>
                )}
              </div>
            </div>
          ))}
        {pets.length === 0 && <p>Sem pets cadastrados</p>}
      </div>
    </section>
  );
};

export default MyPets;
