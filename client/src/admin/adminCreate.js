import { useEffect, useState, useRef } from "react";
import styles from "./adminCreate.module.css";
import { useNavigate, useLocation } from "react-router-dom";

//TODO fix clssNames
export default function AdminCreate() {
  const imageInputRef = useRef();
  const [formData, setFormData] = useState({
    name: {
      value: "",
      isValid: true,
    },
    origin: {
      value: "",
      isValid: true,
    },
    roastLevel: {
      value: "",
      isValid: true,
    },
    qty: {
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
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("/edit")) {
      async function getProductData() {
        try {
          const response = await fetch(
            `http://localhost:3030/products/${location.pathname.split("/")[3]}`
          );
          const data = await response.json();

          const newData = {
            name: { value: data.name, isValid: true },
            origin: { value: data.origin, isValid: true },
            roastLevel: { value: data.roastLevel, isValid: true },
            qty: { value: data.qty, isValid: true },
            price: { value: data.price, isValid: true },
            description: { value: data.description, isValid: true },
            image: { value: data.image, isValid: true },
          };
          setFormData(newData);

          if (data.image && imageInputRef.current) {
            const file = base64ToFile(data.image, "image.png");
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            imageInputRef.current.files = dataTransfer.files;
          }
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
      getProductData();
    }
  }, [location]);

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

  async function onChange(e) {
    const field = e.target.name;
    if (field === "image") {
      const file = e.target.files[0];
      const base64 = await convertToBase64(file);
      const editedValue = (formData[field].value = base64);
      const editedData = { ...formData, ...editedValue };

      setFormData(editedData);
      validateFields();
      return;
    }

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
    const origin = formData["origin"].value;
    const roastLevel = formData["roastLevel"].value;
    const qty = Number(formData["qty"].value);

    if (location.pathname.includes("/edit")) {
      await editProduct(
        name,
        origin,
        roastLevel,
        qty,
        price,
        description,
        image
      );
      navigate('/admin')
      return
    }

    await createNewProducts(
      name,
      origin,
      roastLevel,
      qty,
      price,
      description,
      image
    );
    navigate("/admin");
  }

  async function createNewProducts(
    name,
    origin,
    roastLevel,
    qty,
    price,
    description,
    image
  ) {
    const product = await fetch("http://localhost:3030/products/create", {
      method: "POST",
      body: JSON.stringify({
        name,
        origin,
        roastLevel,
        qty,
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

  async function editProduct(name,
    origin,
    roastLevel,
    qty,
    price,
    description,
    image) {

    const product = await fetch(`http://localhost:3030/products/edit/${location.pathname.split("/")[3]}`, {
        method: 'POST',
        body: JSON.stringify({
        name,
        origin,
        roastLevel,
        qty,
        price,
        description,
        image,
      }),
        headers: {
        "Content-type": "application/json",
      }
    })

    
    return product
  }

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const base64ToFile = (base64, filename) => {
    const arr = base64.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <div className={styles.createContainer}>
      <div className={styles.createContainerData}>
        <h1 className={styles.createHeading}>Create a New Product</h1>
        <p className={styles.createText}>
          Fill in the details below to add a new coffee bean product.
        </p>
      </div>
      <div className={styles.sectionCreate}>
        <form onSubmit={onSubmit} className={styles.createForm}>
          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Product Name</label>
            <input
              className={styles.inputData}
              type="text"
              name="name"
              required
              value={formData["name"].value}
              onChange={(e) => onChange(e)}
              placeholder="e.g. Ethiopia Yirgacheffe"
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Description</label>
            <textarea
              className={`${styles.inputData} ${styles.inputBigData}`}
              type="text"
              name="description"
              required
              value={formData["description"].value}
              onChange={(e) => onChange(e)}
              placeholder="A brief description of the coffee's flavor profile, origin and characteristics."
            />
          </div>
          <div
            className={`${styles.inputContainer} ${styles.inputContainerSmall}`}
          >
            <label className={styles.inputLabel}>Origin</label>
            <input
              className={styles.inputData}
              type="text"
              name="origin"
              required
              value={formData["origin"].value}
              onChange={(e) => onChange(e)}
              placeholder="e.g. Ethiopia"
            />
          </div>
          <div
            className={`${styles.inputContainer} ${styles.inputContainerSmall}`}
          >
            <label className={styles.inputLabel}>Roast Level</label>
            <select
              className={styles.inputData}
              name="roastLevel"
              value={formData["roastLevel"].value}
              onChange={(e) => onChange(e)}
            >
              <option value="" disabled hidden>
                Roasted Level
              </option>
              <option value="Light">Light</option>
              <option value="Medium">Medium</option>
              <option value="MediumDark">Medium-Dark</option>
              <option value="Dark">Dark</option>
            </select>
          </div>
          <div
            className={`${styles.inputContainer} ${styles.inputContainerSmall}`}
          >
            <label className={styles.inputLabel}>Stock Quantity</label>
            <input
              className={styles.inputData}
              type="number"
              name="qty"
              required
              value={formData["qty"].value}
              onChange={(e) => onChange(e)}
              placeholder="e.g. 100"
            />
          </div>
          <div
            className={`${styles.inputContainer} ${styles.inputContainerSmall}`}
          >
            <label className={styles.inputLabel}>Price ($)</label>
            <input
              className={styles.inputData}
              type="number"
              name="price"
              required
              value={formData["price"].value}
              onChange={(e) => onChange(e)}
              placeholder="e.g. 13.50"
            />
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Product Image</label>
            <input
              className={`${styles.inputData} ${styles.inputBigData}`}
              type="file"
              name="image"
              accept=".jpg, .png, .jpeg"
              fileName={formData["image"].value}
              required
              ref={imageInputRef}
              onChange={(e) => onChange(e)}
            />
          </div>
          <button
            type="submit"
            className={styles.createBtn}
            disabled={isButtonDisabled()}
          >
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
}
