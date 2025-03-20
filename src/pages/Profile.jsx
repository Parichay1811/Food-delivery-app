"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/config"
import { useAuth } from "../context/AuthContext"
import styles from "./Profile.module.css"
import { User, LogOut, Edit, Clock, MapPin } from "lucide-react"

const Profile = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState("orders")

  // Mock orders data
  const orders = [
    {
      id: "ORD-1234",
      date: "2023-07-15",
      status: "Delivered",
      total: 35.86,
      items: [
        { name: "Beef Stroganoff", quantity: 1, price: 16.99 },
        { name: "Garlic Bread", quantity: 1, price: 5.99 },
        { name: "Caesar Salad", quantity: 1, price: 7.99 },
      ],
      restaurant: "Italian Delight",
    },
    {
      id: "ORD-1235",
      date: "2023-07-10",
      status: "Delivered",
      total: 27.5,
      items: [
        { name: "Chicken Tikka Masala", quantity: 1, price: 14.99 },
        { name: "Naan Bread", quantity: 2, price: 2.99 },
        { name: "Mango Lassi", quantity: 1, price: 3.99 },
      ],
      restaurant: "Spice Paradise",
    },
  ]

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            <User size={32} />
          </div>
          <div className={styles.userName}>{user?.email || "User"}</div>
        </div>

        <div className={styles.navigation}>
          <button
            className={`${styles.navItem} ${activeTab === "orders" ? styles.active : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            <Clock size={20} className={styles.navIcon} />
            Order History
          </button>

          <button
            className={`${styles.navItem} ${activeTab === "addresses" ? styles.active : ""}`}
            onClick={() => setActiveTab("addresses")}
          >
            <MapPin size={20} className={styles.navIcon} />
            Saved Addresses
          </button>

          <button
            className={`${styles.navItem} ${activeTab === "account" ? styles.active : ""}`}
            onClick={() => setActiveTab("account")}
          >
            <Edit size={20} className={styles.navIcon} />
            Account Settings
          </button>

          <button className={styles.logoutButton} onClick={handleLogout}>
            <LogOut size={20} className={styles.navIcon} />
            Logout
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {activeTab === "orders" && (
          <div className={styles.orders}>
            <h2 className={styles.sectionTitle}>Order History</h2>

            {orders.length > 0 ? (
              <div className={styles.ordersList}>
                {orders.map((order) => (
                  <div key={order.id} className={styles.orderCard}>
                    <div className={styles.orderHeader}>
                      <div className={styles.orderInfo}>
                        <span className={styles.orderId}>{order.id}</span>
                        <span className={styles.orderDate}>{order.date}</span>
                      </div>
                      <div className={styles.orderStatus}>{order.status}</div>
                    </div>

                    <div className={styles.orderRestaurant}>{order.restaurant}</div>

                    <div className={styles.orderItems}>
                      {order.items.map((item, index) => (
                        <div key={index} className={styles.orderItem}>
                          <div className={styles.orderItemDetails}>
                            <span className={styles.orderItemName}>
                              {item.quantity}x {item.name}
                            </span>
                            <span className={styles.orderItemPrice}>${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className={styles.orderFooter}>
                      <span className={styles.orderTotal}>Total: ${order.total.toFixed(2)}</span>
                      <button className={styles.reorderButton}>Reorder</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.noOrders}>
                <p>You haven't placed any orders yet.</p>
                <button className={styles.browseButton} onClick={() => navigate("/restaurants")}>
                  Browse Restaurants
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === "addresses" && (
          <div className={styles.addresses}>
            <h2 className={styles.sectionTitle}>Saved Addresses</h2>

            <div className={styles.addressCard}>
              <div className={styles.addressHeader}>
                <h3>Home</h3>
                <div className={styles.addressActions}>
                  <button className={styles.editButton}>
                    <Edit size={16} />
                  </button>
                </div>
              </div>
              <div className={styles.addressDetails}>
                <p>123 Main St</p>
                <p>Anytown, ST 12345</p>
              </div>
            </div>

            <button className={styles.addButton}>+ Add New Address</button>
          </div>
        )}

        {activeTab === "account" && (
          <div className={styles.account}>
            <h2 className={styles.sectionTitle}>Account Settings</h2>

            <div className={styles.settingsForm}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Email</label>
                <input type="email" className={styles.input} value={user?.email || ""} disabled />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Name</label>
                <input type="text" className={styles.input} placeholder="Enter your name" />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number</label>
                <input type="tel" className={styles.input} placeholder="Enter your phone number" />
              </div>

              <button className={styles.saveButton}>Save Changes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile

