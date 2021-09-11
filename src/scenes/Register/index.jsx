import { useState, useContext } from 'react';
import { AuthContext } from '../../services/AuthProvider'
import { H1, Container } from '../../linaria-components'
import { FormattedMessage } from 'react-intl'
import { Form, Input, Button, notification } from "antd";
import { UserOutlined, LockOutlined, ExclamationCircleOutlined } from "@ant-design/icons";


function RegisterPage(props) {

	const auth = useContext(AuthContext);
	
	const [isSigningIn, setIsSigningIn] = useState(false);
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	const handleSubmit = async e => {
		setIsSigningIn(true);

		if (password !== confirmPassword) {
			notification.open({
				message: "Password and Confirm-Password is not match",
				placement: "topRight",
			})
			return
		}
		
		let registerSuccess = await auth.register(email, password);
		console.log(registerSuccess)

		if (registerSuccess) {
			console.log(1)
			notification.open({
				message: "Registration Success",
				placement: "topRight",
			});
		} else {
			console.log(2)
			notification.open({
				message: "Registration Failed",
				placement: "topRight",
			});
			console.log(3)
			setIsSigningIn(false)
		}
	}
		return (
			<Container>
				<H1>
					<FormattedMessage
						id="Register_page.header"
						defaultMessage="Register New User"
					/>
				</H1>
				<Form
					name="register-form"
					className="register-form"
					initialValues={{ remember: true }}
				// onFinish={onFinish}
				>
					<div className="login__form-input-wrapper">
						<Form.Item
							name="email"
							rules={[{ required: true, message: "Please input your Email!" }]}
						>
							<Input
								prefix={<UserOutlined className="site-form-item-icon" />}
								placeholder="Email"
								onChange={e => (setEmail(e.target.value))}
							/>
						</Form.Item>

						{/* password input */}
						<Form.Item
							name="password"
							rules={[{ required: true, message: "repeat your password again" }]}
						>
							<Input
								prefix={<LockOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="Password"
								onChange={e => (setPassword(e.target.value))}
							/>
						</Form.Item>

						{/* confirm password */}
						<Form.Item
							name="confirm-password"
							rules={[{ required: true, message: "key in your password" }]}
						>
							<Input
								prefix={<ExclamationCircleOutlined className="site-form-item-icon" />}
								type="password"
								placeholder="Re-enter Your Password"
								onChange={e => (setConfirmPassword(e.target.value))}
							/>
						</Form.Item>

						<Form.Item>
							<Button
								className="primary-button"
								loading={isSigningIn}
								disabled={isSigningIn}
								onClick={handleSubmit}
							>
								Sign-in
							</Button>
						</Form.Item>
					</div>
				</Form>
			</Container>
		)
}

export default RegisterPage;