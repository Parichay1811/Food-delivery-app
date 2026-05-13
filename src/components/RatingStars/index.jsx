import { useState } from "react"
import { FaStar } from "react-icons/fa"
import styles from "./RatingStars.module.css"

const RatingStars = ({ defaultRating = 0, onChange, readOnly = false }) => {
  const [rating, setRating] = useState(defaultRating)
  const [hover, setHover] = useState(0)

  const handleClick = (star) => {
    if (readOnly) return
    setRating(star)
    if (onChange) onChange(star)
  }

  const active = hover || rating

  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={readOnly ? 16 : 22}
          className={`${styles.star} ${active >= star ? styles.filled : styles.empty} ${readOnly ? styles.readOnly : ""}`}
          onClick={() => handleClick(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
        />
      ))}
    </div>
  )
}

export default RatingStars
