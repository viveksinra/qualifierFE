import {
	TESTRESET,
	TESTDRAWER,
	SETSECTION,
	SUBMITANS,
	SETQUES,
	MARKED,
	SAVENEXT,
	CLEARANS,
	LOADTEST,
	SUBMITBOX,
	TOGGLEDRAWER,
	LOADING,
} from "../types";

const TestReducers = (state, action) => {
	let secInd = state.sections.findIndex((x) => x.title === state.activeSection);
	let qInd = state.sections[secInd].activeQuestion;
	let acSec = state.sections[secInd];
	let acQues = state.sections[secInd].questions[qInd];
	switch (action.type) {
		case TESTRESET:
			return { ...action.payload };

		case SETSECTION:
			return { ...state, activeSection: action.payload };
		case SUBMITANS:
			acQues.ansGiven = action.payload.ansGiven;
			return {
				...state,
			};
		case SETQUES:
			if (acQues.ansGiven) {
				acQues.status = "A";
			} else acQues.status = "NA";
			acSec.activeQuestion = action.payload.i;
			state.testDrawer = false;
			return {
				...state,
			};
		case SAVENEXT: {
			if (acQues.ansGiven) {
				acQues.status = "A";
			} else acQues.status = "NA";
			if (+acSec.activeQuestion + 1 < +acSec.questions.length) {
				acSec.activeQuestion++;
			}
			return {
				...state,
			};
		}
		case MARKED:
			if (acQues.ansGiven) {
				acQues.status = "MA";
			} else acQues.status = "M";
			if (+acSec.activeQuestion + 1 < +acSec.questions.length) {
				acSec.activeQuestion++;
			}
			return {
				...state,
			};
		case CLEARANS: {
			acQues.status = "NA";
			acQues.ansGiven = null;
			return {
				...state,
			};
		}
		case TESTDRAWER:
			return {
				...state,
				testDrawer: !state.testDrawer,
			};
		case LOADING: {
			state.loading = action.payload;
			return {
				...state,
			};
		}
		case LOADTEST: {
			state = action.payload;
			return {
				...state,
			};
		}
		case SUBMITBOX: {
			state.submitBox = !state.submitBox;
			state.testDrawer = false;
			return {
				...state,
			};
		}
		case TOGGLEDRAWER: {
			state.testDrawer = !state.testDrawer;
			return {
				...state,
			};
		}
		default:
			return state;
	}
};
export default TestReducers;
