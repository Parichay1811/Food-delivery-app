"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { useCart } from "../../context/CartContext"
import styles from "./MenuItemCard.module.css"

const MenuItemCard = ({ item }) => {
  const { addToCart } = useCart()
  const [adding, setAdding] = useState(false)

  const handleAddToCart = () => {
    setAdding(true)
    addToCart(item)
    setTimeout(() => setAdding(false), 500)
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={item.image || "/placeholder.svg"} alt={item.name} className={styles.image} />
        {item.popular && <span className={styles.popularTag}>Popular</span>}
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.description}>{item.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>${item.price}</span>
          <button
            className={`${styles.addButton} ${adding ? styles.adding : ""}`}
            onClick={handleAddToCart}
            disabled={adding}
          >
            <Plus size={16} />
            {adding ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuItemCard

