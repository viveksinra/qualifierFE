import React, { createContext, useReducer, useEffect } from "react";
import PracReducers from "./PracticeReducer";
import { PRESET } from "../types";
export const PracContext = createContext();

const pracState = {
	loading: true,
	question: {
		_id: "sdsdsdsds",
		questionTitle:
			"Firefox now supports hiding scrollbars with CSS, so all major browsers are now covered (Chrome, Firefox, Internet Explorer, Safari, etc.). Simply apply the following CSS to the element you want to remove scrollbars from:",
		qType: "Ques Type",
		image: "",
		highlight: "New",
		hint: "This is a hint",
		solTitle: "This is a solution of the question.",
		solImage: "",
	},
	correctOption: null,
	level: "Very Easy",
	category: {},
	chapter: {},
	course: {},
	subject: {},
	ansRight: false,
	optionClicked: null,
	submitted: false,
	skip: false,
	maxTime: 20,
	showSol: false,
	options: [
		{ _id: "5e84991c8000113e6093438e", number: 1, title: "Open Qualifier" },
		{ id: "5e84991c8000113e6093438d", number: 2, title: "Select Test Series" },
		{ id: "5e84991c8000113e6093438c", number: 3, title: "Choose your Test" },
		{ id: "5e84991c8000113e6093438b", number: 4, title: "Start the selected Test." },
		{ id: "5e84991c8000113e6093438b", number: 5, title: "See your Detailed Report." },
	],
	timeTaken: "",
	match: null,
	end: false,
};

export const PracticeProvider = (props) => {
	const [Pstate, Pdispatch] = useReducer(PracReducers, pracState);
	useEffect(() => {
		return () => {
			Pdispatch({ type: PRESET });
		};
	}, []);
	return <PracContext.Provider value={{ Pstate, Pdispatch }}>{props.children}</PracContext.Provider>;
};
