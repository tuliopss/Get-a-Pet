import React, { useState } from "react";

import FormStyles from "./Form.module.css";
import Input from "./Input";
import Select from "./Select";

const PetForm = ({ handleSubmit, petData, btnText }) => {
  const [pet, setPet] = useState(petData || {});
  const [preview, setPreview] = useState([]);
  const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"];

  const onFileChange = (e) => {
    setPreview(Array.from(e.target.files));
    setPet({ ...pet, images: [...e.target.files] });
  };
  const handleChange = (e) => {
    setPet({ ...pet, [e.target.name]: e.target.value });
  };
  const handleColor = (e) => {
    setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(pet);
    handleSubmit(pet);
  };

  return (
    <form onSubmit={submit} className={FormStyles.form_container}>
      <div className={FormStyles.preview_pets_images}>
        {preview.length > 0
          ? preview.map((image, index) => (
              <img
                src={URL.createObjectURL(image)}
                alt={pet.name}
                key={`${pet.name}+${index}}`}
              />
            ))
          : pet.images &&
            pet.images.map((image, index) => (
              <img
                src={`http://localhost:5000/images/pets/${image}`}
                alt={pet.name}
                key={`${pet.name}+${index}}`}
              />
            ))}
      </div>

      <Input
        text='Imagens do pet'
        type='file'
        name='images'
        handleOnChange={onFileChange}
        multiple={true}
      />

      <Input
        text='Nome do pet'
        type='text'
        name='name'
        placeholder='Digite o nome do pet'
        handleOnChange={handleChange}
        value={pet.name || ""}
      />
      <Input
        text='idade do pet'
        type='number'
        name='age'
        placeholder='Digite a idade do pet'
        handleOnChange={handleChange}
        value={pet.age || ""}
      />
      <Input
        text='Peso do pet'
        type='number'
        name='weight'
        placeholder='Digite o peso do pet'
        handleOnChange={handleChange}
        value={pet.weight || ""}
      />

      <Select
        name='color'
        text='Selecione a cor'
        options={colors}
        handleOnChange={handleColor}
        value={pet.color || ""}
      />
      <input type='submit' value={btnText} />
    </form>
  );
};

export default PetForm;
