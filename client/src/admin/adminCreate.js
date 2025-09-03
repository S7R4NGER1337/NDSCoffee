import { useState } from "react";
import styles from "./adminCreate.module.css";
import { useNavigate } from "react-router-dom";

//TODO fix clssNames
export default function AdminCreate() {
  const [formData, setFormData] = useState({
    name: {
      value: "",
      isValid: true,
    },
    price: {
      value: "",
      isValid: true,
    },
    description: {
      value: "",
      isValid: true,
    },
    image: {
      value: "",
      isValid: true,
    },
  });
  const navigate = useNavigate();

  function validateFields() {
    const name = formData["name"].value;
    const price = Number(formData["price"].value);
    const description = formData["description"].value;
    const image = formData["image"].value;

    if (typeof name === "number" || name === "") {
      const editedData = { ...formData, ...(formData["name"].isValid = false) };
      setFormData(editedData);
    } else {
      const editedData = { ...formData, ...(formData["name"].isValid = true) };
      setFormData(editedData);
    }

    if (isNaN(price) || price <= 0) {
      const editedData = {
        ...formData,
        ...(formData["price"].isValid = false),
      };
      setFormData(editedData);
    } else {
      const editedData = { ...formData, ...(formData["price"].isValid = true) };
      setFormData(editedData);
    }

    if (typeof description === "number" || description === "") {
      const editedData = {
        ...formData,
        ...(formData["description"].isValid = false),
      };
      setFormData(editedData);
    } else {
      const editedData = {
        ...formData,
        ...(formData["description"].isValid = true),
      };
      setFormData(editedData);
    }

    if (typeof image === "number" || image === "") {
      const editedData = {
        ...formData,
        ...(formData["image"].isValid = false),
      };
      setFormData(editedData);
    } else {
      const editedData = { ...formData, ...(formData["image"].isValid = true) };
      setFormData(editedData);
    }
  }

  function onChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    const editedValue = (formData[field].value = value);
    const editedData = { ...formData, ...editedValue };
    setFormData(editedData);

    validateFields();
  }

  function isButtonDisabled() {
    let isValid = false;
    for (const key in formData) {
      if (!formData[key].isValid) {
        isValid = true;
      }
    }
    return isValid;
  }

  async function onSubmit(e) {
    e.preventDefault();
    const name = formData["name"].value;
    const price = Number(formData["price"].value);
    const description = formData["description"].value;
    const image = formData["image"].value;

    await createNewProducts(name, price, description, image);
    //TODO redirect to admin
    navigate("/admin");
  }

  async function createNewProducts(name, price, description, image) {
    const product = await fetch("http://localhost:3030/products/create", {
      method: "POST",
      body: JSON.stringify({
        name,
        price,
        description,
        image,
        bought: 0,
        isActive: false,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    return product;
  }

  return (
    <div  style={{'marginTop': '5rem'}}>

      <div className={styles.sectionCreate}>
        <h1>Create Product</h1>
        <form onSubmit={onSubmit} className={styles.createForm}>
          <label>name</label>
          <input
            type="text"
            name="name"
            required
            value={formData["name"].value}
            onChange={(e) => onChange(e)}
          />

          <label>price in BGN</label>
          <input
            type="text"
            name="price"
            required
            value={formData["price"].value}
            onChange={(e) => onChange(e)}
          />

          <label>description</label>
          <input
            type="text"
            name="description"
            required
            value={formData["description"].value}
            onChange={(e) => onChange(e)}
          />

          <label>image</label>
          <input
            type="text"
            name="image"
            value={formData["image"].value}
            required
            onChange={(e) => onChange(e)}
          />

          <button
            type="submit"
            className={styles.createBtn}
            disabled={isButtonDisabled()}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
