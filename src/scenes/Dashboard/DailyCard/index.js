import React, { useState, useEffect, useContext } from 'react'
import { Text, Card, CardHeader, CardBody, IconDelete, red, green } from '../../../linaria-components'
import { notification } from 'antd'
import ModalInput from '../MealModal'
import { CardContext } from "../../../data/services/CardProvider"
import { CommonLabels as CardLabels } from './CommonLabels'

function DailyCard({ id, title, user, allMeals, total, metabolism_rate, refreshAllCards }) {
  const deck = useContext(CardContext)
  const [openModal, setOpenModal] = useState(false)
  const [remain, setRemain] = useState(0)
  const [cardColor, setCardColor] = useState("")
  // const [newTotal, setNewTotal] = useState(total)
  const COLOR_GREEN = { green }.green
  const COLOR_RED = { red }.red

  useEffect(() => {
    renderRemainingValue()
  }, [metabolism_rate, total])

  const renderRemainingValue = () => {
    let remainingValue = metabolism_rate - total
    setRemain(remainingValue)
    remainingValue >= 0 ? setCardColor(COLOR_GREEN) : setCardColor(COLOR_RED)
  }

  const handleCloseModal = async () => {
    refreshAllCards()
    setOpenModal(false)
  }

  const handleOnClick = () => {
    setOpenModal(true)
  }

  const handleCardDelete = async () => {
    const deleteCardSuccess = await deck.deleteOneCard(id)
      .then(resp => {
        notification.open({
          message: "Card is deleted",
          placement: "bottomRight",
        })
      })
      .catch(err => {
        notification.error({
          message: "Failed to delete card",
          placement: "bottomRight",
        })
        console.log("Error deleting document: ", err);
      })
      .finally(async () => {
        refreshAllCards()
      })
  }

  return (
    <>
      <Card color={cardColor} className="card">
        <CardHeader cardId={id}>
          {title}
          <span onClick={handleCardDelete} className="absolute-span">{IconDelete}</span>
        </CardHeader>

        <CardBody onClick={handleOnClick}>
          <div className="card--meal-status-wrapper">
            <Text>
              {CardLabels.TOTAL}
              <span className="meal-record" >{total}</span>
            </Text>
            <Text>
              {CardLabels.REMAINING}
              <span className="meal-record" >{remain}</span>
            </Text>
          </div>

          <div className="card--meal-record-wrapper">
            <ul className="card__meal-list">
              {allMeals ? allMeals.map((food) => (
                <li>{CardLabels.MEAL} &nbsp; {food} </li>
              )) :
                <Text size="15px"> {CardLabels.INSTRUCTION}</Text>
              }
            </ul>
          </div>

        </CardBody>
      </Card>
      {openModal &&
        <ModalInput
          closeModal={() => handleCloseModal()}
          cardId={id}
        />}
    </>
  )
}

export default DailyCard