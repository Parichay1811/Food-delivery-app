import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../firebase/config"
import { FaGoogle } from "react-icons/fa"
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"
import styles from "./Auth.module.css"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) { setError("Passwords do not match."); return }
    try {
      setError(null)
      setLoading(true)
      await createUserWithEmailAndPassword(auth, email, password)
      navigate("/")
    } catch (err) {
      if (err.code === "auth/email-already-in-use") setError("Email already in use.")
      else if (err.code === "auth/weak-password") setError("Password must be at least 6 characters.")
      else setError("Failed to create account. Try again.")
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
      setError("Failed to sign up with Google.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.logo}>🍜 <span>FoodExpress</span></div>
          <h1 className={styles.title}>Create account</h1>
          <p className={styles.subtitle}>Join thousands of food lovers</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <FiMail className={styles.inputIcon} size={16} />
            <input type="email" placeholder="Email address" className={styles.input}
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className={styles.inputGroup}>
            <FiLock className={styles.inputIcon} size={16} />
            <input type={showPassword ? "text" : "password"} placeholder="Password"
              className={styles.input} value={password}
              onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" className={styles.eyeBtn} onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>

          <div className={styles.inputGroup}>
            <FiLock className={styles.inputIcon} size={16} />
            <input type={showPassword ? "text" : "password"} placeholder="Confirm password"
              className={styles.input} value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} required />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <div className={styles.divider}><span>or continue with</span></div>

        <button className={styles.googleBtn} onClick={handleGoogle} disabled={loading}>
          <FaGoogle size={18} />
          Sign up with Google
        </button>

        <p className={styles.switchText}>
          Already have an account?{" "}
          <Link to="/login" className={styles.switchLink}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup
