import React, { lazy, Suspense, Fragment } from "react";
import { CircularProgress, Box } from "@mui/material";
import TopTray from "./Components/Decoration/TopTray";
import MainRoute from "./Components/Routes/MainRoute";

export default function App() {
	return (
		<Fragment>
			<TopTray />
			<Suspense
				fallback={
					<Box 
						display="flex" 
						justifyContent="center" 
						alignItems="center" 
						width="100%" 
						height="100vh"
						sx={{ 
							position: "fixed", 
							top: 0, 
							left: 0, 
							zIndex: 9999,
							backgroundColor: "rgba(255, 255, 255, 0.7)" 
						}}
					>
						<CircularProgress size={60} />
					</Box>
				}
			>
				<MainRoute />
			</Suspense>
		</Fragment>
	);
}
