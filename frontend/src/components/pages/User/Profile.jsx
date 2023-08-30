import api from "../../../utils/api";

import { useState, useEffect } from "react";

import Input from "../../form/Input";
import styles from "./Profile.module.css";
import FormStyles from "../../form/Form.module.css";
import useFlashMessage from "../../../hooks/useFlashMessages";
import RoundedImage from "../../layouts/RoundedImage";

const Profile = () => {
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState();

  const [token] = useState(localStorage.getItem("token") || "");
  const { setFlashMessage } = useFlashMessage();

  useEffect(() => {
    api
      .get("/users/checkuser", {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }, [token]);

  const onFileChange = (e) => {
    setPreview(e.target.files[0]);
    setUser({ ...user, [e.target.name]: e.target.files[0] });
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let msgType = "success";

    const formData = new FormData();

    await Object.keys(user).forEach((key) => {
      formData.append(key, user[key]);
    });

    const data = await api
      .patch(`/users/edit/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        msgType: "error";
        msgText: err.response.data;
      });

    setFlashMessage(data.message, msgType);
  };

  return (
    <section className={styles.profile_container}>
      <div className={styles.profile_header}>
        <h1>Profile</h1>
        {(user.image || preview) && (
          <RoundedImage
            src={
              preview
                ? URL.createObjectURL(preview)
                : //: `${process.env.REACT_APP_API}/images/users/${user.image}`
                  `http://localhost:5000/images/users/${user.image}`
            }
            alt={user.name}
          />
        )}
      </div>

      <form onSubmit={handleSubmit} className={FormStyles.form_container}>
        <Input
          text='Imagem'
          type='file'
          name='image'
          handleOnChange={onFileChange}
        />

        <Input
          text='Email'
          type='email'
          name='email'
          placeholder='Digite seu email'
          handleOnChange={handleChange}
          value={user.email || ""}
        />

        <Input
          text='Nome'
          type='text'
          name='name'
          placeholder='Digite seu nome'
          handleOnChange={handleChange}
          value={user.name || ""}
        />

        <Input
          text='Telefone'
          type='text'
          name='phone'
          placeholder='Digite seu telefone'
          handleOnChange={handleChange}
          value={user.phone || ""}
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
          name='password'
          placeholder='Confirme sua senha'
          handleOnChange={handleChange}
        />

        <input type='submit' value='Editar' />
      </form>
    </section>
  );
};

export default Profile;
