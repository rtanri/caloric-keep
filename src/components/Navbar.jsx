import { useContext } from "react";
import { Menu, Button } from "antd";
import { useHistory, Link } from "react-router-dom";
import {Section} from '../styles'
// import { AuthContext } from "./AuthProvider";

function Navbar() {
//   const auth = useContext(AuthContext);
  const history = useHistory();

  const redirectToLogin = () => {
    history.push("/login");
	};

  return (
    <header className="site0header">
				<Menu mode="horizontal" style={{ margin: '0 auto', maxWidth:'1660px', width:'100%'}}>
        <Menu.Item key="dashboard" >
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="register">
          <Link to="/register">Register</Link>
				</Menu.Item>
				
				<Menu.Item key="login" disabled>
					<Button type="primary" onClick={redirectToLogin}>
						Login
					</Button>
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
