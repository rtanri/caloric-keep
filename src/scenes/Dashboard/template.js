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
              meal1={card.meal1}
              meal2={card.meal2}
              meal3={card.meal3}
              meal4={card.meal4}
              meal5={card.meal5}
              meal6={card.meal6}
              total={card.total}
              metabolism_rate={props.printedSMR}
            />
          ))}
        </Flexbox>
      </Container>
    </>
  )
}

export default DashboardPage

