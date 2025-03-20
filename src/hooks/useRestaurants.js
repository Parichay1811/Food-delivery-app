"use client"

import { useState, useEffect } from "react"

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true)
        // Using the MealDB API for testing
        const response = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php")

        if (!response.ok) {
          throw new Error("Failed to fetch restaurants")
        }

        const data = await response.json()

        // Transform to restaurant-like format
        const restaurantData = data.categories.map((category) => ({
          id: category.idCategory,
          name: category.strCategory,
          image: category.strCategoryThumb,
          description: category.strCategoryDescription,
          rating: (Math.random() * 2 + 3).toFixed(1), // Random rating between 3 and 5
          deliveryTime: Math.floor(Math.random() * 30 + 15), // Random time between 15-45 mins
          deliveryFee: (Math.random() * 5 + 1).toFixed(2), // Random fee between $1-$6
        }))

        setRestaurants(restaurantData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurants()
  }, [])

  return { restaurants, loading, error }
}

