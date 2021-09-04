import React from 'react'
import * as R from 'ramda'
import { Text, H1, H2, Section, Container, Card, CardHeader, CardBody, Flexbox } from '../styles'
import { gray_2, gray_1, red, green } from '../styles'
import { IconDelete } from '../styles'


function Dashboard() {
    const plus = R.add(2, 3);

    return <div>
        <Section>
            <H1>Caloric Keep</H1>

            <Container borderColor={gray_2}>
                <H2>Last 7 days</H2>
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
                    <Card />
                    <Card color={red} />
                </Flexbox>

            </Container>

        </Section>

    </div>
}

export default Dashboard