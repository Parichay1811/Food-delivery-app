import { useState } from "react"
import { FiPlus, FiCheck } from "react-icons/fi"
import { FaFire } from "react-icons/fa"
import { MdCurrencyRupee } from "react-icons/md"
import { useCart } from "../../context/CartContext"
import styles from "./MenuItemCard.module.css"

const MenuItemCard = ({ item }) => {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className={styles.image}
          onError={(e) => { e.target.src = "/placeholder.svg" }}
        />
        {item.popular && (
          <div className={styles.popularBadge}>
            <FaFire size={10} /> Popular
          </div>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{item.name}</h3>
        <p className={styles.description}>{item.description}</p>

        <div className={styles.footer}>
          <div className={styles.price}>
            <MdCurrencyRupee size={16} />
            <span>{item.price}</span>
          </div>

          <button
            className={`${styles.addBtn} ${added ? styles.added : ""}`}
            onClick={handleAddToCart}
            disabled={added}
          >
            {added ? (
              <>
                <FiCheck size={14} /> Added
              </>
            ) : (
              <>
                <FiPlus size={14} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MenuItemCard
