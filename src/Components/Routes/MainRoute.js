import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../../Home";
import Backdrop from "../Backdrop";
const PublicRoutes = lazy(() => import("./PublicRoutes"));
const AdminRoutes = lazy(() => import("./AdminRoutes"));
export default function MainRoute() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/*" element={
				<Suspense fallback={<Backdrop open={true} />}>
					<PublicRoutes />
					<Suspense fallback={<Backdrop open={true} />}>
						<AdminRoutes />
					</Suspense>
				</Suspense>
			} />
		</Routes>
	);
}
