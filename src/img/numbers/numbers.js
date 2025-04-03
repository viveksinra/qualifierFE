import React from "react";

import one from "./one.svg";
import two from "./two.svg";
import three from "./three.svg";
import four from "./four.svg";
import five from "./five.svg";
import correct from "./correct.svg";
import wrong from "./wrong.svg";
export function OptionNo({ index }) {
	switch (index) {
		case 0:
			return <img src={one} alt="One" />;
		case 1:
			return <img src={two} alt="two" />;
		case 2:
			return <img src={three} alt="three" />;
		case 3:
			return <img src={four} alt="four" />;
		case 4:
			return <img src={five} alt="five" />;
		default:
			break;
	}
}

export function AnsIcon({ ans }) {
	if (ans === "right") {
		return <img src={correct} alt="Correct" />;
	} else if (ans === "wrong") {
		return <img src={wrong} alt="Wrong" />;
	}
}
