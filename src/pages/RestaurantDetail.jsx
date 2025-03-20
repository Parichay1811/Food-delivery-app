"use client"

import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Star, Clock, DollarSign, MapPin } from "lucide-react"
import { useRestaurants } from "../hooks/useRestaurants"
import { useMenuItems } from "../hooks/useMenuItems"
import MenuItemCard from "../components/MenuItemCard"
import RatingStars from "../components/RatingStars"
import styles from "./RestaurantDetail.module.css"

const RestaurantDetail = () => {
  const { id } = useParams()
  const { restaurants, loading: loadingRestaurants } = useRestaurants()
  const [restaurant, setRestaurant] = useState(null)
  const { menuItems, loading: loadingMenu } = useMenuItems(id)
  const [activeCategory, setActiveCategory] = useState("all")
  const [reviewText, setReviewText] = useState("")
  const [userRating, setUserRating] = useState(0)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    if (restaurants.length > 0) {
      const foundRestaurant = restaurants.find((r) => r.name === id)
      setRestaurant(foundRestaurant)
    }
  }, [restaurants, id])

  useEffect(() => {
    // Mock reviews data
    const mockReviews = [
      {
        id: 1,
        user: "John D.",
        rating: 4,
        text: "Great food and fast delivery. Would order again!",
        date: "2023-06-15",
      },
      {
        id: 2,
        user: "Sarah M.",
        rating: 5,
        text: "Absolutely love their food. Always fresh and tasty.",
        date: "2023-06-10",
      },
      {
        id: 3,
        user: "Mark P.",
        rating: 3,
        text: "Good food but delivery was slow this time.",
        date: "2023-06-05",
      },
    ]

    setReviews(mockReviews)
  }, [])

  const handleSubmitReview = (e) => {
    e.preventDefault()

    if (!userRating) {
      alert("Please select a rating")
      return
    }

    const newReview = {
      id: reviews.length + 1,
      user: "You",
      rating: userRating,
      text: reviewText,
      date: new Date().toISOString().split("T")[0],
    }

    setReviews([newReview, ...reviews])
    setReviewText("")
    setUserRating(0)
  }

  // Group menu items by category
  const categories = menuItems.reduce(
    (acc, item) => {
      if (!acc.includes("Popular") && item.popular) {
        acc.push("Popular")
      }
      return acc
    },
    ["all"],
  )

  const filteredMenuItems =
    activeCategory === "all" ? menuItems : activeCategory === "Popular" ? menuItems.filter((item) => item.popular) : []

  if (loadingRestaurants || !restaurant) {
    return <div className={styles.loading}>Loading restaurant details...</div>
  }

  return (
    <div className={styles.container}>
      <div className={styles.banner} style={{ backgroundImage: `url(${restaurant.image})` }}>
        <div className={styles.overlay}>
          <div className={styles.restaurantInfo}>
            <h1 className={styles.name}>{restaurant.name}</h1>
            <div className={styles.details}>
              <span className={styles.rating}>
                <Star size={18} className={styles.icon} />
                {restaurant.rating}
              </span>
              <span className={styles.detail}>
                <Clock size={18} className={styles.icon} />
                {restaurant.deliveryTime} min
              </span>
              <span className={styles.detail}>
                <DollarSign size={18} className={styles.icon} />${restaurant.deliveryFee} delivery fee
              </span>
              <span className={styles.detail}>
                <MapPin size={18} className={styles.icon} />
                1.2 miles away
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.menuContainer}>
          <div className={styles.categoryNav}>
            {categories.map((category) => (
              <button
                key={category}
                className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category === "all" ? "All Items" : category}
              </button>
            ))}
          </div>

          <div className={styles.menuItems}>
            <h2 className={styles.sectionTitle}>{activeCategory === "all" ? "All Menu Items" : activeCategory}</h2>

            {loadingMenu ? (
              <div className={styles.loading}>Loading menu items...</div>
            ) : filteredMenuItems.length > 0 ? (
              <div className={styles.menuItemsGrid}>
                {filteredMenuItems.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className={styles.noResults}>No menu items found</div>
            )}
          </div>
        </div>

        <div className={styles.reviewsContainer}>
          <h2 className={styles.sectionTitle}>Reviews & Ratings</h2>

          <form className={styles.reviewForm} onSubmit={handleSubmitReview}>
            <h3 className={styles.reviewFormTitle}>Add Your Review</h3>
            <div className={styles.ratingSelector}>
              <span>Your Rating:</span>
              <RatingStars onChange={setUserRating} defaultRating={userRating} />
            </div>
            <textarea
              className={styles.reviewTextarea}
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
            <button type="submit" className={styles.submitButton}>
              Submit Review
            </button>
          </form>

          <div className={styles.reviewsList}>
            {reviews.map((review) => (
              <div key={review.id} className={styles.reviewItem}>
                <div className={styles.reviewHeader}>
                  <span className={styles.reviewUser}>{review.user}</span>
                  <span className={styles.reviewDate}>{review.date}</span>
                </div>
                <div className={styles.reviewRating}>
                  <RatingStars defaultRating={review.rating} readOnly />
                </div>
                <p className={styles.reviewText}>{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantDetail

