import React from 'react'
import { styled } from 'linaria/react'
import PropTypes from 'prop-types'

const BaseWrapper = styled.div`
      display: ${props => props.display};
      position: ${props => props.position};
      min-height: ${props => props.minHeight};
      width: ${props => props.width};
      max-width: ${props => props.maxWidth};
      padding: ${props => props.padding};
      margin: ${props => props.margin};
`

export const Section = ({ children, ...props }) => {
      return <BaseWrapper {...props} >{children}</BaseWrapper>
}

Section.propTypes = {
      position: PropTypes.string,
      display: PropTypes.string,
      minHeight: PropTypes.string,
      padding: PropTypes.string,
      maxWidth: PropTypes.string,
      margin: PropTypes.string,
}

Section.defaultProps = {
      display: 'block',
      position: 'relative',
      minHeight: '1px',
      margin: '0 auto',
      padding: '40px 0',
      maxWidth: '1500px',
      width: '100%',
}


export const Container = ({ children, ...props }) => {
      return <BaseWrapper {...props} >{children}</BaseWrapper>
}

Container.propTypes = {
      position: PropTypes.string,
      display: PropTypes.string,
      minHeight: PropTypes.string,
      padding: PropTypes.string,
      maxWidth: PropTypes.string,
      margin: PropTypes.string,
}

Container.defaultProps = {
      display: 'block',
      position: 'relative',
      minHeight: '40px',
      margin: '0 auto',
      padding: '20px 5%',
}