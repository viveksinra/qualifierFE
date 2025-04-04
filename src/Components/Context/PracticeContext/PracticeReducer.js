import { GETQUES, SUBMITANS, SHOWSOL, NEXTQUES, TIMETAKEN, PRESET } from "../types";
import right from "../../../img/right.mp3";
import wrong from "../../../img/wrong.mp3";
import axios from "axios";
const PracReducers = (state, action) => {
	let rightSound = new Audio(right);
	let wrondSound = new Audio(wrong);
	switch (action.type) {
		case GETQUES:
			state.match = action.payload.params;
			state.showSol = false;
			state.question = {
				_id: action.payload._id,
				questionTitle: action.payload.questionTitle,
				qType: action.payload.qType,
				image: action.payload.image,
				hint: action.payload.hint,
				solTitle: action.payload.solTitle,
				solImage: action.payload.solImage,
			};
			state.category = action.payload.category;
			state.chapter = action.payload.chapter;
			state.course = action.payload.course;
			state.subject = action.payload.subject;
			state.options = action.payload.options;
			state.correctOption = action.payload.correctOption;
			state.level = action.payload.level;
			state.maxTime = action.payload.maxTime;
			state.end = action.payload.end;
			state.loading = false;
			state.submitted = false;
			state.skip = false;
			return {
				...state,
			};

		case SUBMITANS: {
			state.submitted = true;
			if (+state.correctOption === +action.payload.ans) {
				rightSound.play();
				state.options[+action.payload.ind] = { ...state.options[+action.payload.ind], status: "r" };
				state.ansRight = true;
				state.optionClicked = +action.payload.ind;
			} else {
				wrondSound.play();
				state.options[+state.correctOption - 1] = { ...state.options[+state.correctOption - 1], status: "r" };
				state.options[+action.payload.ind] = { ...state.options[+action.payload.ind], status: "w" };
				state.ansRight = false;
				state.optionClicked = +action.payload.ind;
			}

			return {
				...state,
			};
		}
		case TIMETAKEN: {
			state.timeTaken = action.payload;
			var response = {
				questionId: state.question._id,
				timeTaken: state.timeTaken,
				maxTime: state.maxTime,
				categoryLink: state.category.link,
				chapterLink: state.chapter.link,
				courseLink: state.course.link,
				subjectLink: state.subject.link,
			};
			if (state.skip) {
				axios.post("/api/private/qskip", response).catch((err) => console.log(err));
			} else {
				if (state.ansRight) {
					// handle Submit
					response = { ...response, optionClicked: +state.optionClicked + 1, isCorrect: true };
				} else {
					response = { ...response, optionClicked: +state.optionClicked + 1, isCorrect: false };
				}
				axios.post("/api/private/qresponse", response).catch((err) => console.log(err));
			}

			return {
				...state,
			};
		}
		case SHOWSOL: {
			state.submitted = true;
			state.showSol = !state.showSol;
			return {
				...state,
			};
		}
		case NEXTQUES: {
			if (state.submitted === true && state.skip === false) {
				//next Ques
				state.loading = true;
			} else if (state.submitted === false) {
				// skip Ques
				state.skip = true;
				state.submitted = true;
				state.loading = true;
			}
			return {
				...state,
			};
		}
		case PRESET: {
			state.loading = true;
			return {
				...state,
			};
		}

		default:
			return state;
	}
};
export default PracReducers;
