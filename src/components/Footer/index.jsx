import { Link } from "react-router-dom"
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"
import styles from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <h3 className={styles.title}>Food <span className={styles.ex}>Express</span></h3>
            <p className={styles.description}>
              Order food online from your favorite restaurants and get it delivered to your doorstep.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://www.facebook.com/parichay.duttabiswas.1811/" className={styles.socialIcon}>
                <Facebook size={20} />
              </a>
              <a href="https://x.com/parichay1811" className={styles.socialIcon}>
                <Twitter size={20} />
              </a>
              <a href="#" className={styles.socialIcon}>
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Quick Links</h4>
            <Link to="/" className={styles.footerLink}>
              Home
            </Link>
            <Link to="/restaurants" className={styles.footerLink}>
              Restaurants
            </Link>
            <Link to="/profile" className={styles.footerLink}>
              My Account
            </Link>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Help</h4>
            <Link to="#" className={styles.footerLink}>
              FAQ
            </Link>
            <Link to="#" className={styles.footerLink}>
              Delivery Information
            </Link>
            <Link to="#" className={styles.footerLink}>
              Terms & Conditions
            </Link>
            <Link to="#" className={styles.footerLink}>
              Privacy Policy
            </Link>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Contact</h4>
            <div className={styles.contactItem}>
              <Phone size={16} className={styles.contactIcon} />
              <span>123 1234 12345</span>
            </div>
            <div className={styles.contactItem}>
              <Mail size={16} className={styles.contactIcon} />
              <span>support@foodexpress.com</span>
            </div>
            <div className={styles.contactItem}>
              <MapPin size={16} className={styles.contactIcon} />
              <span>123 Food Street, City, Country</span>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>&copy; {new Date().getFullYear()} FoodExpress. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

