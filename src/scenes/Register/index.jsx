// import { useState } from 'react';
import { H1, Text, Container } from '../../styles'
import { FormattedMessage } from 'react-intl'


function RegisterPage(props) {
      return (
      <Container>
					<H1>
						<FormattedMessage
							id="Register_page.header"
							defaultMessage="Register New User"
						/>
					</H1>
						<Text>This is Sign-up page</Text>
			</Container>
      )
}

export default RegisterPage;