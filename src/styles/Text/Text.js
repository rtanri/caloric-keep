import React from 'react'
import { styled } from 'linaria/react'
import PropTypes from 'prop-types'

const BaseText = styled.div`
    font-family: ${props => props.fontFamily }, arial, sans-serif;
    font-weight: ${props => props.weight};
    font-size: ${props => props.size};
    line-height: ${props => props.lineHeight};
    color: ${props => props.color};
    bottom-margin: ${props => props.bottomMargin}
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
  fontFamily: PropTypes.string,
  weight:PropTypes.oneOf([100,200,300,400,500,600,700,800,900]),
  size: PropTypes.string,
  lineHeight: PropTypes.string,
  // color: PropTypes.oneOf(['Default', 'DarkMode']),
  bottomMargin: PropTypes.string,
  color: PropTypes.string,
}

Text.defaultProps = {
    fontFamily: 'Roboto',
    weight: 400,
    size: '18px',
    lineHeight: '2rem',
    color: 'Default',
    bottomMargin: "10px"
}

export default Text



