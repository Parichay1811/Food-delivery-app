import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FiShoppingCart, FiMapPin, FiTrash2, FiCheckCircle, FiMinus, FiPlus } from "react-icons/fi"
import { MdCurrencyRupee } from "react-icons/md"
import { useCart } from "../context/CartContext"
import styles from "./Checkout.module.css"

const Checkout = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const navigate = useNavigate()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", address: "", city: "", zipCode: "", phone: "",
  })

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleQuantity = (id, qty) => {
    if (qty < 1) return
    updateQuantity(id, qty)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setOrderPlaced(true)
    clearCart()
  }

  const deliveryFee = 49
  const tax = cart.total * 0.05
  const grandTotal = cart.total + deliveryFee + tax

  if (orderPlaced) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}><FiCheckCircle size={64} /></div>
          <h2>Order Placed!</h2>
          <p>Your food is being prepared and will be delivered soon.</p>
          <div className={styles.successEta}>Estimated delivery: 30–45 minutes</div>
          <button className={styles.homeBtn} onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
    )
  }

  if (cart.items.length === 0) {
    return (
      <div className={styles.emptyPage}>
        <div className={styles.emptyIcon}><FiShoppingCart size={64} /></div>
        <h2>Your cart is empty</h2>
        <p>Add some delicious items to get started.</p>
        <button className={styles.browseBtn} onClick={() => navigate("/restaurants")}>
          Browse Restaurants
        </button>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Checkout</h1>

        <div className={styles.grid}>
          {/* Left — Delivery Form */}
          <div className={styles.formSection}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                <FiMapPin size={20} className={styles.cardIcon} />
                Delivery Details
              </h2>

              <form className={styles.form} onSubmit={handleSubmit} id="checkout-form">
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>First Name</label>
                    <input className={styles.input} name="firstName" value={formData.firstName}
                      onChange={handleChange} required placeholder="Rahul" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Last Name</label>
                    <input className={styles.input} name="lastName" value={formData.lastName}
                      onChange={handleChange} required placeholder="Sharma" />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Street Address</label>
                  <input className={styles.input} name="address" value={formData.address}
                    onChange={handleChange} required placeholder="123 MG Road" />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>City</label>
                    <input className={styles.input} name="city" value={formData.city}
                      onChange={handleChange} required placeholder="Mumbai" />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>PIN Code</label>
                    <input className={styles.input} name="zipCode" value={formData.zipCode}
                      onChange={handleChange} required placeholder="400001" />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number</label>
                  <input className={styles.input} type="tel" name="phone" value={formData.phone}
                    onChange={handleChange} required placeholder="+91 98765 43210" />
                </div>
              </form>
            </div>
          </div>

          {/* Right — Order Summary */}
          <div className={styles.summarySection}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>
                <FiShoppingCart size={20} className={styles.cardIcon} />
                Order Summary
              </h2>

              <div className={styles.items}>
                {cart.items.map((item) => (
                  <div key={item.id} className={styles.item}>
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className={styles.itemImg}
                      onError={(e) => { e.target.src = "/placeholder.svg" }} />
                    <div className={styles.itemInfo}>
                      <p className={styles.itemName}>{item.name}</p>
                      <div className={styles.itemPrice}>
                        <MdCurrencyRupee size={14} />{item.price}
                      </div>
                    </div>
                    <div className={styles.itemActions}>
                      <div className={styles.qtyControl}>
                        <button className={styles.qtyBtn} onClick={() => handleQuantity(item.id, item.quantity - 1)}>
                          <FiMinus size={12} />
                        </button>
                        <span className={styles.qty}>{item.quantity}</span>
                        <button className={styles.qtyBtn} onClick={() => handleQuantity(item.id, item.quantity + 1)}>
                          <FiPlus size={12} />
                        </button>
                      </div>
                      <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                        <FiTrash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.totals}>
                <div className={styles.totalRow}>
                  <span>Subtotal</span>
                  <span className={styles.totalValue}><MdCurrencyRupee size={14} />{cart.total.toFixed(0)}</span>
                </div>
                <div className={styles.totalRow}>
                  <span>Delivery Fee</span>
                  <span className={styles.totalValue}><MdCurrencyRupee size={14} />{deliveryFee}</span>
                </div>
                <div className={styles.totalRow}>
                  <span>GST (5%)</span>
                  <span className={styles.totalValue}><MdCurrencyRupee size={14} />{tax.toFixed(0)}</span>
                </div>
                <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                  <span>Total</span>
                  <span className={styles.grandTotalValue}><MdCurrencyRupee size={16} />{grandTotal.toFixed(0)}</span>
                </div>
              </div>

              <button type="submit" form="checkout-form" className={styles.placeOrderBtn}>
                Place Order · <MdCurrencyRupee size={16} />{grandTotal.toFixed(0)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
