import React, { createContext, useReducer, useEffect } from "react";

export const QuesContext = createContext();

const preState = {
	id: "",
	title: "",
	category: null,
	course: [],
	subject: [],
	chapter: [],
	options: [
		{ number: 1, title: "" },
		{ number: 2, title: "" },
		{ number: 3, title: "" },
		{ number: 4, title: "" },
		{ number: 5, title: "" },
	],
	correctOption: "",
	level: "",
	maxTime: "",
	highlight: "",
	image: "",
	solImage: "",
	hint: "",
	solTitle: "",
	allCategory: [],
	allCourse: [],
	allSubject: [],
	allChapter: [],
	openSearchBox: false,
};

export const QuesProvider = (props) => {
	const [Qstate, Qdispatch] = useReducer(QuesReducer, preState);
	useEffect(() => {
		return () => {
			Qdispatch({ type: "HANDLECLEAR" });
		};
	}, []);
	return <QuesContext.Provider value={{ Qstate, Qdispatch }}>{props.children}</QuesContext.Provider>;
};

const QuesReducer = (state, action) => {
	switch (action.type) {
		case "SETQUES": {
			state.title = action.payload;
			return {
				...state,
			};
		}
		case "SETSOL": {
			state.solTitle = action.payload;
			return {
				...state,
			};
		}
		case "SETOPTION": {
			state.options = action.payload;
			return {
				...state,
			};
		}
		case "SETCORRECTOPT": {
			state.correctOption = action.payload;
			return {
				...state,
			};
		}
		case "SETLEVEL": {
			state.level = action.payload;
			return {
				...state,
			};
		}
		case "SETMAXTIME": {
			state.maxTime = action.payload;
			return {
				...state,
			};
		}
		case "SETHIGHLIGHT": {
			state.highlight = action.payload;
			return {
				...state,
			};
		}
		case "SETHINT": {
			state.hint = action.payload;
			return {
				...state,
			};
		}
		case "SETALLCATG": {
			state.allCategory = action.payload;
			return {
				...state,
			};
		}
		case "SETALLCOURSE": {
			state.allCourse = action.payload;
			return {
				...state,
			};
		}
		case "SETALLSUBJECT": {
			state.allSubject = action.payload;
			return {
				...state,
			};
		}
		case "SETALLCHAPTER": {
			state.allChapter = action.payload;
			return {
				...state,
			};
		}

		case "SETCATG": {
			state.category = action.payload;
			state.course = [];
			state.subject = [];
			state.chapter = [];
			return {
				...state,
			};
		}
		case "SETCOURSE": {
			state.course = action.payload;
			state.subject = [];
			state.chapter = [];
			return {
				...state,
			};
		}
		case "SETSUBJECT": {
			state.subject = action.payload;
			state.chapter = [];
			return {
				...state,
			};
		}
		case "SETCHAPTER": {
			state.chapter = action.payload;
			return {
				...state,
			};
		}
		case "SETIMG": {
			if (action.payload.img === "question") {
				state.image = action.payload.link;
			} else if (action.payload.img === "solution") {
				state.solImage = action.payload.link;
			}
			return {
				...state,
			};
		}

		case "TOGGLESEARCH": {
			state.openSearchBox = !state.openSearchBox;
			return {
				...state,
			};
		}
		case "SETQUESTION": {
			return {
				...state,
				...action.payload,
				openSearchBox: false,
			};
		}
		case "HANDLECLEAR": {
			state.id = "";
			state.title = "";
			state.category = null;
			state.course = [];
			state.subject = [];
			state.chapter = [];
			state.options = [
				{ number: 1, title: "" },
				{ number: 2, title: "" },
				{ number: 3, title: "" },
				{ number: 4, title: "" },
				{ number: 5, title: "" },
			];
			state.correctOption = "";
			state.level = "";
			state.maxTime = "";
			state.highlight = "";
			state.image = "";
			state.solImage = "";
			state.hint = "";
			state.solTitle = "";
			state.openSearchBox = false;
			return {
				...state,
			};
		}

		default:
			return state;
	}
};
