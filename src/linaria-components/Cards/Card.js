import React from 'react'
import { styled } from 'linaria/react'
import PropTypes from 'prop-types'
import { gray_1, white } from '../Colors'

const BaseCard = styled.div`
      display: ${props => props.display};
      flex-direction: ${props => props.direction};
      position: relative;
      height: 300px;
      min-height: 300px;
      width: 300px;
      min-width: 300px;
      background-color: ${props => props.color};
      border: 1px solid ${gray_1} ;
      border-radius: 10px;
      padding: 20px;
      margin: ${props => props.margin};
      overflow: ${props => props.margin};
`

export const Card = ({ children, ...props }) => {
      return <BaseCard {...props} >{children}</BaseCard>
}

Card.propTypes = {
      display: PropTypes.string,
      direction: PropTypes.string,
      maxHeight: PropTypes.string,
      color: PropTypes.string,
      margin: PropTypes.string,
}

Card.defaultProps = {
      display: 'flex',
      direction: 'column',
      maxHeight: 'auto',
      color: white,
      margin: '0 20px 20px 0',
}



