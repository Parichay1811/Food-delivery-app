"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../firebase/config"
import styles from "./Auth.module.css"
import { ChromeIcon as Google } from "lucide-react"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setError(null)
      setLoading(true)

      await signInWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (err) {
      console.error("Login error:", err)
      setError("Invalid email or password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setError(null)
      setLoading(true)

      await signInWithPopup(auth, googleProvider)
      navigate("/")
    } catch (err) {
      console.error("Google sign-in error:", err)
      setError("Failed to sign in with Google. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1 className={styles.title}>Welcome Back</h1>
        <p className={styles.subtitle}>Sign in to your account to continue</p>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        <button onClick={handleGoogleSignIn} className={styles.googleButton} disabled={loading}>
          <Google size={20} />
          Sign in with Google
        </button>

        <p className={styles.switchMode}>
          Don't have an account?{" "}
          <Link to="/signup" className={styles.link}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login

