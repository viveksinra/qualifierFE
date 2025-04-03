import React, { useContext, useState, useEffect, Fragment } from "react";
import { RadioGroup, Radio, FormControlLabel, useMediaQuery } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import { SUBMITANS, TOGGLEDRAWER } from "../Components/Context/types";
import { QuestionNav } from "./TestNav";
import parse from "html-react-parser";
import SubmitBox from "./SubmitBox";
import { TestContext } from "../Components/Context/TestContext/TestContext";
import { MdPlaylistPlay } from "react-icons/md";

const PREFIX = 'QuestionArea';
const classes = {
	qArea: `${PREFIX}-qArea`,
	options: `${PREFIX}-options`,
	img: `${PREFIX}-img`,
	drawIcon: `${PREFIX}-drawIcon`
};

const StyledFragment = styled(Fragment)(({ theme }) => ({
	[`& .${classes.qArea}`]: {
		background: "#fff",
		margin: theme.spacing(11, 2, 0),
		fontFamily: "sans-serif",
		display: "block",
		color: "#000",
		height: `calc(100vh - ${210}px)`,
	},
	[`& .${classes.options}`]: {
		margin: theme.spacing(2),
	},
	[`& .${classes.img}`]: {
		maxWidth: "100%",
		maxHeight: "100%",
		display: "block",
	},
	[`& .${classes.drawIcon}`]: {
		bottom: 60,
		position: "fixed",
		cursor: "pointer",
		color: "blueviolet",
		fontSize: "larger",
	},
}));

function QuestionArea() {
	const { Tstate, Tdispatch } = useContext(TestContext);
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
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
		<StyledFragment>
			<QuestionNav qNo={sec && sec.activeQuestion + 1} marks={acQues && acQues.marks} qId={acQues && acQues.questionId} />
			<div className={classes.qArea}>
				<br />
				{acQues && (
					<>
						{parse(acQues.question)}
						{acQues.questionImg && <img src={acQues.questionImg} className={classes.img} alt="Question" />}
						<br />
						<div className={classes.options}>
							<RadioGroup aria-label="option" value={+acQues.ansGiven} onChange={handdleAns}>
								{acQues.options.map((o, i) => (
									<FormControlLabel key={i} value={+o.number} control={<Radio color="primary" />} label={parse(o.title)} />
								))}
							</RadioGroup>
						</div>
					</>
				)}
				{isMobile && (
					<MdPlaylistPlay onClick={() => Tdispatch({ type: TOGGLEDRAWER })} className={classes.drawIcon} />
				)}
			</div>

			<SubmitBox />
		</StyledFragment>
	);
}

export default QuestionArea;
