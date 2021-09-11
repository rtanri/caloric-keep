import React from 'react'
import * as R from 'ramda'
import { Text, H1, H2, Container, Card, CardHeader, CardBody, Flexbox } from '../../linaria-components'
import { gray_2, gray_1, red, green } from '../../linaria-components'
import { FormattedMessage } from 'react-intl'

function DashboardPage() {
      const plus = R.add(2, 3);

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
                        <Card color={green} />
                        <Card color={green} >


                              <CardHeader>
                                    Hello World
                              </CardHeader>
                              <CardBody>
                                    <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis neque sed enim luctus pharetra elementum ac nisl. Sed non lorem nunc. Ut pharetra leo blandit,
                                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer quis neque sed enim luctus pharetra elementum ac nisl. Sed non lorem nunc. Ut pharetra leo blandit, </Text>
                              </CardBody>
                        </Card>
                        <Card color={gray_1} />
                        <Card color={green} />
                        <Card color={gray_1} />
                        <Card color={red} />
                        <Card color={red} />
                  </Flexbox>

            </Container>

      </div>
}

export default DashboardPage