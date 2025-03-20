"use client"

import { createContext, useContext, useReducer, useEffect } from "react"

const CartContext = createContext()

// Initial state
const initialState = {
  items: [],
  total: 0,
}

// Load cart from localStorage
const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem("cart")
  return savedCart ? JSON.parse(savedCart) : initialState
}

// Actions
const ADD_TO_CART = "ADD_TO_CART"
const REMOVE_FROM_CART = "REMOVE_FROM_CART"
const UPDATE_QUANTITY = "UPDATE_QUANTITY"
const CLEAR_CART = "CLEAR_CART"

// Reducer
const cartReducer = (state, action) => {
  let newItems
  let itemIndex

  switch (action.type) {
    case ADD_TO_CART:
      itemIndex = state.items.findIndex((item) => item.id === action.payload.id)

      if (itemIndex >= 0) {
        // Item exists, update quantity
        newItems = [...state.items]
        newItems[itemIndex] = {
          ...newItems[itemIndex],
          quantity: newItems[itemIndex].quantity + 1,
        }
      } else {
        // Add new item
        newItems = [...state.items, { ...action.payload, quantity: 1 }]
      }

      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      }

    case REMOVE_FROM_CART:
      newItems = state.items.filter((item) => item.id !== action.payload.id)
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      }

    case UPDATE_QUANTITY:
      newItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item,
      )
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
      }

    case CLEAR_CART:
      return initialState

    default:
      return state
  }
}

// Helper to calculate total
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState, loadCartFromStorage)

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  // Actions
  const addToCart = (item) => {
    dispatch({ type: ADD_TO_CART, payload: item })
  }

  const removeFromCart = (id) => {
    dispatch({ type: REMOVE_FROM_CART, payload: { id } })
  }

  const updateQuantity = (id, quantity) => {
    dispatch({ type: UPDATE_QUANTITY, payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}

