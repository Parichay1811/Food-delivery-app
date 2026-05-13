import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FaStar } from "react-icons/fa"
import { FiClock, FiMapPin, FiArrowLeft, FiTag } from "react-icons/fi"
import { MdCurrencyRupee } from "react-icons/md"
import { useRestaurants } from "../hooks/useRestaurants"
import { useMenuItems } from "../hooks/useMenuItems"
import MenuItemCard from "../components/MenuItemCard"
import RatingStars from "../components/RatingStars"
import styles from "./RestaurantDetail.module.css"

const RestaurantDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { restaurants, loading: loadingRestaurants } = useRestaurants()
  const [restaurant, setRestaurant] = useState(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const [reviewText, setReviewText] = useState("")
  const [userRating, setUserRating] = useState(0)
  const [reviews, setReviews] = useState([
    { id: 1, user: "Rahul S.", rating: 5, text: "Absolutely amazing food! The flavors are so authentic.", date: "2024-12-10" },
    { id: 2, user: "Priya M.", rating: 4, text: "Quick delivery and fresh food. Loved the biryani!", date: "2024-12-08" },
    { id: 3, user: "Arun K.", rating: 4, text: "Great portion sizes and reasonable pricing.", date: "2024-12-05" },
  ])

  useEffect(() => {
    if (restaurants.length > 0) {
      const found = restaurants.find((r) => r.id === id)
      setRestaurant(found || null)
    }
  }, [restaurants, id])

  // Pass area to useMenuItems
  const { menuItems, loading: loadingMenu } = useMenuItems(restaurant?.area)

  const categories = ["all", ...(menuItems.some((i) => i.popular) ? ["popular"] : [])]

  const displayed =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.popular)

  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (!userRating) { alert("Please select a rating"); return }
    const newReview = {
      id: Date.now(),
      user: "You",
      rating: userRating,
      text: reviewText,
      date: new Date().toISOString().split("T")[0],
    }
    setReviews([newReview, ...reviews])
    setReviewText("")
    setUserRating(0)
  }

  if (loadingRestaurants) {
    return (
      <div className={styles.loadingPage}>
        <div className={styles.loadingSpinner} />
        <p>Loading restaurant...</p>
      </div>
    )
  }

  if (!restaurant) {
    return (
      <div className={styles.notFound}>
        <div className={styles.notFoundEmoji}>🍽️</div>
        <h2>Restaurant not found</h2>
        <p>The restaurant you're looking for doesn't exist.</p>
        <button className={styles.backBtn} onClick={() => navigate("/restaurants")}>
          <FiArrowLeft /> Back to Restaurants
        </button>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      {/* Banner */}
      <div
        className={styles.banner}
        style={{ backgroundImage: `url(${restaurant.image})` }}
      >
        <div className={styles.bannerOverlay} />
        <div className={styles.bannerContent}>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            <FiArrowLeft size={18} /> Back
          </button>

          <div className={styles.restaurantInfo}>
            <div className={styles.cuisinePill}>{restaurant.cuisine}</div>
            <h1 className={styles.restaurantName}>{restaurant.name}</h1>
            <p className={styles.restaurantDesc}>{restaurant.description}</p>

            <div className={styles.metaRow}>
              <div className={styles.metaBadge}>
                <FaStar size={13} style={{ color: "#F59E0B" }} />
                <span>{restaurant.rating}</span>
              </div>
              <span className={styles.metaDivider}>·</span>
              <div className={styles.metaItem}>
                <FiClock size={14} />
                <span>{restaurant.deliveryTime} min</span>
              </div>
              <span className={styles.metaDivider}>·</span>
              <div className={styles.metaItem}>
                <MdCurrencyRupee size={14} />
                <span>{restaurant.deliveryFee} delivery</span>
              </div>
              <span className={styles.metaDivider}>·</span>
              <div className={styles.metaItem}>
                <FiMapPin size={14} />
                <span>{restaurant.address}</span>
              </div>
            </div>

            {restaurant.tags && (
              <div className={styles.tagRow}>
                <FiTag size={13} />
                {restaurant.tags.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        {/* Category Nav */}
        <div className={styles.categoryNav}>
          <div className={styles.categoryContainer}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`${styles.catBtn} ${activeCategory === cat ? styles.catBtnActive : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat === "all" ? "All Items" : "Popular"}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.mainGrid}>
          {/* Menu */}
          <div className={styles.menuSection}>
            <h2 className={styles.sectionTitle}>
              {activeCategory === "all" ? "Full Menu" : "Popular Items"}
              {!loadingMenu && <span className={styles.itemCount}>{displayed.length} items</span>}
            </h2>

            {loadingMenu ? (
              <div className={styles.menuSkeleton}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className={styles.skeletonCard} />
                ))}
              </div>
            ) : displayed.length > 0 ? (
              <div className={styles.menuGrid}>
                {displayed.map((item) => (
                  <MenuItemCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className={styles.noItems}>No menu items available.</div>
            )}
          </div>

          {/* Reviews */}
          <div className={styles.reviewsSection}>
            <h2 className={styles.sectionTitle}>Reviews & Ratings</h2>

            <form className={styles.reviewForm} onSubmit={handleSubmitReview}>
              <h3 className={styles.reviewFormTitle}>Write a Review</h3>
              <div className={styles.ratingRow}>
                <span className={styles.ratingLabel}>Your Rating</span>
                <RatingStars onChange={setUserRating} defaultRating={userRating} />
              </div>
              <textarea
                className={styles.textarea}
                placeholder="Share your experience..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                rows={3}
              />
              <button type="submit" className={styles.submitBtn}>Submit Review</button>
            </form>

            <div className={styles.reviewsList}>
              {reviews.map((r) => (
                <div key={r.id} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewer}>
                      <div className={styles.reviewerAvatar}>{r.user[0]}</div>
                      <div>
                        <div className={styles.reviewerName}>{r.user}</div>
                        <div className={styles.reviewDate}>{r.date}</div>
                      </div>
                    </div>
                    <RatingStars defaultRating={r.rating} readOnly />
                  </div>
                  <p className={styles.reviewText}>{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RestaurantDetail
