import { useEffect, useState } from 'react'
import styles from './shipping.module.css'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Shipping() {
  const [userData, setUserData] = useState({
    fullName: '',
    streetAddress: '',
    city: '',
    postalCode: '',
    phone: '',
    paymentType: '',
  })
  const navigate = useNavigate()
  const { state } = useLocation()

  useEffect(() => {
    if (state !== null) {
      setUserData(state)
    }
  }, [state])

  function continueOnClick() {
    const { fullName, streetAddress, city, postalCode, phone, paymentType } = userData
    if (!fullName || !streetAddress || !city || !postalCode || !phone || !paymentType) return

    navigate('/review', { state: userData })
  }

  return (
    <div className={styles.orderContainer}>
      <div className={styles.userData}>
        <h1>Shipping Information</h1>
        <form className={styles.orderForm}>
          <div className={styles.orderFormGroup}>
            <label>Full Name</label>
            <input
              placeholder="Enter your full name"
              className={styles.orderFormInput}
              required
              type="text"
              name="fullName"
              value={userData.fullName}
              onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
            />
          </div>
          <div className={styles.orderFormGroup}>
            <label>Street Address</label>
            <input
              placeholder="Enter your street address"
              className={styles.orderFormInput}
              required
              type="text"
              name="streetAddress"
              value={userData.streetAddress}
              onChange={(e) => setUserData({ ...userData, streetAddress: e.target.value })}
            />
          </div>
          <div className={styles.orderFormGroup}>
            <label>City</label>
            <input
              placeholder="Enter your city"
              className={styles.orderFormInput}
              required
              type="text"
              name="city"
              value={userData.city}
              onChange={(e) => setUserData({ ...userData, city: e.target.value })}
            />
          </div>
          <div className={styles.orderFormGroup}>
            <label>Phone</label>
            <input
              placeholder="Enter your phone number"
              className={styles.orderFormInput}
              required
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
            />
          </div>
          <div className={`${styles.orderFormGroup} ${styles.orderFormSmall}`}>
            <label>Postal Code</label>
            <input
              placeholder="Enter your postal code"
              className={styles.orderFormInput}
              required
              type="text"
              name="postalCode"
              value={userData.postalCode}
              onChange={(e) => setUserData({ ...userData, postalCode: e.target.value })}
            />
          </div>
          <div className={`${styles.orderFormGroup} ${styles.orderFormSmall}`}>
            <label>Payment Type</label>
            <select
              className={styles.orderFormInput}
              name="paymentType"
              value={userData.paymentType}
              onChange={(e) => setUserData({ ...userData, paymentType: e.target.value })}
            >
              <option value="" disabled hidden>
                Choose Payment Type
              </option>
              <option value="cash">Cash on Delivery</option>
              <option value="card">Credit/Debit Card</option>
            </select>
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
              Continue to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
