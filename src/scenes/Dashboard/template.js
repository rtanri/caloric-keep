import React from 'react'
// import * as R from 'ramda'
import { Text, H1, H2, Container, Flexbox } from '../../linaria-components'
import { gray_2, gray_1, red, green } from '../../linaria-components'
import { FormattedMessage } from 'react-intl'
import DailyCard from './DailyCard'
import ModalInput from './Modal'


function DashboardPage() {
  // const plus = R.add(2, 3);

  return <div>
    {/* <H1>Caloric Keep</H1> */}
    <H1>
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
        <DailyCard color={green} title="Sat 11st Sep"
          meal1="cereal (300)"
          meal2="chicken rice (650) "
          meal3="dragon fruits (400) "
          meal4="cakwe (200)"
          total="1550"
          remain="550"
        />
      </Flexbox>

    </Container>

  </div>
}

export default DashboardPage

