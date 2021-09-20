import React, { useState, useEffect } from 'react'
import { Text, Card, CardHeader, CardBody, IconDelete, red, green } from '../../../linaria-components'
import ModalInput from '../MealModal'
import { deleteOneCard } from "../../../data/api/dashboard_api"
import { CommonLabels as CardLabels } from './CommonLabels'

function DailyCard({ id, title, user, allMeals, total, metabolism_rate }) {
  const [openModal, setOpenModal] = useState(false)
  const [remain, setRemain] = useState(0)
  const [cardColor, setCardColor] = useState("")
  const COLOR_GREEN = { green }.green
  const COLOR_RED = { red }.red
  console.log(allMeals)

  useEffect(() => {
    renderRemainingValue()
  }, [metabolism_rate])

  const handleOnClick = () => {
    setOpenModal(true)
  }

  const renderRemainingValue = () => {
    let remainingValue = metabolism_rate - total
    setRemain(remainingValue)
    remainingValue >= 0 ? setCardColor(COLOR_GREEN) : setCardColor(COLOR_RED)
  }

  const handleCardDelete = () => {
    deleteOneCard(id)
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
              {allMeals[0] && allMeals.map((food) => (
                <li>{CardLabels.MEAL} &nbsp; {food} </li>
              ))}
            </ul>
          </div>

        </CardBody>
      </Card>
      {openModal && <ModalInput closeModal={() => setOpenModal(false)} cardId={id} />}
    </>
  )
}


export default DailyCard