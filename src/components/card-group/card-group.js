import React from 'react'
import PropTypes from 'prop-types'
import styles from './card-group.module.css'

export const CardGroup = ({ children, ...props }) => {
  return (
    <div className={styles.cardGroup} {...props}>
      {children}
    </div>
  )
}

CardGroup.propTypes = {
  children: PropTypes.node,
}
