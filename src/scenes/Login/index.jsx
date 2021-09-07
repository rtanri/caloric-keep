// import { useState } from 'react';
import { H1, Text, Container } from '../../styles'
import { FormattedMessage } from 'react-intl'

function LoginPage(props) {
	return (
		<Container>
			<H1>
				<FormattedMessage
					id="login_page.header"
					defaultMessage="Login Account"
				/>
			</H1>
			<Text>This is Login page for guest</Text>
		</Container>
	)
}

export default LoginPage;