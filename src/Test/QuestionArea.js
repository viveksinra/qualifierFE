import React, { useContext, useState, useEffect, Fragment } from "react";
import { makeStyles, RadioGroup, Radio, FormControlLabel, Hidden } from "@material-ui/core";
import { SUBMITANS, TOGGLEDRAWER } from "../Components/Context/types";
import { QuestionNav } from "./TestNav";
import ReactHtmlParser from "react-html-parser";
import SubmitBox from "./SubmitBox";
import { TestContext } from "../Components/Context/TestContext/TestContext";
import { MdPlaylistPlay } from "react-icons/md";

const quesStyle = makeStyles((theme) => ({
	qArea: {
		background: "#fff",
		margin: theme.spacing(11, 2, 0),
		fontFamily: "sans-serif",
		display: "block",
		color: "#000",
		height: `calc(100vh - ${210}px)`,
	},
	options: {
		margin: theme.spacing(2),
	},
	img: {
		maxWidth: "100%",
		maxHeight: "100%",
		display: "block",
	},
	drawIcon: {
		bottom: 60,
		position: "fixed",
		cursor: "pointer",
		color: "blueviolet",
		fontSize: "larger",
	},
}));

function QuestionArea() {
	const classes = quesStyle();
	const { Tstate, Tdispatch } = useContext(TestContext);
	const [acQues, setQ] = useState(null);
	const [sec, setSec] = useState({});
	useEffect(() => {
		const sc = Tstate.sections.filter((f) => f.title === Tstate.activeSection);
		const que = sc.map((s) => s.questions[s.activeQuestion]);
		if (que) {
			setQ(...que);
			setSec(...sc);
		} else console.log("Some error is Question.");
	}, [Tstate.activeSection, Tstate.sections, sec.activeQuestion]);
	const handdleAns = (e) => {
		Tdispatch({ type: SUBMITANS, payload: { acSec: sec, acQues: acQues, ansGiven: e.target.value } });
	};

	return (
		<Fragment>
			<QuestionNav qNo={sec && sec.activeQuestion + 1} marks={acQues && acQues.marks} qId={acQues && acQues.questionId} />
			<div className={classes.qArea}>
				<br />
				{acQues && (
					<>
						{ReactHtmlParser(acQues.question)}
						{acQues.questionImg && <img src={acQues.questionImg} className={classes.img} alt="Question" />}
						<br />
						<div className={classes.options}>
							<RadioGroup aria-label="option" value={+acQues.ansGiven} onChange={handdleAns}>
								{acQues.options.map((o, i) => (
									<FormControlLabel key={i} value={+o.number} control={<Radio color="primary" />} label={ReactHtmlParser(o.title)} />
								))}
							</RadioGroup>
						</div>
					</>
				)}
				<Hidden smUp>
					<MdPlaylistPlay onClick={() => Tdispatch({ type: TOGGLEDRAWER })} className={classes.drawIcon} />
				</Hidden>
			</div>

			<SubmitBox />
		</Fragment>
	);
}

export default QuestionArea;
