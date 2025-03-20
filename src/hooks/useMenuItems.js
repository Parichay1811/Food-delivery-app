"use client"

import { useState, useEffect } from "react"

export const useMenuItems = (restaurantId) => {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true)

        // Using the MealDB API based on category/restaurant ID
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(restaurantId)}`,
        )

        if (!response.ok) {
          throw new Error("Failed to fetch menu items")
        }

        const data = await response.json()

        // Transform to menu item format with prices
        const menuItemsData = data.meals.map((meal) => ({
          id: meal.idMeal,
          name: meal.strMeal,
          image: meal.strMealThumb,
          price: (Math.random() * 15 + 5).toFixed(2), // Random price between $5-$20
          description: "Delicious meal prepared with fresh ingredients",
          popular: Math.random() > 0.7, // 30% chance of being popular
        }))

        setMenuItems(menuItemsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (restaurantId) {
      fetchMenuItems()
    }
  }, [restaurantId])

  return { menuItems, loading, error }
}

