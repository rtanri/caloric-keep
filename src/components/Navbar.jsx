import { useContext } from "react";
import { Menu, Button } from "antd";
import { useHistory, Link } from "react-router-dom";
import { Section } from '../styles'
import { FormattedMessage } from 'react-intl'
// import { AuthContext } from "./AuthProvider";
import { Context } from './TranslationProvider'

function Navbar() {
//   const auth = useContext(AuthContext);
  const history = useHistory();
  const context = useContext(Context);

  const redirectToLogin = () => {
    history.push("/login");
	};

  return (
    <header className="site0header">
				<Menu mode="horizontal" style={{ margin: '0 auto', maxWidth:'1660px', width:'100%'}}>
        <Menu.Item key="dashboard" >
          <Link to="/dashboard">
            <FormattedMessage
                  id="menu_bar.nav.dashboard"
                  defaultMessage="Dashboard"
            />
          </Link>
        </Menu.Item>
        <Menu.Item key="register">
          <Link to="/register">
            <FormattedMessage
                  id="menu_bar.nav.register"
                  defaultMessage="Register"
            />
          </Link>
				</Menu.Item>
				
				<Menu.Item key="login" disabled>
					<Button type="primary" onClick={redirectToLogin}>
						<FormattedMessage
                  id="menu_bar.nav.login"
                  defaultMessage="Login"
            />
					</Button>
				</Menu.Item>
				<Menu.Item key="login" disabled>
            <select value={context.locale} onChange={context.handleLangChange}>
                  <option value="en">English</option>
                  <option value="id">Indonesia</option>
            </select>
				</Menu.Item>
            {/* </Menu.Item>
        {auth.token ? (
          <Menu.Item key="logout">
            <Button type="danger" onClick={auth.logout}>
              Logout
            </Button>
          </Menu.Item>
        ) : (
          <>
            <Menu.Item key="login">
              <Button type="primary" onClick={redirectToLogin}>
                Login
              </Button>
            </Menu.Item>

            <Menu.Item key="register">
              <Button type="secondary" onClick={redirectToRegister}>
                Register
              </Button>
            </Menu.Item>
          </>
        )} */}
      </Menu>
    </header>
  );
}

export default Navbar
;
