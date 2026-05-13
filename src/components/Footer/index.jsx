import { Link } from "react-router-dom"
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi"
import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span>🍜</span>
              <span>Food<span className={styles.accent}>Express</span></span>
            </div>
            <p className={styles.tagline}>
              Order delicious Indian and Chinese food from the best restaurants, delivered hot to your doorstep.
            </p>
            <div className={styles.social}>
              <a href="https://www.facebook.com/parichay.duttabiswas.1811/" target="_blank" rel="noreferrer" className={styles.socialBtn} aria-label="Facebook">
                <FaFacebook size={18} />
              </a>
              <a href="https://x.com/parichay1811" target="_blank" rel="noreferrer" className={styles.socialBtn} aria-label="Twitter">
                <FaTwitter size={18} />
              </a>
              <a href="#" className={styles.socialBtn} aria-label="Instagram">
                <FaInstagram size={18} />
              </a>
            </div>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <Link to="/" className={styles.footerLink}>Home</Link>
            <Link to="/restaurants" className={styles.footerLink}>Restaurants</Link>
            <Link to="/profile" className={styles.footerLink}>My Account</Link>
            <Link to="/checkout" className={styles.footerLink}>Cart</Link>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Cuisines</h4>
            <Link to="/restaurants?cuisine=Indian" className={styles.footerLink}>Indian Food</Link>
            <Link to="/restaurants?cuisine=Chinese" className={styles.footerLink}>Chinese Food</Link>
            <Link to="/restaurants" className={styles.footerLink}>All Restaurants</Link>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact</h4>
            <div className={styles.contactItem}>
              <FiPhone size={14} />
              <span>+91 123 456 7890</span>
            </div>
            <div className={styles.contactItem}>
              <FiMail size={14} />
              <span>support@foodexpress.in</span>
            </div>
            <div className={styles.contactItem}>
              <FiMapPin size={14} />
              <span>Mumbai, India</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {new Date().getFullYear()} FoodExpress. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <a href="#" className={styles.bottomLink}>Privacy Policy</a>
            <a href="#" className={styles.bottomLink}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
