import { Link } from "react-router-dom"
import { Star, Clock, DollarSign } from "lucide-react"
import styles from "./RestaurantCard.module.css"

const RestaurantCard = ({ restaurant }) => {
  const { id, name, image, rating, deliveryTime, deliveryFee } = restaurant

  return (
    <Link to={`/restaurants/${name}`} className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image || "/placeholder.svg"} alt={name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <div className={styles.info}>
          <span className={styles.rating}>
            <Star size={16} className={styles.icon} />
            {rating}
          </span>
          <span className={styles.time}>
            <Clock size={16} className={styles.icon} />
            {deliveryTime} min
          </span>
          <span className={styles.fee}>
            <DollarSign size={16} className={styles.icon} />${deliveryFee}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default RestaurantCard

