import { useState, useEffect } from "react"

const STATIC_RESTAURANTS = [
  {
    id: "spice-garden",
    name: "Spice Garden",
    area: "Indian",
    cuisine: "North Indian",
    description: "Authentic North Indian cuisine with rich curries, tandoor specialties, and aromatic biryanis.",
    address: "42 Curry Lane, Mumbai",
    rating: 4.5,
    deliveryTime: 25,
    deliveryFee: 29,
    minOrder: 199,
    tags: ["North Indian", "Tandoor", "Biryani"],
    isOpen: true,
    isVeg: false,
  },
  {
    id: "masala-kitchen",
    name: "Masala Kitchen",
    area: "Indian",
    cuisine: "South Indian",
    description: "Traditional home-style cooking with a modern twist. Dosas, idlis and more.",
    address: "18 Spice Market, Chennai",
    rating: 4.3,
    deliveryTime: 30,
    deliveryFee: 39,
    minOrder: 149,
    tags: ["South Indian", "Vegetarian", "Dosa"],
    isOpen: true,
    isVeg: true,
  },
  {
    id: "taj-flavors",
    name: "Taj Flavors",
    area: "Indian",
    cuisine: "Mughlai",
    description: "Royal Mughlai recipes passed down through generations. Kebabs, kormas and more.",
    address: "7 Palace Road, Delhi",
    rating: 4.7,
    deliveryTime: 35,
    deliveryFee: 49,
    minOrder: 299,
    tags: ["Mughlai", "Kebab", "Korma"],
    isOpen: true,
    isVeg: false,
  },
  {
    id: "dragon-palace",
    name: "Dragon Palace",
    area: "Chinese",
    cuisine: "Cantonese",
    description: "Authentic Cantonese dim sum, noodles and wok dishes served fresh every day.",
    address: "88 Dragon Street, Kolkata",
    rating: 4.4,
    deliveryTime: 20,
    deliveryFee: 35,
    minOrder: 199,
    tags: ["Cantonese", "Dim Sum", "Noodles"],
    isOpen: true,
    isVeg: false,
  },
  {
    id: "golden-wok",
    name: "Golden Wok",
    area: "Chinese",
    cuisine: "Sichuan",
    description: "Bold Sichuan flavors — spicy dumplings, stir fries and steaming soups.",
    address: "22 Bamboo Ave, Mumbai",
    rating: 4.2,
    deliveryTime: 25,
    deliveryFee: 29,
    minOrder: 149,
    tags: ["Sichuan", "Dumplings", "Stir Fry"],
    isOpen: true,
    isVeg: false,
  },
  {
    id: "orient-express",
    name: "Orient Express",
    area: "Chinese",
    cuisine: "Fusion",
    description: "A fusion of classic Chinese recipes with modern presentation and fresh local ingredients.",
    address: "15 Silk Road, Bangalore",
    rating: 4.6,
    deliveryTime: 30,
    deliveryFee: 45,
    minOrder: 249,
    tags: ["Fusion", "Dim Sum", "Noodles"],
    isOpen: true,
    isVeg: false,
  },
]

const SPOONACULAR_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY

export const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true)

        if (!SPOONACULAR_KEY) {
          setRestaurants(STATIC_RESTAURANTS.map((r) => ({ ...r, image: "" })))
          return
        }

        const [indianRes, chineseRes] = await Promise.all([
          fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=indian&number=9&apiKey=${SPOONACULAR_KEY}`),
          fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=chinese&number=9&apiKey=${SPOONACULAR_KEY}`),
        ])

        const indianData = await indianRes.json()
        const chineseData = await chineseRes.json()

        const indianMeals = indianData.results || []
        const chineseMeals = chineseData.results || []

        const withImages = STATIC_RESTAURANTS.map((r, i) => {
          if (r.area === "Indian") {
            const idx = indianMeals.length > 0 ? (i * 3) % indianMeals.length : 0
            return { ...r, image: indianMeals[idx]?.image || "" }
          } else {
            const idx = chineseMeals.length > 0 ? ((i - 3) * 3) % chineseMeals.length : 0
            return { ...r, image: chineseMeals[idx]?.image || "" }
          }
        })

        setRestaurants(withImages)
      } catch (err) {
        setError(err.message)
        setRestaurants(STATIC_RESTAURANTS.map((r) => ({ ...r, image: "" })))
      } finally {
        setLoading(false)
      }
    }

    fetchImages()
  }, [])

  return { restaurants, loading, error }
}
