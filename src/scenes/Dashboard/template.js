import React, { useState, useEffect } from 'react'
// import * as R from 'ramda'
import { Text, H1, H2, Container, Flexbox } from '../../linaria-components'
import { gray_2, gray_1, red, green } from '../../linaria-components'
import { FormattedMessage } from 'react-intl'
import DailyCard from './DailyCard'
import ModalInput from './Modal'
import { collection, getDocs, where } from "firebase/firestore";
import { db } from '../../services/firebase/firebase';


const metabolism_rate = 1200;

const DashboardPage = () => {
  // const plus = R.add(2, 3);
  const [cardDeck, setCardDeck] = useState([])
  const COLOR_RED = { red }
  const COLOR_GREEN = { green }


  useEffect(() => {
    getAllCard()
  }, [])


  const getAllCard = async () => {

    const result = await getDocs(collection(db, "cards"), where("user_id", "==", "CuGTCvX8Y6B7gIKvcfAy"))
      .then(docResp => {
        let docArray = [];
        docResp.forEach((card) => {
          let total = 0
          let remain = 0
          let card_color = COLOR_GREEN.green


          if (card.data().meals) {
            let mealArray = card.data().meals
            let mealz = []

            if (mealArray[0]) {

              for (const key of mealArray) {
                mealz.push(`${key.name} (${key.calories})`)
                total += parseInt(key.calories);
              }
              if (total >= metabolism_rate) {
                card_color = COLOR_RED.red
              }
              remain = metabolism_rate - total
              console.log(remain)
            }

            docArray.push({
              key: card.id,
              id: card.id,
              title: card.data().title,
              user: card.data().user_id,
              color: card_color,
              total: total,
              remain: remain,
              meal1: mealz[0],
              meal2: mealz[1],
              meal3: mealz[2],
              meal4: mealz[3],
              meal5: mealz[4],
            })
            return;
          }

          docArray.push({
            key: card.id,
            id: card.id,
            title: card.data().title,
            user: card.data().user_id,
            color: card_color,
            total: total,
            remain: remain,
          })
        }
        )
        console.log(docArray)
        return docArray
      })
      .catch(err => {
        console.log(err)
      })
    console.log(typeof metabolism_rate)
    setCardDeck(result)
  }


  return <div>
    <H1 textAlign="center">
      <FormattedMessage
        id="dashboard.header"
        defaultMessage="Caloric Keep"
      />
    </H1>

    <Container borderColor={gray_2}>
      <H2>
        <FormattedMessage
          id="dashboard.inner.weekly.header"
          defaultMessage="Last 7 days"
        />
      </H2>
      <Flexbox>
        {cardDeck && cardDeck.map((card) => (
          <DailyCard
            color={card.color}
            title={card.title}
            key={card.key}
            id={card.key}
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

  </div>
}

export default DashboardPage

