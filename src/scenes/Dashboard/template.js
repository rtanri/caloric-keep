import React, { useState, useEffect, useContext } from 'react'
import { Text, H1, H2, Container, Flexbox, Spacer } from '../../linaria-components'
import { gray_2, red, green, secondary } from '../../linaria-components'
import { FormattedMessage } from 'react-intl'
import DailyCard from './DailyCard'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../services/firebase/firebase';
import { AuthContext } from "../../services/AuthProvider.jsx"
import { Skeleton, Button } from "antd"
import ModalNewCard from "./NewCardModal"


const DashboardPage = () => {
  const auth = useContext(AuthContext)
  const [cardDeck, setCardDeck] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [openNewCardModal, setOpenNewCardModal] = useState(false)
  const [userID, setUserID] = useState("")
  const [metaRate, setMetaRate] = useState([2100, 1800, 1650]);
  const [printedSMR, setPrintedSMR] = useState(2100)

  const COLOR_RED = { red }
  const COLOR_GREEN = { green }

  useEffect(() => {
    setIsLoading(true)
    setTimeout(() => {
      getAllCard()
    }, 2500)
  }, [])


  const getAllCard = async () => {
    try {
      const getUserId = await auth.authUserID
      setUserID(getUserId)
      console.log(getUserId)
    } catch (err) {
      console.log(err)
    }

    let cardCollection = query(collection(db, "cards"), where("user_id", "==", auth.authUserID));

    const cardSnapshot = await getDocs(cardCollection)
    let docArray = []

    cardSnapshot.forEach((doc) => {

      let currentCard = doc.data()
      currentCard.id = doc.id
      let total = 0
      let remain = 0
      let card_color = COLOR_GREEN.green

      if (currentCard.meals) {
        let mealArray = currentCard.meals
        let foodData = []

        if (mealArray[0]) {

          for (const key of mealArray) {
            foodData.push(`${key.name} (${key.calories})`)
            total += parseInt(key.calories);
          }
          if (total >= printedSMR) {
            card_color = COLOR_RED.red
          }
          remain = printedSMR - total
        }

        docArray.push({
          key: currentCard.id,
          id: currentCard.id,
          title: currentCard.title,
          user: currentCard.user_id,
          color: card_color,
          total: total,
          remain: remain,
          meal1: foodData[0],
          meal2: foodData[1],
          meal3: foodData[2],
          meal4: foodData[3],
          meal5: foodData[4],
        })
        return;
      }

      docArray.push({
        key: currentCard.id,
        id: currentCard.id,
        title: currentCard.title,
        user: currentCard.user_id,
        color: card_color,
        total: total,
        remain: remain,
      })
    })
    setCardDeck(docArray)
    setIsLoading(false)
  }

  const handleAddNewCard = () => {
    setOpenNewCardModal(true)
  }

  const Add = metaRate.map(Add => Add)

  const handleMetaRateDropdown = (e) => {
    setPrintedSMR(metaRate[e.target.value])
  }

  if (isLoading) {
    return (<Skeleton active={true} />)
  }

  return (
    <>
      <div className="dashboard-setting--wrapper">
        <div className="dashboard__metabolism-rate--wrapper">
          <Text color={secondary} display="inline">
            <FormattedMessage
              id="dashboard.metabolism.rate"
              defaultMessage='My current static-metabolism-rate: {rate}'
              values={{ rate: `${printedSMR}` }}
            />
          </Text>

          <select onChange={e => handleMetaRateDropdown(e)} className="dropdown--metaRate">
            {
              Add.map((calories, key) => <option value={key}>{calories}</option>)
            }
          </select>
        </div>
        <div className="dashboard__button--new-card">
          <Button
            className="primary-button--full-width"
            onClick={handleAddNewCard}
          >
            <FormattedMessage
              id="dashboard.button.new_card"
              defaultMessage="Add New Card"
            />
          </Button>
        </div>
      </div>


      {openNewCardModal &&
        <ModalNewCard closeModal={() => setOpenNewCardModal(false)} currentUserId={userID} />
      }

      <Spacer spacing={32} />

      <Container borderColor={gray_2}>

        <Flexbox>
          {cardDeck && cardDeck.map((card) => (
            <DailyCard
              color={card.color}
              title={card.title}
              key={card.key}
              id={card.id}
              user={card.user}
              meal1={card.meal1}
              meal2={card.meal2}
              meal3={card.meal3}
              meal4={card.meal4}
              meal5={card.meal5}
              total={card.total}
              remain={card.remain}
            />
          ))}
        </Flexbox>

      </Container>

    </>)
}

export default DashboardPage

