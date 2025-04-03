import React, { useState, useEffect, memo } from "react";

import "./style.css";

function Timer({ s }) {
	const [sec, setSec] = useState(s);
	const [m, setM] = useState("00");
	useEffect(() => {
		let minutes = Math.floor(+s / 60);
		let second = +s - minutes * 60;
		if (second < 10) {
			setSec(`0${second}`);
		} else setSec(second);
		if (minutes < 10) {
			setM(`0${minutes}`);
		} else setM(minutes);
	}, [s]);
	return (
		<div className="timer">
			<div className="flip">{m}</div> <span id="pd">:</span> <div className="flip">{sec}</div>
		</div>
	);
}
export default memo(Timer);
