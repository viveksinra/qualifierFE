import React from "react";
import ReactDOM from "react-dom";
import { MuiThemeProvider, createMuiTheme, withStyles } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
// import * as serviceWorker from "./serviceWorker";
import { deepPurple, blue } from "@material-ui/core/colors";
import MainRoute from "./Components/Routes/MainRoute";
import { MainProvider } from "./Components/Context/MainContext";

const theme = createMuiTheme({
	palette: {
		primary: blue,
		secondary: deepPurple,
	},
	status: {
		danger: "orange",
	},
	typography: {
		fontFamily: ["Roboto", "system-ui"].join(","),
		overrides: {
			MuiCssBaseline: {
				"@global": {
					"@letter-spacing": "1px",
				},
			},
		},
	},
});

const GlobalCSS = withStyles({
	"@global": {
		"*": {
			margin: 0,
			"-webkit-font-smoothing": "antialiased",
			"-moz-osx-font-smoothing": "grayscale",
			"&::-webkit-scrollbar": {
				width: "12px",
			},
			"&::-webkit-scrollbar-track": {
				"-webkit-box-shadow": "inset 0 0 6px rgba(0, 0, 0, 0.3)",
				borderRadius: 10,
			},
			"&::-webkit-scrollbar-thumb": {
				"-webkit-box-shadow": "inset 0 0 6px rgba(0, 0, 0, 0.5)",
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
		[theme.breakpoints.down("md")]: {
			"#logo": {
				width: "150px !important",
			},
			".hideInMob": {
				display: "none",
			},
		},
	},
})(() => null);

ReactDOM.render(
	<MuiThemeProvider theme={theme}>
		<GlobalCSS />
		<BrowserRouter>
			<MainProvider>
				<MainRoute />
			</MainProvider>
		</BrowserRouter>
	</MuiThemeProvider>,
	document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
