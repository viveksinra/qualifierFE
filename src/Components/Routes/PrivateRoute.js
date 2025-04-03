import React, { useContext } from "react";
import { MainContext } from "../Context/MainContext";
import { Route, Redirect } from "react-router-dom";

const UserPrivateRoute = ({ component: Component, auth, ...rest }) => {
	const { state } = useContext(MainContext);
	let isAuthenticated = state.isAuthenticated && state.designation === "User" ? true : false;
	return <Route {...rest} render={(props) => (isAuthenticated === true ? <Component {...props} /> : <Redirect to="/login" />)} />;
};
const AdminPrivateRoute = ({ component: Component, auth, ...rest }) => {
	const { state } = useContext(MainContext);
	let isAuthenticated = state.isAuthenticated && (state.designation === "Admin" || state.designation === "Manager") ? true : false;
	return <Route {...rest} render={(props) => (isAuthenticated === true ? <Component {...props} /> : <Redirect to="/login" />)} />;
};

export { UserPrivateRoute, AdminPrivateRoute };
