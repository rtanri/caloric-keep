import React, { useState, useEffect } from 'react'
import { Text, Card, CardHeader, CardBody } from '../../../linaria-components'
import ModalInput from '../Modal'



function DailyCard({ id, color, title, user, meal1, meal2, meal3, meal4, meal5, total, remain, onClick }) {
  const [openModal, setOpenModal] = useState(false)
  const [uniqueUserId, setUniqueUserId] = useState("")

  useEffect(() => {
    renderMealRecord()
    setUniqueUserId(user)
  }, [])

  const handleOnClick = () => {
    setOpenModal(true)
  }

  return (
    <>
      <Card color={color} className="card" onClick={handleOnClick}>
        <CardHeader>
          {title}
        </CardHeader>

        <CardBody>
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
          </div>
        </CardBody>
      </Card>
      {openModal && <ModalInput closeModal={() => setOpenModal(false)} cardId={id} />}
    </>
  )
}


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


export default DailyCard