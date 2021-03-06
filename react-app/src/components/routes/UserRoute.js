import React from "react";
import { Route, Redirect } from "react-router-dom" ;
import { connect }from "react-redux";
import PropTypes from "prop-types"; 

const UserRoute = ({isAuthenicated, component: Component, ...rest }) => (
    <Route {...rest } render={props => 
        isAuthenicated ? <Component  {...props}/> : <Redirect to="/login"/> }
    />
);

UserRoute.propTypes = {
    component: PropTypes.func.isRequired,
    isAuthenicated: PropTypes.bool.isRequired
};

function mapStateToProp(state){
    return {
        isAuthenicated: !!state.user.token
    }
}

export default connect(mapStateToProp)(UserRoute);