import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../firebase/config"
import { useAuth } from "../context/AuthContext"
import { FiUser, FiLogOut, FiEdit2, FiClock, FiMapPin, FiPackage } from "react-icons/fi"
import { MdCurrencyRupee } from "react-icons/md"
import styles from "./Profile.module.css"

const ORDERS = [
  {
    id: "ORD-2401",
    date: "2024-12-10",
    status: "Delivered",
    total: 485,
    restaurant: "Spice Garden",
    items: [
      { name: "Chicken Tikka Masala", quantity: 1, price: 299 },
      { name: "Garlic Naan", quantity: 2, price: 49 },
      { name: "Mango Lassi", quantity: 1, price: 89 },
    ],
  },
  {
    id: "ORD-2398",
    date: "2024-12-05",
    status: "Delivered",
    total: 320,
    restaurant: "Dragon Palace",
    items: [
      { name: "Hakka Noodles", quantity: 1, price: 180 },
      { name: "Manchurian", quantity: 1, price: 140 },
    ],
  },
]

const TABS = [
  { id: "orders", label: "Orders", icon: FiPackage },
  { id: "addresses", label: "Addresses", icon: FiMapPin },
  { id: "account", label: "Account", icon: FiEdit2 },
]

const Profile = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("orders")

  const handleLogout = async () => {
    try { await signOut(auth); navigate("/") }
    catch (e) { console.error(e) }
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.userCard}>
            <div className={styles.avatar}><FiUser size={28} /></div>
            <div className={styles.userInfo}>
              <div className={styles.userName}>{user?.displayName || "User"}</div>
              <div className={styles.userEmail}>{user?.email}</div>
            </div>
          </div>

          <nav className={styles.nav}>
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={`${styles.navItem} ${activeTab === id ? styles.navItemActive : ""}`}
                onClick={() => setActiveTab(id)}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}

            <button className={styles.logoutItem} onClick={handleLogout}>
              <FiLogOut size={18} />
              Logout
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className={styles.main}>
          {activeTab === "orders" && (
            <div>
              <h2 className={styles.sectionTitle}>Order History</h2>
              {ORDERS.length > 0 ? (
                <div className={styles.ordersList}>
                  {ORDERS.map((order) => (
                    <div key={order.id} className={styles.orderCard}>
                      <div className={styles.orderHeader}>
                        <div>
                          <span className={styles.orderId}>{order.id}</span>
                          <div className={styles.orderMeta}>
                            <FiClock size={13} /> {order.date} · {order.restaurant}
                          </div>
                        </div>
                        <span className={styles.orderStatus}>{order.status}</span>
                      </div>

                      <div className={styles.orderItems}>
                        {order.items.map((item, i) => (
                          <div key={i} className={styles.orderItem}>
                            <span>{item.quantity}× {item.name}</span>
                            <span className={styles.itemTotal}>
                              <MdCurrencyRupee size={13} />{item.price * item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className={styles.orderFooter}>
                        <span className={styles.orderTotal}>
                          Total: <MdCurrencyRupee size={14} /><strong>{order.total}</strong>
                        </span>
                        <button className={styles.reorderBtn}>Reorder</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <FiPackage size={48} />
                  <p>No orders yet.</p>
                  <button className={styles.primaryBtn} onClick={() => navigate("/restaurants")}>Browse Restaurants</button>
                </div>
              )}
            </div>
          )}

          {activeTab === "addresses" && (
            <div>
              <h2 className={styles.sectionTitle}>Saved Addresses</h2>
              <div className={styles.addressCard}>
                <div className={styles.addressHeader}>
                  <div>
                    <strong>Home</strong>
                    <p className={styles.addressText}>123 MG Road, Mumbai, 400001</p>
                  </div>
                  <button className={styles.iconBtn}><FiEdit2 size={16} /></button>
                </div>
              </div>
              <button className={styles.addBtn}>+ Add New Address</button>
            </div>
          )}

          {activeTab === "account" && (
            <div>
              <h2 className={styles.sectionTitle}>Account Settings</h2>
              <div className={styles.settingsCard}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email</label>
                  <input type="email" className={styles.input} value={user?.email || ""} disabled />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Name</label>
                  <input type="text" className={styles.input} placeholder="Your name" />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone</label>
                  <input type="tel" className={styles.input} placeholder="+91 98765 43210" />
                </div>
                <button className={styles.primaryBtn}>Save Changes</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
