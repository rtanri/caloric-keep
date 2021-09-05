import React from 'react'
import { styled } from 'linaria/react'
import PropTypes from 'prop-types'
import { transparent, black } from '../Colors'
import { IconDelete } from '../Icons'

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

const AbsoluteSpan = styled.span`
      position: absolute;
      top: 0;
      right: 0;
      color: ${black};
      font-size: 22px;

      &:hover {
            opacity: 0.5;
            cursor: pointer;
      }
`

export const CardHeader = ({ children, ...props }) => {
      return <BaseCardHeader {...props} >
            {children}
            <AbsoluteSpan>{IconDelete}</AbsoluteSpan>
      </BaseCardHeader>
}



