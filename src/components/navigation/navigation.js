import React from 'react'
import styles from './navigation.module.css'
export const Navigation = () => {
  return (
    <nav className={styles.root}>
      <ul className={styles.list}>
        <li className={styles.listItem}>Animendation</li>
        <li className={styles.listItem}>About</li>
      </ul>
    </nav>
  )
}
