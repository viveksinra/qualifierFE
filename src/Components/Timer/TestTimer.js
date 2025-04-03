import React, { useState, useEffect, memo, useRef } from "react";
import "./style.css";
let leftS = -2;
function TestTimer({ m }) {
	const [sec, setSec] = useState("00");
	const [min, setM] = useState("00");
	const [hor, setH] = useState("00");
	let interval = useRef(null);

	useEffect(() => {
		let rh = Math.floor(m / 60);
		let rm = Math.round((m / 60 - rh) * 60);
		if (rh < 10) {
			setH(`0${rh}`);
		} else setH(rh);
		if (rm < 10) {
			setM(`0${rm}`);
		} else setM(rm);
		return () => (leftS = -2);
	}, [m]);

	useEffect(() => {
		interval.current = setInterval(() => {
			let Ts;
			if (leftS === -2) {
				Ts = m * 60;
				leftS = m * 60;
			} else Ts = leftS;
			setH(`0${Math.floor(Ts / 3600)}`);
			let mi = Math.floor((Ts % 3600) / 60);
			if (mi < 10) {
				setM(`0${mi}`);
			} else setM(mi);
			let sc = Math.floor((Ts % 3600) % 60);
			if (sc < 10) {
				setSec(`0${sc}`);
			} else setSec(sc);
			if (Ts === -1) {
				alert("Submit the Exam Now");
				clearInterval(interval.current);
			} else {
				leftS = Ts - 1;
			}
		}, 1000);
		return () => {
			clearInterval(interval.current);
		};
	}, [sec, m]);

	return (
		<div className="Ttimer">
			Time Left <span style={{ flexGrow: 0.5 }} /> <span className="Tflip">{hor}</span> <span className="dot">:</span>
			<span className="Tflip">{min}</span>
			<span className="dot">:</span>
			<span className="Tflip">{sec}</span>
		</div>
	);
}

export default memo(TestTimer);
