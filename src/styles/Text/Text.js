import React from 'react'
import { styled } from 'linaria/react'
import PropTypes from 'prop-types'


// import { Palette } from '../Colors'
// import { fromTheme } from '../Colors/helpers'

const BaseText = styled.div`
    font-family: ${props => props.fontFamily }, sans-serif;
    font-weight: ${props => props.weight};
    font-size: ${props => props.size};
    line-height: ${props => props.lineHeight};
    color: ${props => props.color};
`

const Text = ({children, ...props}) => {
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
  fontFamily: PropTypes.oneOf(['Roboto', 'sans-serif']),
  weight:PropTypes.oneOf([100,200,300,400,500,600,700,800,900]),
  size: PropTypes.string,
  lineHeight: PropTypes.string,
  color: PropTypes.oneOf(['Default', 'DarkMode'])
  // color: PropTypes.oneOf(keysIn(Palette()))
}

Text.defaultProps = {
    fontFamily: 'Roboto',
    weight: 400,
    size: '18px',
    lineHeight: '1.2em',
    color: 'Default',
}

export default Text