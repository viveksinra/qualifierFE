import TestReducers from "./TestReducers";
import { TESTRESET } from "../types";
import React, { createContext, useReducer, useEffect, useRef } from "react";
export const TestContext = createContext();

function useEffectOnce(cb) {
	// code to run the effect only one time when reload is done.
	const didRun = useRef(false);
	useEffect(() => {
		if (!didRun.current) {
			cb();
			didRun.current = true;
		}
	});
}
const testState = {
	testName: "Test is Loading...",
	loading: true,
	totalTime: 90, //in min
	totalQuestion: 100,
	totalMarks: 60,
	instructions: [{ instructions: "Please wait while test is loading." }],
	TseriesLink: "online",
	testLink: "ddfdfdfdf",
	activeSection: "CBT", //title of active section
	testDrawer: false,
	submitBox: false,
	sections: [
		{
			title: "CBT",
			sectionId: "sdafdfdsf",
			activeQuestion: 0,
			questions: [
				{
					question: "Something is wrong while loading your test, Kindly Follow all step.",
					questionImg: "",
					questionId: "fgdffdf",
					marks: {
						correct: 4,
						incorrect: 1,
					},
					status: "NV",
					ansGiven: null,
					timeTaken: null,
					options: [
						{ _id: "5e84991c8000113e6093438e", number: 1, title: "Open Qualifier" },
						{ id: "5e84991c8000113e6093438d", number: 2, title: "Select Test Series" },
						{ id: "5e84991c8000113e6093438c", number: 3, title: "Choose your Test" },
						{ id: "5e84991c8000113e6093438b", number: 4, title: "Start the selected Test." },
					],
				},
			],
		},
	],
};
export const TestProvider = (props) => {
	const [Tstate, Tdispatch] = useReducer(TestReducers, testState);
	useEffectOnce(() => {
		// Retriving data from localStorage
		const raw = localStorage.getItem("testData");
		if (raw) {
			Tdispatch({ type: TESTRESET, payload: JSON.parse(raw) });
		}
	});

	useEffect(() => {
		// to store data in localStorage
		if (Tstate) {
			localStorage.setItem("testData", JSON.stringify(Tstate));
		}
	}, [Tstate]);
	return <TestContext.Provider value={{ Tstate, Tdispatch }}>{props.children}</TestContext.Provider>;
};
