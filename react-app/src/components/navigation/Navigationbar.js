import React  from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Navigationbar extends React.Component {
    state = {}
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    
    render() {
        const { activeItem } = this.state
        return(   
            <Menu>
                <Menu.Item name='home' as={Link} to="/" 
                    active={activeItem === 'home'} 
                    onClick={this.handleItemClick}>
                    Home
                </Menu.Item>
                <Menu.Menu position='right'>
                    <Menu.Item name='signup' as={Link} to="/signup" 
                        active={activeItem === 'signup'} 
                        onClick={this.handleItemClick}>
                        Sign Up
                    </Menu.Item>
                    <Menu.Item name='login' as={Link} to="/login" 
                        active={activeItem === 'login'} 
                        onClick={this.handleItemClick}>
                        Login
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    }
}

export default Navigationbar;
