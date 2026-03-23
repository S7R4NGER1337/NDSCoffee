import { useEffect, useState } from 'react'
import styles from './shipping.module.css'
import { useNavigate, useLocation } from 'react-router-dom'
import Progress from './Progress'

export default function Shipping() {
  const [userData, setUserData] = useState({
    fullName: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    phone: '',
    paymentType: '',
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { state } = useLocation()

  useEffect(() => {
    if (state !== null) {
      setUserData(state)
    }
  }, [state])

  function validate() {
    const newErrors = {}
    if (!userData.fullName.trim()) newErrors.fullName = 'Full name is required.'
    if (!userData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required.'
    if (!userData.city.trim()) newErrors.city = 'City is required.'
    if (!userData.postalCode.trim()) newErrors.postalCode = 'Postal code is required.'
    if (!userData.phone.trim()) newErrors.phone = 'Phone number is required.'
    if (!userData.paymentType) newErrors.paymentType = 'Please select a payment type.'
    return newErrors
  }

  function continueOnClick() {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    navigate('/review', { state: userData })
  }

  function handleChange(field, value) {
    setUserData({ ...userData, [field]: value })
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
  }

  return (
    <>
      <Progress page={1} />
      <div className={styles.orderContainer}>
        <div className={styles.userData}>
          <h1>Shipping Information</h1>
          <form className={styles.orderForm}>
            <div className={styles.orderFormGroup}>
              <label>Full Name</label>
              <input
                placeholder="Enter your full name"
                className={`${styles.orderFormInput} ${errors.fullName ? styles.inputError : ''}`}
                type="text"
                name="fullName"
                value={userData.fullName}
                onChange={(e) => handleChange('fullName', e.target.value)}
              />
              {errors.fullName && <p className={styles.errorMsg}>{errors.fullName}</p>}
            </div>
            <div className={styles.orderFormGroup}>
              <label>Street Address</label>
              <input
                placeholder="Enter your street address"
                className={`${styles.orderFormInput} ${errors.streetAddress ? styles.inputError : ''}`}
                type="text"
                name="streetAddress"
                value={userData.streetAddress}
                onChange={(e) => handleChange('streetAddress', e.target.value)}
              />
              {errors.streetAddress && <p className={styles.errorMsg}>{errors.streetAddress}</p>}
            </div>
            <div className={styles.orderFormGroup}>
              <label>City</label>
              <input
                placeholder="Enter your city"
                className={`${styles.orderFormInput} ${errors.city ? styles.inputError : ''}`}
                type="text"
                name="city"
                value={userData.city}
                onChange={(e) => handleChange('city', e.target.value)}
              />
              {errors.city && <p className={styles.errorMsg}>{errors.city}</p>}
            </div>
            <div className={styles.orderFormGroup}>
              <label>Phone</label>
              <input
                placeholder="Enter your phone number"
                className={`${styles.orderFormInput} ${errors.phone ? styles.inputError : ''}`}
                type="tel"
                name="phone"
                value={userData.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
              {errors.phone && <p className={styles.errorMsg}>{errors.phone}</p>}
            </div>
            <div className={`${styles.orderFormGroup} ${styles.orderFormSmall}`}>
              <label>Postal Code</label>
              <input
                placeholder="Enter your postal code"
                className={`${styles.orderFormInput} ${errors.postalCode ? styles.inputError : ''}`}
                type="text"
                name="postalCode"
                value={userData.postalCode}
                onChange={(e) => handleChange('postalCode', e.target.value)}
              />
              {errors.postalCode && <p className={styles.errorMsg}>{errors.postalCode}</p>}
            </div>
            <div className={`${styles.orderFormGroup} ${styles.orderFormSmall}`}>
              <label>Payment Type</label>
              <select
                className={`${styles.orderFormInput} ${errors.paymentType ? styles.inputError : ''}`}
                name="paymentType"
                value={userData.paymentType}
                onChange={(e) => handleChange('paymentType', e.target.value)}
              >
                <option value="" disabled hidden>Choose Payment Type</option>
                <option value="cash">Cash on Delivery</option>
                <option value="card">Credit/Debit Card</option>
              </select>
              {errors.paymentType && <p className={styles.errorMsg}>{errors.paymentType}</p>}
            </div>
            <div className={styles.inputButtons}>
              <button
                className={styles.inputButton}
                type="button"
                onClick={() => navigate('/cart')}
              >
                Back to Cart
              </button>
              <button
                className={`${styles.inputButton} ${styles.inputContinue}`}
                type="button"
                onClick={continueOnClick}
              >
                Continue to Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
