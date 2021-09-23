import React from 'react'
import { styled } from 'linaria/react'
import PropTypes from 'prop-types'
import { transparent } from '../Colors'

const BaseWrapper = styled.div`
      display: ${props => props.display};
      position: ${props => props.position};
      flex-direction: ${props => props.direction};
      justify-content: ${props => props.justifyContent};
      flex-wrap: ${props => props.wrap};
      align-item: ${props => props.alignItem};
      min-height: ${props => props.minHeight};
      max-height: ${props => props.maxHeight};
      width: ${props => props.width};
      max-width: ${props => props.maxWidth};
      padding: ${props => props.padding};
      margin: ${props => props.margin};
      border: ${props => props.border};
      border-right: ${props => props.borderRight};
      border-left: ${props => props.borderLeft};
      border-bottom: ${props => props.borderBottom};
      border: ${props => props.border};
      border-color: ${props => props.borderColor};
      border-radius: ${props => (props.radius ? `${props.radius}px` : null)};
      background-color: ${props => props.backgroundColor};
      overflow-y: ${props => props.overflow};
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
  border: PropTypes.string,
  borderRight: PropTypes.string,
  borderLeft: PropTypes.string,
}

Section.defaultProps = {
  display: 'block',
  position: 'relative',
  minHeight: '1px',
  margin: '0 auto',
  padding: '40px 2% 40px 2%',
  maxWidth: '1800px',
  width: '100%',
}


const Container = ({ children, ...props }) => {
  return <BaseWrapper {...props} >{children}</BaseWrapper>
}

Container.propTypes = {
  position: PropTypes.string,
  display: PropTypes.string,
  minHeight: PropTypes.string,
  width: PropTypes.string,
  padding: PropTypes.string,
  maxWidth: PropTypes.string,
  maxHeight: PropTypes.string,
  margin: PropTypes.string,
  borderColor: PropTypes.string,
  borderBottom: PropTypes.string,
  border: PropTypes.string,
  radius: PropTypes.number,
  backgroundColor: PropTypes.string,
  overflow: PropTypes.string,
}

Container.defaultProps = {
  minHeight: '40px',
  margin: '0 auto',
  padding: '20px 10%',
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
  width: PropTypes.string,
}

Flexbox.defaultProps = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'start',
  alignItem: 'left',
  minHeight: 'auto',
  padding: '0',
  margin: '0 auto',
  wrap: 'wrap',
}


export { Section, Container, Flexbox }