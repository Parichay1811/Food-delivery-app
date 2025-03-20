"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import styles from "./RatingStars.module.css"

const RatingStars = ({ defaultRating = 0, onChange, readOnly = false }) => {
  const [rating, setRating] = useState(defaultRating)
  const [hoverRating, setHoverRating] = useState(0)

  const handleRatingChange = (newRating) => {
    if (readOnly) return

    setRating(newRating)
    if (onChange) {
      onChange(newRating)
    }
  }

  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${styles.star} ${
            (hoverRating || rating) >= star ? styles.filled : ""
          } ${readOnly ? styles.readOnly : ""}`}
          onClick={() => handleRatingChange(star)}
          onMouseEnter={() => !readOnly && setHoverRating(star)}
          onMouseLeave={() => !readOnly && setHoverRating(0)}
          fill={(hoverRating || rating) >= star ? "#ffa000" : "none"}
          stroke={(hoverRating || rating) >= star ? "#ffa000" : "#ccc"}
        />
      ))}
    </div>
  )
}

export default RatingStars

