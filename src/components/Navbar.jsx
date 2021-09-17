import { useContext } from "react";
import { Menu, Button } from "antd";
import { useHistory, Link } from "react-router-dom";
import { FormattedMessage } from 'react-intl'
import { AuthContext } from "../services/AuthProvider";
import { TranslationContext } from '../services/TranslationProvider'

function Navbar() {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const context = useContext(TranslationContext);

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

      
        {auth.token ? (
          <Menu.Item key="logout">
            <Button type="danger" onClick={auth.logout}>
            <FormattedMessage
                  id="menu_bar.nav.logout"
                  defaultMessage="Logout"
            />
            </Button>
          </Menu.Item>
        ) : (
          <>
          <Menu.Item key="register">
            <Link to="/register">
              <FormattedMessage
                id="menu_bar.nav.register"
                defaultMessage="Register"
              />
            </Link>
          </Menu.Item>
          
          <Menu.Item key="login" disabled className="menu-item--left">
            <Button className="primary-button smaller-button" onClick={redirectToLogin}>
              <FormattedMessage
                id="menu_bar.nav.login"
                defaultMessage="Login"
              />
            </Button>
          </Menu.Item>
          </>
        )}

				<Menu.Item key="translation" disabled className="menu-select--styling">
            <select value={context.locale} onChange={context.handleLangChange}>
              <option value="en">English</option>
              <option value="id">Indonesia</option>
              <option value="ch">Chinese</option>
              <option value="jp">Japanese</option>
            </select>
        </Menu.Item>
      
      </Menu>
    </header>
  );
}

export default Navbar
;
