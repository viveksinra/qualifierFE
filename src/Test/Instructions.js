import React, { Fragment, useState, useEffect, useContext } from "react";
import { LOADTEST, LOADING } from "../Components/Context/types";
import { Typography, Checkbox, Paper, FormControlLabel, Badge } from "@mui/material";
import { styled } from '@mui/material/styles';
import { TestTopNav, IntroBNav, drawerWidth } from "./TestNav";
import { TestContext } from "../Components/Context/TestContext/TestContext";
import { MdCheck } from "react-icons/md";
import TestDrawer from "./TestDrawer";
import axios from "axios";
import { useParams } from "react-router-dom";

const PREFIX = 'Instructions';
const classes = {
	root: `${PREFIX}-root`,
	content: `${PREFIX}-content`,
	toolbar: `${PREFIX}-toolbar`,
	inst: `${PREFIX}-inst`,
	markLine: `${PREFIX}-markLine`,
	comm: `${PREFIX}-comm`,
	li: `${PREFIX}-li`
};

const StyledRoot = styled('div')(({ theme }) => ({
	[`&.${classes.root}`]: {
		flexGrow: 1,
		background: "#fff",
		minHeight: `calc(100vh - ${52}px)`,
	},
	[`& .${classes.content}`]: {
		flexGrow: 1,
		padding: theme.spacing(0, 2),
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth + 40}px)`,
			marginRight: drawerWidth + 40,
			minHeight: `calc(100vh - ${52}px)`,
		},
	},
	[`& .${classes.toolbar}`]: theme.mixins.toolbar,
	[`& .${classes.inst}`]: {
		fontFamily: "sans-serif",
		fontSize: 14,
		marginBottom: 52,
		"& > *": {
			margin: theme.spacing(),
		},
	},
	[`& .${classes.markLine}`]: {
		display: "flex",
		alignItems: "center",
		marginTop: 5,
	},
	[`& .${classes.comm}`]: {
		width: 25,
		height: 20,
		marginRight: 5,
	},
	[`& .${classes.li}`]: { margin: theme.spacing() },
}));

function Instructions() {
	const { testlink } = useParams();
	const [showGen, setInst] = useState(true);
	const [agree, setAgree] = useState(false);

	const { Tstate, Tdispatch } = useContext(TestContext);
	useEffect(() => {
		Tdispatch({ type: LOADING, payload: true });
		axios
			.get(`/api/bigtest/section/gettest/${testlink}`)
			.then((res) => {
				Tdispatch({ type: LOADTEST, payload: res.data });
				Tdispatch({ type: LOADING, payload: false });
			})
			.catch((err) => {
				console.log(err);
				alert("Something Went wrong, Please Refresh.");
			});
	}, [Tdispatch, testlink]);

	return (
		<StyledRoot className={classes.root}>
			<TestTopNav />
			<div className={classes.toolbar} />
			<main className={classes.content}>
				{showGen ? (
					<GeneralIntro classes={classes} />
				) : (
					<>
						<TestIntro classes={classes} />
						<br />
						<br />
						<Paper style={{ padding: 10 }} elevation={3}>
							<Typography variant="subtitle1"> Declaration : </Typography>
							<FormControlLabel
								control={<Checkbox checked={agree} onChange={() => setAgree(!agree)} name="agree" />}
								label="I have read all the instructions carefully and have understood them. I agree not to cheat or use unfair means in this examination. I understand that using unfair means of any sort for my own or someone else's advantage will lead to my immediate disqualification. The decision of Qualifier.co.in will be final in these matters and cannot be appealed."
							/>
						</Paper>
					</>
				)}

				<IntroBNav
					setInst={setInst}
					TseriesLink={Tstate && Tstate.TseriesLink}
					loading={Tstate.loading}
					testLink={Tstate && Tstate.testLink}
					showGen={showGen}
					agree={agree}
				/>
				<TestDrawer />
			</main>
		</StyledRoot>
	);
}

export default Instructions;

function GeneralIntro({ classes }) {
	return (
		<Fragment>
			<div className={classes.inst}>
				<Typography gutterBottom variant="h6" color="primary">
					General Instructions :-
				</Typography>
				<ol start="1">
					<li className={classes.li}>
						The clock will be set at the server. The countdown timer at the top right corner of screen will display the remaining time available for
						you to complete the examination. When the timer reaches zero, the examination will end by itself. You need not terminate the examination
						or submit your paper.
					</li>
					<li className={classes.li}>
						The clock will be set at the server. The countdown timer at the top right corner of screen will display the remaining time available for
						you to complete the examination. When the timer reaches zero, the examination will end by itself. You need not terminate the examination
						or submit your paper.
						<div className={classes.markLine}>
							<span className={classes.comm} style={{ border: "1px solid #333" }}></span>You have not visited the question yet.
						</div>
						<div className={classes.markLine}>
							<span
								className={classes.comm}
								style={{
									borderRadius: "0px 0px 20px 20px",
									backgroundColor: "#c0392b",
									borderColor: "#c0392b",
									color: "#f086ff",
								}}
							></span>
							You have not answered the question.
						</div>
						<div className={classes.markLine}>
							<span
								className={classes.comm}
								style={{
									borderRadius: "20px 20px 0px 0px",
									backgroundColor: "#27ae60",
									borderColor: "#27ae60",
								}}
							></span>
							You have answered the question.
						</div>
						<div className={classes.markLine}>
							<span
								className={classes.comm}
								style={{
									borderRadius: "24px",
									backgroundColor: "#9b59b6",
									borderColor: "#9b59b6",
								}}
							></span>
							You have NOT answered the question, but have marked the question for review.
						</div>
						<div className={classes.markLine}>
							<Badge badgeContent={<MdCheck style={{ color: "#27ae60", fontSize: "x-large" }} />}>
								<span
									className={classes.comm}
									style={{
										borderRadius: "24px",
										backgroundColor: "#9b59b6",
										borderColor: "#9b59b6",
									}}
								/>
							</Badge>
							You have answered the question, but marked it for review.
						</div>
					</li>
				</ol>
				The <b>Mark For Review</b> status for a question simply indicates that you would like to look at that question again. If a question is
				answered, but marked for review, then the answer will be considered for evaluation unless the status is modified by the candidate.
				<br />
				<Typography variant="h6" color="primary">
					Navigating to a Question :-
				</Typography>
				<ol start="3">
					<li className={classes.li}>
						To answer a question, do the following: <br />
						<ol>
							<li className={classes.li}>
								Click on the question number in the Question Palette at the right of your screen to go to that numbered question directly. Note that
								using this option does NOT save your answer to the current question
							</li>
							<li className={classes.li}>
								Click on <b>Save & Next</b> to save your answer for the current question and then go to the next question.
							</li>
							<li className={classes.li}>
								Click on <b>Mark for Review & Next</b> to save your answer for the current question and also mark it for review , and then go to the
								next question.
							</li>
						</ol>
					</li>
				</ol>
				Note that your answer for the current question will not be saved, if you navigate to another question directly by clicking on a question
				number without saving the answer to the previous question. <br />
				You can view all the questions by clicking on the <b>Question Paper</b>button.
				<span style={{ color: "#d92121" }}>
					This feature is provided, so that if you want you can just see the entire question paper at a glance.
				</span>
				<br />
				<Typography color="primary" variant="h6">
					Answering a Question :-
				</Typography>
				<ol start="4">
					<li className={classes.li}>
						Procedure for answering a multiple choice (MCQ) type question: <br />
						<ol>
							<li className={classes.li}>Procedure for answering a multiple choice (MCQ) type question:</li>
							<li className={classes.li}>
								To deselect your chosen answer, click on the bubble of the chosen option again or click on the <b>Clear Response</b> button
							</li>
							<li className={classes.li}>To change your chosen answer, click on the bubble of another option.</li>
							<li className={classes.li}>
								To save your answer, you MUST click on the <b>Save & Next</b>
							</li>
						</ol>
					</li>
					<li className={classes.li}>
						Procedure for answering a numerical answer type question : <br />
						<ol>
							<li className={classes.li}>To enter a number as your answer, use the virtual numerical keypad.</li>
							<li className={classes.li}>
								A fraction (e.g. -0.3 or -.3) can be entered as an answer with or without "0" before the decimal point.{" "}
								<span style={{ color: "#d92121" }}>As many as four decimal points, e.g. 12.5435 or 0.003 or -932.6711 or 12.82 can be entered.</span>
							</li>
							<li className={classes.li}>
								To clear your answer, click on the <b>Clear Response</b> button
							</li>
							<li className={classes.li}>
								To save your answer, you MUST click on the <b>Save & Next</b>
							</li>
						</ol>
					</li>
					<li className={classes.li}>
						To mark a question for review, click on the <b>Mark for Review & Next</b> button. If an answer is selected (for MCQ/MCAQ) entered (for
						numerical answer type) for a question that is <b>Marked for Review</b>, that answer will be considered in the evaluation unless the status
						is modified by the candidate.
					</li>
					<li className={classes.li}>
						To change your answer to a question that has already been answered, first select that question for answering and then follow the procedure
						for answering that type of question.
					</li>
					<li className={classes.li}>
						Note that ONLY Questions for which answers are <b>saved</b> or <b>marked for review after answering</b> will be considered for evaluation.
					</li>
					<li className={classes.li}>
						Sections in this question paper are displayed on the top bar of the screen. Questions in a Section can be viewed by clicking on the name
						of that Section. The Section you are currently viewing will be highlighted.
					</li>
					<li className={classes.li}>
						After clicking the <b>Save & Next</b> button for the last question in a Section, you will automatically be taken to the first question of
						the next Section in sequence.
					</li>
					<li className={classes.li}>You can move the mouse cursor over the name of a Section to view the answering status for that Section.</li>
				</ol>
			</div>
		</Fragment>
	);
}

export function TestIntro({ classes }) {
	const { Tstate } = useContext(TestContext);
	return (
		<div className={classes.inst}>
			<Typography gutterBottom variant="h6">
				Other Important Instructions :-
			</Typography>
			<Paper style={{ padding: 15, fontSize: 14 }} elevation={3}>
				{Tstate.sections &&
					Tstate.sections.map((s, i) => (
						<p key={i}>
							{`Section Name : ${s.title}`} <br />
							{`Correct Marks : +${s.marks.correct}`} <br />
							{`Incorrect Marks : -${s.marks.incorrect}`}
						</p>
					))}
				<br /> Total Time: {Tstate.totalTime} Minuts.
			</Paper>
			<br />
			<Typography variant="subtitle1" color="primary">
				Choose your default language:
			</Typography>
			<Typography variant="caption">
				Please note all questions will appear in your default language. This language can be changed for a particular question later on.
			</Typography>
			{/* Language Selection Logic Here */}
			<br />
		</div>
	);
}
