"use client"

import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { Search, Filter } from "lucide-react"
import { useRestaurants } from "../hooks/useRestaurants"
import RestaurantCard from "../components/RestaurantCard"
import styles from "./Restaurants.module.css"

const Restaurants = () => {
  const { restaurants, loading } = useRestaurants()
  const [filteredRestaurants, setFilteredRestaurants] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  const location = useLocation()

  useEffect(() => {
    // Get search query from URL if it exists
    const params = new URLSearchParams(location.search)
    const queryParam = params.get("search")

    if (queryParam) {
      setSearchQuery(queryParam)
    }
  }, [location])

  useEffect(() => {
    if (restaurants.length > 0) {
      let filtered = [...restaurants]

      // Filter by search query
      if (searchQuery) {
        filtered = filtered.filter((restaurant) => restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()))
      }

      setFilteredRestaurants(filtered)
    }
  }, [restaurants, searchQuery])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>All Restaurants</h1>

        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search restaurants..."
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className={styles.filterButton}>
            <Filter size={18} />
            Filter
          </button>
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading restaurants...</div>
      ) : filteredRestaurants.length > 0 ? (
        <div className={styles.restaurantsGrid}>
          {filteredRestaurants.map((restaurant) => (
            <div key={restaurant.id} className={styles.restaurantItem}>
              <RestaurantCard restaurant={restaurant} />
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noResults}>No restaurants found matching "{searchQuery}"</div>
      )}
    </div>
  )
}

export default Restaurants

