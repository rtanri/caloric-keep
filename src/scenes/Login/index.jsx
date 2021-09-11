import { useState, useContext } from 'react';
import { H1, Text, Container } from '../../linaria-components'
import { FormattedMessage } from 'react-intl'
import { Form, Button, Input, notification } from 'antd'
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AuthContext } from '../../services/AuthProvider';

function LoginPage(props) {
	const auth = useContext(AuthContext);

	const [isLoggingIn, setIsLoggingIn] = useState(false);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	
	const handleSubmit = async () => {
		setIsLoggingIn(true);
		
		const loginSuccess = await auth.login(email, password);
		console.log(`${email} + ${password}`)
		console.log("==loginSuccess==")
		console.log(loginSuccess)

    if (loginSuccess) {
      notification.open({
        message: "Login Success",
        placement: "topRight",
      });
    } else {
      notification.open({
        message: "Login Failed",
        placement: "topRight",
      });
    }
    setIsLoggingIn(false);
	}

	return (
		<Container>
			<H1>
				<FormattedMessage
					id="login_page.header"
					defaultMessage="Login Account"
				/>
			</H1>
			
			{/* Form login */}
			
			<Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          // onFinish={onFinish}
				>
				<div className="login__form-input-wrapper">
					<Form.Item
						id="email-login"
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
							placeholder="Email"
							onChange={e => (setEmail(e.target.value))}
            />
          </Form.Item>

					<Form.Item
						id="password-login"
            name="password"
            rules={[{ required: true, message: "key in your password" }]}
          >
            <Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="Password"
						onChange={e => (setPassword(e.target.value))}
            />
          </Form.Item>

          <Form.Item>
            <Button
              className="primary-button"
              loading={isLoggingIn}
							disabled={isLoggingIn}
							onClick={handleSubmit}
            >
              Login
            </Button>
					</Form.Item>
					</div>
				</Form>
		</Container>
	)
}

export default LoginPage;