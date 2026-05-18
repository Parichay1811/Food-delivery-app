import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../firebase/config"
import { FcGoogle } from "react-icons/fc"
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"
import styles from "./Auth.module.css"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
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
    } catch {
      setError("Invalid email or password. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    try {
      setError(null)
      setLoading(true)
      await signInWithPopup(auth, googleProvider)
      navigate("/")
    } catch {
      setError("Failed to sign in with Google.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>🍜 <span>FoodExpress</span></div>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>Sign in to continue ordering</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <FiMail className={styles.inputIcon} size={16} />
            <input
              type="email"
              placeholder="Email address"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <FiLock className={styles.inputIcon} size={16} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" className={styles.eyeBtn} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className={styles.divider}><span>or continue with</span></div>

        <button className={styles.googleBtn} onClick={handleGoogle} disabled={loading}>
          <FcGoogle size={18} />
          Sign in with Google
        </button>

        <p className={styles.switchText}>
          Don't have an account?{" "}
          <Link to="/signup" className={styles.switchLink}>Sign up free</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
