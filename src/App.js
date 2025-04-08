import React, { lazy, Suspense, Fragment } from "react";
import { CircularProgress, Box } from "@mui/material";
import TopTray from "./Components/Decoration/TopTray";
import MainRoute from "./Components/Routes/MainRoute";
import { useTheme } from "@mui/material/styles";
import axios from "axios";

export default function App() {
	const theme = useTheme();
	axios.defaults.baseURL = 'https://practice-api.riskhawk.in';
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
							backgroundColor: "rgba(255, 255, 255, 0.8)",
							color: theme.palette.primary.main
						}}
					>
						<CircularProgress 
							size={60} 
							color="primary"
							thickness={4}
						/>
					</Box>
				}
			>
				<MainRoute />
			</Suspense>
		</Fragment>
	);
}
