import React from 'react'
import { styled } from 'linaria/react'
import PropTypes from 'prop-types'
import { primary } from '../Colors'

const BaseText = styled.div`
    font-family: ${props => props.fontFamily}, arial, sans-serif;
    font-weight: ${props => props.weight};
    font-size: ${props => props.size};
    line-height: ${props => props.lineHeight};
    color: ${props => props.color};
    margin: ${props => props.margin};
    text-align: ${props => props.textAlign};
    display: ${props => props.display ?? null};
`

const Text = ({ children, ...props }) => {
  return <BaseText {...props}>{children}</BaseText>
}


export const createTextComponent = (name, textProps = {}) => {
  return class TextComponent extends React.PureComponent {
    static displayName = name

    render() {
      return <Text {...textProps} {...this.props} />
    }
  }
}

Text.propTypes = {
  fontFamily: PropTypes.string,
  weight: PropTypes.oneOf([100, 200, 300, 400, 500, 600, 700, 800, 900]),
  size: PropTypes.string,
  lineHeight: PropTypes.string,
  margin: PropTypes.string,
  color: PropTypes.string,
  textAlign: PropTypes.string,
  display: PropTypes.oneOf(['inline', 'inline-block', 'block', 'none']),
}

Text.defaultProps = {
  fontFamily: 'Roboto',
  weight: 400,
  size: '18px',
  lineHeight: '2rem',
  color: primary,
  margin: '0',
  textAlign: 'left',
  display: 'block'
}

export default Text



