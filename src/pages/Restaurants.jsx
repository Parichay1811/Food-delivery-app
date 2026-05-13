import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { FiSearch, FiFilter, FiX } from "react-icons/fi"
import { useRestaurants } from "../hooks/useRestaurants"
import RestaurantCard from "../components/RestaurantCard"
import styles from "./Restaurants.module.css"

const CUISINE_FILTERS = ["All", "Indian", "Chinese"]
const SORT_OPTIONS = [
  { value: "rating", label: "Top Rated" },
  { value: "deliveryTime", label: "Fastest Delivery" },
  { value: "deliveryFee", label: "Lowest Fee" },
]

const Restaurants = () => {
  const { restaurants, loading } = useRestaurants()
  const [search, setSearch] = useState("")
  const [activeCuisine, setActiveCuisine] = useState("All")
  const [sortBy, setSortBy] = useState("rating")
  const location = useLocation()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const q = params.get("search")
    const cuisine = params.get("cuisine")
    if (q) setSearch(q)
    if (cuisine) setActiveCuisine(cuisine)
  }, [location.search])

  const filtered = restaurants
    .filter((r) => {
      const matchSearch =
        !search || r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.cuisine?.toLowerCase().includes(search.toLowerCase()) ||
        r.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()))
      const matchCuisine = activeCuisine === "All" || r.area === activeCuisine
      return matchSearch && matchCuisine
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "deliveryTime") return a.deliveryTime - b.deliveryTime
      if (sortBy === "deliveryFee") return a.deliveryFee - b.deliveryFee
      return 0
    })

  const clearSearch = () => setSearch("")

  return (
    <div className={styles.page}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className={styles.container}>
          <h1 className={styles.pageTitle}>Restaurants</h1>
          <p className={styles.pageSubtitle}>
            {activeCuisine === "All"
              ? "Browse all Indian & Chinese restaurants"
              : `Explore ${activeCuisine} restaurants`}
          </p>
        </div>
      </div>

      <div className={styles.container}>
        {/* Controls */}
        <div className={styles.controls}>
          {/* Search */}
          <div className={styles.searchBox}>
            <FiSearch size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search restaurants or cuisines..."
              className={styles.searchInput}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className={styles.clearBtn} onClick={clearSearch}>
                <FiX size={16} />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className={styles.sortBox}>
            <FiFilter size={16} />
            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Cuisine Filters */}
        <div className={styles.filterRow}>
          {CUISINE_FILTERS.map((c) => (
            <button
              key={c}
              className={`${styles.filterChip} ${activeCuisine === c ? styles.filterChipActive : ""}`}
              onClick={() => setActiveCuisine(c)}
            >
              {c === "Indian" && "🍛 "}
              {c === "Chinese" && "🥡 "}
              {c === "All" && "🍽️ "}
              {c}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className={styles.resultsRow}>
          <span className={styles.resultsCount}>
            {loading ? "Loading..." : `${filtered.length} restaurant${filtered.length !== 1 ? "s" : ""} found`}
          </span>
        </div>

        {loading ? (
          <div className={styles.grid}>
            {[...Array(6)].map((_, i) => (
              <div key={i} className={styles.skeleton} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyEmoji}>🔍</div>
            <h3>No restaurants found</h3>
            <p>Try adjusting your search or filters.</p>
            <button className={styles.resetBtn} onClick={() => { setSearch(""); setActiveCuisine("All") }}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Restaurants
