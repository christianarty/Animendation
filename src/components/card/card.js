import React from 'react'
import styles from './card.module.css'
import PropTypes from 'prop-types'
import clsx from 'clsx'

export const Card = ({ image = '', side }) => {
  return (
    <section className={clsx(styles.card, {})}>
      <img
        className={clsx(styles.image, {
          [styles.image_main]: side === 'center',
          [styles.image_other]: !side === 'center',
          [styles.image_other_left]: side === 'left',
          [styles.image_other_right]: side === 'right',
        })}
        src={image}
      ></img>
    </section>
  )
}

Card.propTypes = {
  image: PropTypes.string,
  main: PropTypes.bool,
  side: PropTypes.oneOf(['left', 'right', 'center']),
}
