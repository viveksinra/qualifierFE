import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MainProvider } from "./Components/Context/MainContext";
import App from "./App";
import ThemeProvider from "./Components/UI/ThemeProvider";
// import * as serviceWorker from "./serviceWorker";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ThemeProvider>
		<BrowserRouter>
			<MainProvider>
				<App />
			</MainProvider>
		</BrowserRouter>
	</ThemeProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
