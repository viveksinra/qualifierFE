import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../Home";
import Backdrop from "../Backdrop";
import Login from "../Login/Login";
const PublicRoutes = lazy(() => import("./PublicRoutes"));
const AdminRoutes = lazy(() => import("./AdminRoutes"));
export default function MainRoute() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/login/:token" element={<Login />} />
			<Route path="/*" element={
				<Suspense fallback={<Backdrop open={true} />}>
					<PublicRoutes />
				</Suspense>
			} />
			<Route path="/admin/*" element={
				<Suspense fallback={<Backdrop open={true} />}>
					<AdminRoutes />
				</Suspense>
			} />
		</Routes>
	);
}
