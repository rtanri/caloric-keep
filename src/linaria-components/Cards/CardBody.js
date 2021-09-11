import React from 'react'
import { styled } from 'linaria/react'
import PropTypes from 'prop-types'
import { transparent } from '../Colors'

const BaseCardBody = styled.div`
      display: block;
      position: relative;
      min-height: 100px;
      font-weight: 400;
      background-color: ${transparent};
      overflow: ${props => props.overflow};
`

export const CardBody = ({ children, ...props }) => {
      return <BaseCardBody {...props} >{children}</BaseCardBody>
}

CardBody.propTypes = {
      position: PropTypes.string,
      display: PropTypes.string,
      minHeight: PropTypes.string,
      fontWeight: PropTypes.number,
      backgroundColor: PropTypes.string,
      overflow: PropTypes.string,
}


CardBody.defaultProps = {
      overflow: 'auto'
}
