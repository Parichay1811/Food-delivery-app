import { Link } from "react-router-dom"
import { FiArrowLeft } from "react-icons/fi"
import styles from "./NotFound.module.css"

const NotFound = () => {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.emoji}>🍽️</div>
        <h1 className={styles.code}>404</h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <p className={styles.desc}>
          Looks like this page went out for delivery and never came back.
        </p>
        <Link to="/" className={styles.homeBtn}>
          <FiArrowLeft size={18} />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
