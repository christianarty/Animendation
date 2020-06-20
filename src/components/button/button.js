import React from 'react'
import PropTypes from 'prop-types'
import styles from './button.module.css'
import clsx from 'clsx'

export const Button = ({
  children,
  type = 'button',
  className,
  size = 'medium',
  text = false,
  ...props
}) => {
  return (
    <button
      type={type}
      className={clsx(
        styles.button,
        styles[`button_size_${size}`],
        {
          [styles.button_text]: text,
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  className: PropTypes.string,
  text: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
}
