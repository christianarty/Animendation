import React from 'react'
import PropTypes from 'prop-types'
import styles from './checkbox.module.css'
export const Checkbox = ({ genre, checked = false, onChange, ...props }) => {
  return (
    <label>
      <input
        type="checkbox"
        name={genre}
        checked={checked}
        onChange={onChange}
        value={genre}
        hidden
        {...props}
      />{' '}
      <div className={styles.checkbox}>{genre}</div>
    </label>
  )
}

Checkbox.propTypes = {
  genre: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}
