"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ShoppingCart, CreditCard, MapPin, Trash2, CheckCircle } from "lucide-react"
import { useCart } from "../context/CartContext"
import styles from "./Checkout.module.css"

const Checkout = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    paymentMethod: "card",
  })

  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return
    updateQuantity(id, quantity)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setOrderPlaced(true) // Show confirmation message
    clearCart()
  }

  if (cart.items.length === 0 && !orderPlaced) {
    return (
      <div className={styles.emptyCart}>
        <ShoppingCart size={64} className={styles.emptyCartIcon} />
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added any items to your cart yet.</p>
        <button className={styles.browseButton} onClick={() => navigate("/restaurants")}>
          Browse Restaurants
        </button>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      {orderPlaced ? (
        <div className={styles.orderConfirmation}>
          <CheckCircle size={64} className={styles.successIcon} />
          <h2 className={styles.successMessage}>Thank you for your order!</h2>
          <p>Your food will be delivered soon.</p>
          <button className={styles.browseButton} onClick={() => navigate("/")}>
            Back to Home
          </button>
        </div>
      ) : (
        <>
          <h1 className={styles.title}>Checkout</h1>
          <div className={styles.columns}>
            <div className={styles.formColumn}>
              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>
                  <MapPin size={20} className={styles.sectionIcon} />
                  Delivery Address
                </h2>

                <form className={styles.form} onSubmit={handleSubmit}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="firstName" className={styles.label}>First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className={styles.input}
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="lastName" className={styles.label}>Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className={styles.input}
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="address" className={styles.label}>Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className={styles.input}
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="city" className={styles.label}>City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        className={styles.input}
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="zipCode" className={styles.label}>ZIP Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        className={styles.input}
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className={styles.input}
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <button type="submit" className={styles.placeOrderButton}>
                    Place Order
                  </button>
                </form>
              </div>
            </div>

            <div className={styles.orderColumn}>
              <div className={styles.orderSummary}>
                <h2 className={styles.orderSummaryTitle}>Order Summary</h2>

                <div className={styles.cartItems}>
                  {cart.items.map((item) => (
                    <div key={item.id} className={styles.cartItem}>
                      <div className={styles.cartItemImage}>
                        <img src={item.image || "/placeholder.svg"} alt={item.name} />
                      </div>

                      <div className={styles.cartItemDetails}>
                        <h3 className={styles.cartItemName}>{item.name}</h3>
                        <div className={styles.cartItemPrice}>${item.price}</div>

                        <div className={styles.cartItemActions}>
                          <div className={styles.quantityControl}>
                            <button
                              className={styles.quantityButton}
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className={styles.quantity}>{item.quantity}</span>
                            <button
                              className={styles.quantityButton}
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>

                          <button className={styles.removeButton} onClick={() => removeFromCart(item.id)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.orderTotals}>
                  <div className={styles.orderRow}>
                    <span>Subtotal</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>

                  <div className={styles.orderRow}>
                    <span>Delivery Fee</span>
                    <span>$2.99</span>
                  </div>

                  <div className={styles.orderRow}>
                    <span>Tax</span>
                    <span>${(cart.total * 0.08).toFixed(2)}</span>
                  </div>

                  <div className={`${styles.orderRow} ${styles.total}`}>
                    <span>Total</span>
                    <span>${(cart.total + 2.99 + cart.total * 0.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Checkout
