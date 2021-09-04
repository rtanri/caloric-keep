import React from 'react'
import { styled } from 'linaria/react'
import PropTypes from 'prop-types'

const BaseSpacer = styled.div`
  display: ${props => props.display ?? null};
  height: ${props => (props.spacing ? `${props.spacing}px` : null)};
  width: ${props => (props.width ? `${props.width}px` : null)};
`

export const Spacer = ({ children, ...props }) => {
      return <BaseSpacer {...props} >{children}</BaseSpacer>
}

Spacer.propTypes = {
      display: PropTypes.oneOf(['inline', 'inline-block', 'block', 'none']),
      spacing: PropTypes.number,
      width: PropTypes.number,
}

Spacer.defaultProps = {
      display: 'block',
      spacing: 16,
      width: 16,
}
