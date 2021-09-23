import { useState, useContext } from 'react';
import { H1, Text, Container } from '../../linaria-components'
import { FormattedMessage } from 'react-intl'
import { Form, Button, Input, notification } from 'antd'
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { AuthContext } from '../../data/services/AuthProvider';

function LoginPage() {
  const auth = useContext(AuthContext);

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loadingGuest, setloadingGuest] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleSubmit = async () => {
    setIsLoggingIn(true);
    const loginSuccess = await auth.login(email, password);
    
    if (loginSuccess) {
      notification.success({
        message: "Login Success",
        placement: "topRight",
      });
    } else {
      notification.error({
        message: "Login Failed",
        placement: "topRight",
      });
    }
    setIsLoggingIn(false);
	}
	
	const handleGuestSignin = async () => {
		setloadingGuest(true);
		const guestLoginSuccess = await auth.loginAsGuest();
		if (guestLoginSuccess) {
      console.log("guest login is success")
    } else {
      console.log("guest login is failed")
		}
		setloadingGuest(false);
	}

			return (
			<Container position="relative" bottom="40px">
				<H1 textAlign="center">
					<FormattedMessage
						id="login_page.header"
						defaultMessage="Login Account"
					/>
				</H1>

				<Form
					name="normal_login"
					className="login-form"
					initialValues={{ remember: true }}
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
							<FormattedMessage
                id="menu_bar.nav.login"
                defaultMessage="Login"
              />
						</Button>
              </Form.Item>
              
					<Form.Item>
								
					<Text textAlign="center" margin="20px 0 0 0">
						<FormattedMessage
							id="login_page.content.divider"
							defaultMessage="
							--------------------------------------- OR ---------------------------------------
							{br}
							Sign-in with guest access"
							values={{
								br: (
									<>
										<br/>
										<br/>
									</>
								)
							}}
						/>
					</Text>		
					</Form.Item>
							
					<Form.Item>
						<Button
							className="secondary-button"
							loading={loadingGuest}
							disabled={loadingGuest}
							onClick={handleGuestSignin}
						>
							<FormattedMessage
                id="login_page.button.submit.guest"
                defaultMessage="Enter"
              />
						</Button>
								
					</Form.Item>
								</div>
							</Form>
						</Container>
			)
}

export default LoginPage;