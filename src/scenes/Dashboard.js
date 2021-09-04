import React from 'react'
import * as R from 'ramda'
import { Text, H1, H2, Section, Container, Spacer } from '../styles'


function Dashboard() {
    const plus = R.add(2, 3);

    return <div>
        <Section>
            <H1>Caloric Keep</H1>

            <Container>
                <H2>Check your Progress</H2>
                <Text>I try DIY text</Text>
                <Spacer />
                <Text>This is poppins texts</Text>
                <Spacer spacing={100} />
                <Text>{plus}</Text>
            </Container>

        </Section>

    </div>
}

export default Dashboard