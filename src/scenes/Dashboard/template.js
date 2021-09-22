import React from 'react'
import { Container, Flexbox } from '../../linaria-components'
import { gray_2 } from '../../linaria-components'
import DailyCard from './DailyCard'

const DashboardPage = (props) => {
  let deckArray = props.cardDeck

  return (
    <>
      <Container borderColor={gray_2}>
        <Flexbox>
          {deckArray && deckArray.map((card) => (
            <DailyCard
              title={card.title}
              key={card.key}
              id={card.id}
              user={card.user}
              allMeals={card.allMeals}
              total={card.total}
              metabolism_rate={props.printedSMR}
              refreshAllCards={props.refreshAllCards}
            />
          ))}
        </Flexbox>
      </Container>
    </>
  )
}

export default DashboardPage

