import React, { useRef, useContext, useEffect, useState } from "react";
import { LinearProgress, Grid } from "@material-ui/core";
import Timer from "../../Components/Timer/Timer";
import { PracContext } from "../../Components/Context/PracticeContext/PracticeContext";
import { TIMETAKEN } from "../../Components/Context/types";

const TimeSlider = ({ maxTime }) => {
	const interval = useRef(null);
	const [time, setTime] = useState(0); //time in 0.1 sec
	const { Pstate, Pdispatch } = useContext(PracContext);

	// const startTimeSlider = useCallback(() => {
	// 	setTime(0);
	// 	if (interval.current) {
	// 		clearInterval(interval.current);
	// 	}
	// 	if (Pstate.loading === false) {
	// 		interval.current = setInterval(() => {
	// 			if (time < +Pstate.maxTime * 6) {
	// 				setTime((time) => +time + 0.1);
	// 			} else {
	// 				alert("No more Time can be alloted");
	// 				clearInterval(interval.current);
	// 			}
	// 		}, 100);
	// 	}
	// }, [Pstate.maxTime, Pstate.loading]);

	useEffect(() => {
		if (Pstate.loading === false) {
			interval.current = setInterval(() => {
				setTime((time) => +time + 0.1);
			}, 100);
		}
		return () => {
			if (interval.current) {
				clearInterval(interval.current);
			}
		};
	}, [Pstate.loading, time]);

	useEffect(() => {
		return () => {
			if (Pstate.submitted) {
				Pdispatch({ type: TIMETAKEN, payload: time.toFixed(0) });
			}
		};
	}, [Pstate.submitted, Pdispatch, time]);

	return (
		<Grid container alignItems="center">
			<Timer s={time.toFixed(0)} />
			<LinearProgress variant="determinate" style={{ flexGrow: 5 }} color="primary" value={(100 * (maxTime - time)) / maxTime} />
		</Grid>
	);
};

export default TimeSlider;
