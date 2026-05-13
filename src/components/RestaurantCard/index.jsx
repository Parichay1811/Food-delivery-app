import { Link } from "react-router-dom"
import { FaStar } from "react-icons/fa"
import { FiClock, FiMapPin } from "react-icons/fi"
import { MdCurrencyRupee } from "react-icons/md"
import styles from "./RestaurantCard.module.css"

const RestaurantCard = ({ restaurant }) => {
  const { id, name, image, rating, deliveryTime, deliveryFee, cuisine, tags, isOpen } = restaurant

  return (
    <Link to={`/restaurants/${id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className={styles.image}
          onError={(e) => { e.target.src = "/placeholder.svg" }}
        />
        <div className={styles.overlay} />
        {!isOpen && <div className={styles.closedBadge}>Closed</div>}
        {cuisine && <div className={styles.cuisineBadge}>{cuisine}</div>}
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.name}>{name}</h3>
          <div className={styles.ratingBadge}>
            <FaStar size={12} className={styles.starIcon} />
            <span>{rating}</span>
          </div>
        </div>

        {tags && (
          <div className={styles.tags}>
            {tags.slice(0, 3).map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>
        )}

        <div className={styles.meta}>
          <span className={styles.metaItem}>
            <FiClock size={13} />
            {deliveryTime} min
          </span>
          <span className={styles.dot}>·</span>
          <span className={styles.metaItem}>
            <MdCurrencyRupee size={13} />
            {deliveryFee} delivery
          </span>
        </div>
      </div>
    </Link>
  )
}

export default RestaurantCard
