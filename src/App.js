import React, { lazy, Suspense, Fragment } from "react";
import { CircularProgress } from "@material-ui/core";
import TopTray from "./Components/Decoration/TopTray";
import MainRoute from "./Components/Routes/MainRoute";

export default function App() {
	return (
		<Fragment>
			<TopTray />
			<Suspense
				fallback={
					<div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
						<CircularProgress />
					</div>
				}
			>
				<MainRoute />
			</Suspense>
		</Fragment>
	);
}
