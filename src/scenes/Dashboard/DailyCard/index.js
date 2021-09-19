import React, { useState, useEffect } from 'react'
import { Text, Card, CardHeader, CardBody, IconDelete, red, green } from '../../../linaria-components'
import ModalInput from '../MealModal'
import { deleteOneCard } from "../../../data/api/dashboard_api"


const renderMealRecord = () => {
  const mealRecord = document.querySelectorAll(".meal-record")
  for (let i = 0; i < mealRecord.length; i++) {
    // console.log(mealRecord[i].textContent)
    if (mealRecord[i].textContent === "") {
      mealRecord[i].parentElement.classList.add("hidden")
    }
    if (mealRecord[i].textContent !== "") {
      mealRecord[i].parentElement.classList.remove("hidden")
    }
  }
}

function DailyCard({ id, title, user, meal1, meal2, meal3, meal4, meal5, meal6, total, metabolism_rate }) {
  const [openModal, setOpenModal] = useState(false)
  const [remain, setRemain] = useState(0)
  const [cardColor, setCardColor] = useState("")
  const COLOR_GREEN = { green }.green
  const COLOR_RED = { red }.red

  useEffect(() => {
    renderMealRecord()
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
            <Text weight={700} id='total'
              className="daily-card__total-calories">
              Total eaten: &nbsp;
              <span className="meal-record" >{total}</span>
            </Text>
            <Text weight={700} id='remaining'
              className="daily-card__remaining-calories">
              Remaining: &nbsp;
              <span className="meal-record" >{remain}</span>
            </Text>
          </div>

          <div className="card--meal-record-wrapper">
            <span id='meal-1'>
              #1 Meal: &nbsp;
              <span className="meal-record" >{meal1}</span>
            </span>
            <span id='meal-2'
              className="daily-card__span--line-break">
              #2 Meal: &nbsp;
              <span className="meal-record" >{meal2}</span>
            </span>
            <span id='meal-3'
              className="daily-card__span--line-break">
              #3 Meal: &nbsp;
              <span className="meal-record" >{meal3}</span>
            </span>
            <span id='meal-4'
              className="daily-card__span--line-break">
              #4 Meal: &nbsp;
              <span className="meal-record" >{meal4}</span>
            </span>
            <span id='meal-5'
              className="daily-card__span--line-break">
              #4 Meal: &nbsp;
              <span className="meal-record" >{meal5}</span>
            </span>
            <span id='meal-6'
              className="daily-card__span--line-break">
              #4 Meal: &nbsp;
              <span className="meal-record" >{meal6}</span>
            </span>
          </div>
        </CardBody>
      </Card>
      {openModal && <ModalInput closeModal={() => setOpenModal(false)} cardId={id} />}
    </>
  )
}


export default DailyCard