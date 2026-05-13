import { useState, useEffect } from "react"

const SPOONACULAR_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY

const FALLBACK_ITEMS = {
  Indian: [
    { id: "ind-1", name: "Chicken Tikka Masala", price: 320, popular: true, isVeg: false },
    { id: "ind-2", name: "Lamb Biryani", price: 360, popular: true, isVeg: false },
    { id: "ind-3", name: "Dal Makhani", price: 220, popular: true, isVeg: true },
    { id: "ind-4", name: "Butter Chicken", price: 340, popular: true, isVeg: false },
    { id: "ind-5", name: "Palak Paneer", price: 260, popular: true, isVeg: true },
    { id: "ind-6", name: "Masala Dosa", price: 160, popular: false, isVeg: true },
    { id: "ind-7", name: "Chole Bhature", price: 200, popular: false, isVeg: true },
    { id: "ind-8", name: "Aloo Gobi", price: 180, popular: false, isVeg: true },
    { id: "ind-9", name: "Paneer Tikka", price: 300, popular: false, isVeg: true },
    { id: "ind-10", name: "Lamb Rogan Josh", price: 380, popular: false, isVeg: false },
    { id: "ind-11", name: "Chicken Korma", price: 350, popular: false, isVeg: false },
    { id: "ind-12", name: "Samosa", price: 120, popular: false, isVeg: true },
  ].map((item) => ({
    ...item,
    image: "",
    description: "Freshly prepared Indian dish made with authentic spices and ingredients.",
  })),
}

const priceCache = {}
const getPrice = (id) => {
  if (!priceCache[id]) {
    priceCache[id] = parseFloat((Math.random() * 280 + 120).toFixed(0))
  }
  return priceCache[id]
}

export const useMenuItems = (area) => {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!area) return

    const fetchMenuItems = async () => {
      if (!SPOONACULAR_KEY) {
        setMenuItems(FALLBACK_ITEMS[area] || [])
        setLoading(false)
        return
      }

      try {
        setLoading(true)

        const cuisine = area.toLowerCase()
        const url = `https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine}&number=20&apiKey=${SPOONACULAR_KEY}`
        const response = await fetch(url)

        if (!response.ok) throw new Error("Failed to fetch menu items")

        const data = await response.json()
        const results = data.results || []

        const items = results.map((recipe, idx) => ({
          id: String(recipe.id),
          name: recipe.title,
          image: recipe.image || "",
          price: getPrice(String(recipe.id)),
          description: `Freshly prepared ${area} dish made with authentic spices and ingredients.`,
          popular: idx < 5,
          isVeg: false,
        }))

        if (items.length === 0 && FALLBACK_ITEMS[area]) {
          setMenuItems(FALLBACK_ITEMS[area])
        } else {
          setMenuItems(items)
        }
      } catch (err) {
        setError(err.message)
        setMenuItems(FALLBACK_ITEMS[area] || [])
      } finally {
        setLoading(false)
      }
    }

    fetchMenuItems()
  }, [area])

  return { menuItems, loading, error }
}
