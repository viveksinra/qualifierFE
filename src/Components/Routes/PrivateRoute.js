import React from "react";
import { MainContext } from "../Context/MainContext";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

const UserPrivateRoute = ({ children }) => {
	const { state } = useContext(MainContext);
	const isAuthenticated = state.isAuthenticated && state.designation === "User";
	
	return isAuthenticated ? (children || <Outlet />) : <Navigate to="/login" replace />;
};

const AdminPrivateRoute = ({ children }) => {
	const { state } = useContext(MainContext);
	const isAuthenticated = state.isAuthenticated && (state.designation === "Admin" || state.designation === "Manager");
	
	return isAuthenticated ? (children || <Outlet />) : <Navigate to="/login" replace />;
};

export { UserPrivateRoute, AdminPrivateRoute };
