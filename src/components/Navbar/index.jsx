import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase/config"
import { useAuth } from "../../context/AuthContext"
import { useCart } from "../../context/CartContext"
import { useTheme } from "../../context/ThemeContext"
import styles from "./Navbar.module.css"
import { FiShoppingCart, FiMenu, FiX, FiUser, FiLogOut, FiSun, FiMoon } from "react-icons/fi"

const Navbar = () => {
  const { user } = useAuth()
  const { cart } = useCart()
  const { isDarkMode, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  const isActive = (path) => location.pathname === path

  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🍜</span>
          <span className={styles.logoText}>
            Food<span className={styles.logoAccent}>Express</span>
          </span>
        </Link>

        <div className={styles.navLinks}>
          <Link to="/" className={`${styles.navLink} ${isActive("/") ? styles.active : ""}`}>
            Home
          </Link>
          <Link to="/restaurants" className={`${styles.navLink} ${isActive("/restaurants") ? styles.active : ""}`}>
            Restaurants
          </Link>
        </div>

        <div className={styles.actions}>
          <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle dark mode">
            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          <Link to="/checkout" className={styles.cartBtn}>
            <FiShoppingCart size={20} />
            {totalItems > 0 && <span className={styles.cartBadge}>{totalItems}</span>}
          </Link>

          {user ? (
            <div className={styles.userMenu}>
              <Link to="/profile" className={styles.profileBtn}>
                <FiUser size={18} />
                <span>Profile</span>
              </Link>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                <FiLogOut size={18} />
              </button>
            </div>
          ) : (
            <div className={styles.authBtns}>
              <Link to="/login" className={styles.loginBtn}>Login</Link>
              <Link to="/signup" className={styles.signupBtn}>Sign Up</Link>
            </div>
          )}

          <button
            className={styles.mobileToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        <Link to="/" className={styles.mobileLink}>Home</Link>
        <Link to="/restaurants" className={styles.mobileLink}>Restaurants</Link>
        <Link to="/checkout" className={styles.mobileLink}>Cart ({totalItems})</Link>
        {user ? (
          <>
            <Link to="/profile" className={styles.mobileLink}>Profile</Link>
            <button className={styles.mobileLinkBtn} onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className={styles.mobileLink}>Login</Link>
            <Link to="/signup" className={styles.mobileLink}>Sign Up</Link>
          </>
        )}
        <button className={styles.mobileTheme} onClick={toggleTheme}>
          {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  )
}

export default Navbar
