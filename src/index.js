import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
// import * as serviceWorker from "./serviceWorker";
import { deepPurple, blue } from "@mui/material/colors";
import MainRoute from "./Components/Routes/MainRoute";
import { MainProvider } from "./Components/Context/MainContext";
import { GlobalStyles } from "@mui/material";

const theme = createTheme({
	palette: {
		primary: blue,
		secondary: deepPurple,
	},
	status: {
		danger: "orange",
	},
	typography: {
		fontFamily: ["Roboto", "system-ui"].join(","),
	},
});

const globalStyles = {
	"*": {
		margin: 0,
		WebkitFontSmoothing: "antialiased",
		MozOsxFontSmoothing: "grayscale",
		"&::-webkit-scrollbar": {
			width: "12px",
		},
		"&::-webkit-scrollbar-track": {
			WebkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
			borderRadius: 10,
		},
		"&::-webkit-scrollbar-thumb": {
			WebkitBoxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.5)",
			borderRadius: 10,
		},
		"& a": {
			textDecoration: "none",
			color: "rgb(0, 110, 255)",
			transition: "all 0.3s ease 0s",
		},
	},
	".center": {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	".typewriter": {
		fontSize: "2rem",
		color: "blueviolet",
	},
	".typewriter2": {
		fontSize: "1.5rem",
		color: "blue",
	},

	"#logo": {
		width: "14vw",
		backgroundAttachment: "fixed",
	},
	[`@media (max-width:${theme.breakpoints.values.md}px)`]: {
		"#logo": {
			width: "150px !important",
		},
		".hideInMob": {
			display: "none",
		},
	},
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ThemeProvider theme={theme}>
		<GlobalStyles styles={globalStyles} />
		<BrowserRouter>
			<MainProvider>
				<MainRoute />
			</MainProvider>
		</BrowserRouter>
	</ThemeProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
