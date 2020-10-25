import React from 'react'
import PropTypes from 'prop-types'
import styles from './card-group.module.css'
import _isEmpty from 'lodash/isEmpty'
import { Card } from 'components/card'

export const CardGroup = ({ children, cards = [], ...props }) => {
  return (
    <div className={styles.cardGroup} {...props}>
      {!_isEmpty(cards)
        ? cards.map((card) => (
            <Card key={card.id} image={card.image} side={card.side} />
          ))
        : children}
    </div>
  )
}

CardGroup.propTypes = {
  children: PropTypes.node,
  cards: PropTypes.arrayOf(PropTypes.object),
}
