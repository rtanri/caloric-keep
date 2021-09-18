import React from 'react'
import { styled } from 'linaria/react'
import { transparent, black, secondary, grey_1, grey_2 } from '../Colors'
import { IconDelete } from '../Icons'
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../services/firebase/firebase"

const BaseCardHeader = styled.div`
      display: inline-flex;
      position: relative;
      min-height: 30px;
      font-weight: 900;
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

export const CardHeader = ({ children, cardId, ...props }) => {

  // const handleCardDelete = async () => {
  //   console.log(cardId)
  //   console.log(db)
  //   await deleteDoc(doc(db, "cards", cardId));
  // }

  return <BaseCardHeader {...props} >
    {children}
    {/* <AbsoluteSpan handleCardDelete={handleCardDelete}>{IconDelete}</AbsoluteSpan> */}
  </BaseCardHeader>
}



