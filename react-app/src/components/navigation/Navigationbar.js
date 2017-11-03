import React  from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect }from "react-redux";
import { logout } from "../../actions/auth";

const Navigationbar = ({ isAuthenticated, logoutfunc }) => (

    <Menu>
        <Menu.Item name='home' as={Link} to="/">
            Home
        </Menu.Item>
        {isAuthenticated ? 
        <Menu.Menu position='right'>
            <Menu.Item name='logout' onClick={() => logoutfunc()}>
                Logout
            </Menu.Item>
        </Menu.Menu>
        :
        <Menu.Menu position='right'>
            <Menu.Item name='signup' as={Link} to="/signup">
                Sign Up
            </Menu.Item>
            <Menu.Item name='login' as={Link} to="/login">
                Login
            </Menu.Item>
        </Menu.Menu>
        }
    </Menu>
)

Navigationbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    logoutfunc: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.user.token
    }
}

export default connect(mapStateToProps, {logoutfunc: logout})(Navigationbar);
