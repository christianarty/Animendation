import React from 'react'
import PropTypes from 'prop-types'

export const Checkbox = ({ genre, checked = false, onChange, ...props }) => {
  return (
    <label>
      <input
        type="checkbox"
        name={genre}
        checked={checked}
        onChange={onChange}
        value={genre}
        {...props}
      />{' '}
      {genre}
    </label>
  )
}

Checkbox.propTypes = {
  genre: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}
