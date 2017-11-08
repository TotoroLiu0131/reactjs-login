import React from "react";
import PropTypes from "prop-types"; 
import LoginPage from "./components/pages/LoginPage";
import SignupPage from "./components/pages/SignupPage";
import HomePage from "./components/pages/HomePage";
import UserRoute from "./components/routes/UserRoute" ;
import GuestRoute from "./components/routes/GuestRoute" ;

const App = ({location}) => (

    <div className="ui container"> 
        <GuestRoute location={location} path="/login" exact component={LoginPage}  />
        <UserRoute location={location} path="/" exact component={HomePage} />
        <UserRoute location={location} path="/signup" exact component={SignupPage} />
    </div>
);

App.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired
    }).isRequired
};


export default App;
