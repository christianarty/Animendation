import React from 'react'
import PropTypes from 'prop-types'

export const Checkbox = ({ genre, onChange, ...props }) => {
  return (
    <label>
      <input type="checkbox" onChange={onChange} value={genre} {...props} /> {genre}
    </label>
  )
}

Checkbox.propTypes = {
  genre: PropTypes.string.isRequired,
}
