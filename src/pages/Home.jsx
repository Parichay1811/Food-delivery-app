import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FiSearch, FiArrowRight, FiClock, FiStar, FiShield, FiShoppingCart, FiTruck } from "react-icons/fi"
import { FaFire, FaLeaf } from "react-icons/fa"
import { useRestaurants } from "../hooks/useRestaurants"
import RestaurantCard from "../components/RestaurantCard"
import styles from "./Home.module.css"

const CUISINE_FILTERS = [
  { label: "All", value: "all", emoji: "🍽️" },
  { label: "Indian", value: "Indian", emoji: "🍛" },
  { label: "Chinese", value: "Chinese", emoji: "🥡" },
]

const HOW_IT_WORKS = [
  { icon: FiSearch, step: "1", title: "Browse Restaurants", desc: "Explore curated Indian and Chinese restaurants near you." },
  { icon: FiShoppingCart, step: "2", title: "Pick Your Meal", desc: "Choose from fresh, authentic dishes crafted by expert chefs." },
  { icon: FiTruck, step: "3", title: "Fast Delivery", desc: "Get your order delivered hot to your doorstep." },
]

const Home = () => {
  const { restaurants, loading } = useRestaurants()
  const [featured, setFeatured] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCuisine, setActiveCuisine] = useState("all")
  const navigate = useNavigate()

  useEffect(() => {
    if (restaurants.length > 0) {
      setFeatured(restaurants.slice(0, 6))
    }
  }, [restaurants])

  const filtered = activeCuisine === "all"
    ? featured
    : featured.filter((r) => r.area === activeCuisine)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      navigate("/restaurants")
    }
  }

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section className={styles.hero}>
        <video autoPlay loop muted playsInline className={styles.heroVideo}>
          <source src="/bgvid.mp4" type="video/mp4" />
        </video>
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <FaFire size={14} />
            <span>India's Fastest Food Delivery</span>
          </div>

          <h1 className={styles.heroTitle}>
            Craving Something
            <span className={styles.heroHighlight}> Delicious?</span>
          </h1>

          <p className={styles.heroSubtitle}>
            Authentic Indian & Chinese cuisines delivered fresh from the best restaurants straight to your door.
          </p>

          <form className={styles.searchForm} onSubmit={handleSearch}>
            <div className={styles.searchBox}>
              <FiSearch size={20} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search restaurants or dishes..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className={styles.searchBtn}>
                Find Food
              </button>
            </div>
          </form>

          <div className={styles.heroStats}>
            <div className={styles.stat}>
              <strong>6+</strong>
              <span>Restaurants</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <strong>30 min</strong>
              <span>Avg. Delivery</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <strong>4.5★</strong>
              <span>Avg. Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Cuisine Highlights */}
      <section className={styles.cuisineSection}>
        <div className={styles.container}>
          <div className={styles.cuisineGrid}>
            <Link to="/restaurants?cuisine=Indian" className={styles.cuisineCard}>
              <div className={styles.cuisineEmoji}>🍛</div>
              <div className={styles.cuisineInfo}>
                <h3>Indian Cuisine</h3>
                <p>Biryanis, Curries, Tandoor & more</p>
              </div>
              <FiArrowRight className={styles.cuisineArrow} />
            </Link>

            <Link to="/restaurants?cuisine=Chinese" className={styles.cuisineCard}>
              <div className={styles.cuisineEmoji}>🥡</div>
              <div className={styles.cuisineInfo}>
                <h3>Chinese Cuisine</h3>
                <p>Noodles, Dim Sum, Stir Fry & more</p>
              </div>
              <FiArrowRight className={styles.cuisineArrow} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Featured Restaurants</h2>
              <p className={styles.sectionSub}>Handpicked for quality and taste</p>
            </div>
            <Link to="/restaurants" className={styles.seeAllBtn}>
              See All <FiArrowRight size={16} />
            </Link>
          </div>

          {/* Cuisine Filter Tabs */}
          <div className={styles.filterTabs}>
            {CUISINE_FILTERS.map((f) => (
              <button
                key={f.value}
                className={`${styles.filterTab} ${activeCuisine === f.value ? styles.filterTabActive : ""}`}
                onClick={() => setActiveCuisine(f.value)}
              >
                <span>{f.emoji}</span> {f.label}
              </button>
            ))}
          </div>

          {loading ? (
            <div className={styles.loadingGrid}>
              {[...Array(6)].map((_, i) => (
                <div key={i} className={styles.skeleton} />
              ))}
            </div>
          ) : (
            <div className={styles.restaurantsGrid}>
              {filtered.map((r) => (
                <RestaurantCard key={r.id} restaurant={r} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How it Works */}
      <section className={styles.howSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>How It Works</h2>
              <p className={styles.sectionSub}>Order in 3 simple steps</p>
            </div>
          </div>

          <div className={styles.stepsGrid}>
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className={styles.stepCard}>
                <div className={styles.stepEmoji}><step.icon size={36} /></div>
                <div className={styles.stepNum}>{step.step}</div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={styles.whySection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle} style={{ textAlign: "center", marginBottom: "40px" }}>
            Why Choose FoodExpress?
          </h2>
          <div className={styles.whyGrid}>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}><FiClock size={28} /></div>
              <h3>Fast Delivery</h3>
              <p>Average delivery time of just 30 minutes across all restaurants.</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}><FiStar size={28} /></div>
              <h3>Top Rated</h3>
              <p>Every restaurant is carefully vetted to ensure the highest quality.</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}><FaLeaf size={28} /></div>
              <h3>Fresh Ingredients</h3>
              <p>No beef, fresh produce, and authentic spices in every dish.</p>
            </div>
            <div className={styles.whyCard}>
              <div className={styles.whyIcon}><FiShield size={28} /></div>
              <h3>Safe & Secure</h3>
              <p>Secure payments and contactless delivery for your safety.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaContent}>
              <h2>Ready to order?</h2>
              <p>Explore our full menu of Indian and Chinese delicacies.</p>
              <Link to="/restaurants" className={styles.ctaBtn}>
                Order Now <FiArrowRight size={18} />
              </Link>
            </div>
            <div className={styles.ctaEmoji}>🍜🍛🥡</div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
