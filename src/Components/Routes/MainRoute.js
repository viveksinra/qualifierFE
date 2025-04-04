import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import Home from "../../Home";
import Backdrop from "../Backdrop";
import Login from "../Login/Login";
const PublicRoutes = lazy(() => import("./PublicRoutes"));
const AdminRoutes = lazy(() => import("./AdminRoutes"));

const LoadingFallback = () => (
	<Box 
		display="flex" 
		justifyContent="center" 
		alignItems="center" 
		width="100%" 
		height="calc(100vh - 64px)"
		sx={{ 
			position: "fixed", 
			top: 64, 
			left: 0, 
			backgroundColor: "rgba(255, 255, 255, 0.7)" 
		}}
	>
		<CircularProgress />
	</Box>
);

export default function MainRoute() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/login/:token" element={<Login />} />
			<Route path="/*" element={
				<Suspense fallback={<LoadingFallback />}>
					<PublicRoutes />
				</Suspense>
			} />
			<Route path="/admin/*" element={
				<Suspense fallback={<LoadingFallback />}>
					<AdminRoutes />
				</Suspense>
			} />
		</Routes>
	);
}
