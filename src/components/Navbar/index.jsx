import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../firebase/config'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import styles from './Navbar.module.css'
import { ShoppingCart, Menu, X, User, LogOut } from 'lucide-react'

const Navbar = () => {
  const { user } = useAuth()
  const { cart } = useCart()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await signOut(auth)
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Left - Logo */}
        <div className={styles.logoSection}>
          <Link to="/" className={styles.logo}>
            <img src="/logo.png" alt="logo" />
          </Link>
        </div>
        
        {/* Mobile Menu Toggle */}
        <div className={styles.mobileToggle} onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
        
        {/* Middle - Navigation Links */}
        <div className={`${styles.navSection} ${menuOpen ? styles.active : ''}`}>
          <div className={styles.mainLinks}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/restaurants" onClick={() => setMenuOpen(false)}>Restaurants</Link>
          </div>
        </div>
        
        {/* Right - Auth & Cart */}
        <div className={`${styles.authSection} ${menuOpen ? styles.active : ''}`}>
          {user ? (
            <>
              <Link to="/profile" className={styles.profileLink} onClick={() => setMenuOpen(false)}>
                <User size={20} /> Profile
              </Link>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                <LogOut size={20} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={styles.loginBtn} onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" className={styles.signupBtn} onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </>
          )}
          
          <Link to="/checkout" className={styles.cart}>
            <ShoppingCart size={24} />
            {cart.items.length > 0 && (
              <span className={styles.cartCount}>{cart.items.length}</span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
