import { useEffect, useState, useRef } from 'react'
import styles from './adminForm.module.css'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { editProduct, createNewProducts, getProductDataById } from '../../api/products'
import { convertToBase64, base64ToFile } from '../../utils/imageHelper'

const INITIAL_FIELD = { value: '', isValid: true }

export default function AdminForm() {
  const imageInputRef = useRef()
  const [formData, setFormData] = useState({
    name: { ...INITIAL_FIELD },
    origin: { ...INITIAL_FIELD },
    roastLevel: { ...INITIAL_FIELD },
    qty: { ...INITIAL_FIELD },
    price: { ...INITIAL_FIELD },
    description: { ...INITIAL_FIELD },
    image: { ...INITIAL_FIELD },
  })
  const navigate = useNavigate()
  const { id: productId } = useParams()
  const location = useLocation()
  const isEditing = location.pathname.includes('/edit')

  useEffect(() => {
    if (!isEditing || !productId) return

    async function loadProduct() {
      try {
        const data = await getProductDataById(productId)
        if (!data) return

        setFormData({
          name: { value: data.name || '', isValid: true },
          origin: { value: data.origin || '', isValid: true },
          roastLevel: { value: data.roastLevel || '', isValid: true },
          qty: { value: data.qty ?? '', isValid: true },
          price: { value: data.price ?? '', isValid: true },
          description: { value: data.description || '', isValid: true },
          image: { value: data.image || '', isValid: true },
        })

        if (data.image && imageInputRef.current) {
          const file = base64ToFile(data.image, 'image.png')
          const dataTransfer = new DataTransfer()
          dataTransfer.items.add(file)
          imageInputRef.current.files = dataTransfer.files
        }
      } catch (error) {
        console.error('Error loading product:', error)
      }
    }
    loadProduct()
  }, [isEditing, productId])

  function validate(data) {
    const updated = { ...data }
    updated.name = { ...updated.name, isValid: typeof updated.name.value === 'string' && updated.name.value.trim() !== '' }
    updated.price = { ...updated.price, isValid: !isNaN(Number(updated.price.value)) && Number(updated.price.value) > 0 }
    updated.description = { ...updated.description, isValid: typeof updated.description.value === 'string' && updated.description.value.trim() !== '' }
    updated.image = { ...updated.image, isValid: updated.image.value !== '' }
    return updated
  }

  async function onChange(e) {
    const field = e.target.name
    let value

    if (field === 'image') {
      const file = e.target.files[0]
      if (!file) return
      value = await convertToBase64(file)
    } else {
      value = e.target.value
    }

    const updated = { ...formData, [field]: { value, isValid: true } }
    setFormData(validate(updated))
  }

  function isButtonDisabled() {
    return Object.values(formData).some((field) => !field.isValid)
  }

  async function onSubmit(e) {
    e.preventDefault()
    const validated = validate(formData)
    setFormData(validated)
    if (Object.values(validated).some((f) => !f.isValid)) return

    const payload = {
      name: formData.name.value,
      origin: formData.origin.value,
      roastLevel: formData.roastLevel.value,
      qty: Number(formData.qty.value),
      price: Number(formData.price.value),
      description: formData.description.value,
      image: formData.image.value,
    }

    if (isEditing) {
      await editProduct(payload, productId)
    } else {
      await createNewProducts({ ...payload, isActive: false, bought: 0 })
    }
    navigate('/admin')
  }

  return (
    <div className={styles.createContainer}>
      <div className={styles.createContainerData}>
        <h1 className={styles.createHeading}>
          {isEditing ? 'Edit Your Product' : 'Create a New Product'}
        </h1>
        <p className={styles.createText}>
          {isEditing
            ? 'Fill in the details below to edit your coffee bean product.'
            : 'Fill in the details below to add a new coffee bean product.'}
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
              value={formData.name.value}
              onChange={onChange}
              placeholder="e.g. Ethiopia Yirgacheffe"
            />
            {!formData.name.isValid && <p className={styles.errorText}>Name is required.</p>}
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Description</label>
            <textarea
              className={`${styles.inputData} ${styles.inputBigData}`}
              name="description"
              required
              value={formData.description.value}
              onChange={onChange}
              placeholder="A brief description of the coffee's flavor profile, origin and characteristics."
            />
            {!formData.description.isValid && <p className={styles.errorText}>Description is required.</p>}
          </div>

          <div className={`${styles.inputContainer} ${styles.inputContainerSmall}`}>
            <label className={styles.inputLabel}>Origin</label>
            <input
              className={styles.inputData}
              type="text"
              name="origin"
              required
              value={formData.origin.value}
              onChange={onChange}
              placeholder="e.g. Ethiopia"
            />
          </div>

          <div className={`${styles.inputContainer} ${styles.inputContainerSmall}`}>
            <label className={styles.inputLabel}>Roast Level</label>
            <select
              className={styles.inputData}
              name="roastLevel"
              value={formData.roastLevel.value}
              onChange={onChange}
            >
              <option value="" disabled hidden>Roast Level</option>
              <option value="Light">Light</option>
              <option value="Medium">Medium</option>
              <option value="MediumDark">Medium-Dark</option>
              <option value="Dark">Dark</option>
            </select>
          </div>

          <div className={`${styles.inputContainer} ${styles.inputContainerSmall}`}>
            <label className={styles.inputLabel}>Stock Quantity</label>
            <input
              className={styles.inputData}
              type="number"
              name="qty"
              required
              min="0"
              value={formData.qty.value}
              onChange={onChange}
              placeholder="e.g. 100"
            />
          </div>

          <div className={`${styles.inputContainer} ${styles.inputContainerSmall}`}>
            <label className={styles.inputLabel}>Price ($)</label>
            <input
              className={styles.inputData}
              type="number"
              name="price"
              required
              min="0"
              step="0.01"
              value={formData.price.value}
              onChange={onChange}
              placeholder="e.g. 13.50"
            />
            {!formData.price.isValid && <p className={styles.errorText}>Enter a valid price greater than 0.</p>}
          </div>

          <div className={styles.inputContainer}>
            <label className={styles.inputLabel}>Product Image</label>
            <input
              className={`${styles.inputData} ${styles.inputBigData}`}
              type="file"
              name="image"
              accept=".jpg,.png,.jpeg,.webp"
              required={!isEditing}
              ref={imageInputRef}
              onChange={onChange}
            />
            {!formData.image.isValid && <p className={styles.errorText}>Image is required.</p>}
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
  )
}
