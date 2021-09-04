import React from 'react'
import { styled } from 'linaria/react'
import PropTypes from 'prop-types'
import { transparent } from '../Colors'

const BaseCardHeader = styled.div`
      display: inline-flex;
      position: relative;
      min-height: 30px;
      font-weight: 700;
      font-size: 24px;
      font-family: 'Roboto';
      background-color: ${transparent};
      margin-bottom: 10px;
`

export const CardHeader = ({ children, ...props }) => {
      return <BaseCardHeader {...props} >{children}</BaseCardHeader>
}



