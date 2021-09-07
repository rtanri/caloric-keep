import React from 'react'
import { styled } from 'linaria/react'
import PropTypes from 'prop-types'
import { transparent } from '../Colors'
import { MD } from '../MediaQueries'

const BaseWrapper = styled.div`
      display: ${props => props.display};
      position: ${props => props.position};
      flex-direction: ${props => props.direction};
      justify-content: ${props => props.justifyContent};
      flex-wrap: ${props => props.wrap};
      align-item: ${props => props.alignItem};
      min-height: ${props => props.minHeight};
      width: ${props => props.width};
      max-width: ${props => props.maxWidth};
      padding: ${props => props.padding};
      margin: ${props => props.margin};
      border: ${props => props.border};
      border-color: ${props => props.borderColor};
      border-radius: ${props => (props.radius ? `${props.radius}px` : null)};
      background-color: ${props => props.backgroundColor};
`

const Section = ({ children, ...props }) => {
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
      maxWidth: '1660px',
      width: '100%',
}


const Container = ({ children, ...props }) => {
      return <BaseWrapper {...props} >{children}</BaseWrapper>
}

Container.propTypes = {
      position: PropTypes.string,
      display: PropTypes.string,
      minHeight: PropTypes.string,
      padding: PropTypes.string,
      maxWidth: PropTypes.string,
      margin: PropTypes.string,
      border: PropTypes.string,
      borderColor: PropTypes.string,
      radius: PropTypes.number,
      backgroundColor: PropTypes.string,
}

Container.defaultProps = {
      display: 'block',
      position: 'relative',
      minHeight: '40px',
      margin: '0 auto',
      padding: '20px 5%',
      border: '3px solid #FFFFFF',
      borderColor: transparent,
      radius: 10,
}


const Flexbox = ({ children, ...props }) => {
      return <BaseWrapper {...props} >{children}</BaseWrapper>
}

Flexbox.propTypes = {
      position: PropTypes.string,
      display: PropTypes.string,
      flexDirection: PropTypes.string,
      justifyContent: PropTypes.string,
      alignItem: PropTypes.string,
      minHeight: PropTypes.string,
      padding: PropTypes.string,
      margin: PropTypes.string,
      wrap: PropTypes.oneOf(['wrap', 'nowrap', 'wrap-reverse']),
}

Flexbox.defaultProps = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'start',
      alignItem: 'left',
      minHeight: 'auto',
      padding: 0,
      margin: 0,
      wrap: 'wrap',
}


export { Section, Container, Flexbox }