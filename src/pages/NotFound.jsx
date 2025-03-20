import { Link } from "react-router-dom"
import styles from "./NotFound.module.css"

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <h2 className={styles.subtitle}>Page Not Found</h2>
      <p className={styles.message}>The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className={styles.homeButton}>
        Go Home
      </Link>
    </div>
  )
}

export default NotFound

