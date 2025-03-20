"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, ChevronRight } from "lucide-react"
import { useRestaurants } from "../hooks/useRestaurants"
import RestaurantCard from "../components/RestaurantCard"
import styles from "./Home.module.css"

const Home = () => {
  const { restaurants, loading } = useRestaurants()
  const [featuredRestaurants, setFeaturedRestaurants] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (restaurants.length > 0) {
      // Get 4 random restaurants for featured section
      const randomRestaurants = [...restaurants].sort(() => 0.5 - Math.random()).slice(0, 4)

      setFeaturedRestaurants(randomRestaurants)
    }
  }, [restaurants])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    // Redirect to restaurants page with search query
    window.location.href = `/restaurants?search=${encodeURIComponent(searchQuery)}`
  }

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
      {/* Background Video */}
      <video autoPlay loop muted playsInline className={styles.heroVideo}>
        <source src="/bgvid.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>Food delivery that you'll love</h1>
        <p className={styles.heroSubtitle}>
          Order food from the best restaurants in your area with free delivery
        </p>

        <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
          <div className={styles.searchInputWrapper}>
            <Search size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search for restaurants or cuisines"
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className={styles.searchButton}>
            Find Food
          </button>
        </form>
      </div>
    </section>


      {/* Featured Restaurants */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Restaurants</h2>
          <Link to="/restaurants" className={styles.seeAll}>
            See All <ChevronRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading restaurants...</div>
        ) : (
          <div className={styles.restaurantsGrid}>
            {featuredRestaurants.map((restaurant) => (
              <div key={restaurant.id} className={styles.restaurantItem}>
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* How it Works */}
      <section className={`${styles.section} ${styles.howItWorks}`}>
        <h2 className={styles.sectionTitle}>How It Works</h2>

        <div className={styles.stepsContainer}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3 className={styles.stepTitle}>Select Restaurant</h3>
            <p className={styles.stepDescription}>Browse restaurants and choose your favorite one</p>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3 className={styles.stepTitle}>Select Menu Items</h3>
            <p className={styles.stepDescription}>Browse the menu and select the items you want to order</p>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3 className={styles.stepTitle}>Delivery</h3>
            <p className={styles.stepDescription}>Get your order delivered to your door and enjoy your meal</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

