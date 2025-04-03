import React, { Fragment, useContext, useState, useEffect, useRef, lazy, Suspense } from "react";
import { QuesProvider, QuesContext } from "../../../Components/Context/AddQuesContext/QuestionContext";
import { Chip, Paper, Container, makeStyles, Stepper, Step, StepLabel, StepContent, Button, CircularProgress } from "@mui/material";
import Section2 from "./Section2";
import Section3 from "./Section3";
import QuesSearch from "./QuesSearch";
import axios from "axios";
import { FcSearch } from "react-icons/fc";
const Section1 = lazy(() => import("./Section1"));
const MySnackbar = lazy(() => import("../../../Components/MySnackbar"));

const queStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		marginTop: theme.spacing(),
		background: "linear-gradient(to right, #dae2f8, #93EDC7)",
		borderRadius: theme.spacing(),
	},
	actionsContainer: {
		marginBottom: theme.spacing(2),
	},
	button: {
		marginTop: theme.spacing(1),
		marginRight: theme.spacing(1),
	},
	search: {
		fontSize: 25,
		position: "absolute",
		float: "right",
		right: "12%",
		top: 15,
		cursor: "pointer",
	},
}));

function getSteps() {
	return ["Entitle Your Question", "Options & Hint", "Solution or Explanation"];
}

function getStepContent(step) {
	switch (step) {
		case 0:
			return <Section1 />;
		case 1:
			return <Section2 />;
		case 2:
			return <Section3 />;
		default:
			return "Unknown step";
	}
}
function Question() {
	const classes = queStyles();
	const { Qstate, Qdispatch } = useContext(QuesContext);
	const [activeStep, setStep] = useState(0);
	const steps = getSteps();
	const snackRef = useRef();
	useEffect(() => {
		axios
			.get(`/api/test/category/allcategory/`)
			.then((res) => Qdispatch({ type: "SETALLCATG", payload: res.data }))
			.catch((err) => console.log(err));
	}, [Qdispatch]);

	const handleNext = () => {
		if (activeStep === steps.length - 1) {
			// submit New Question
			let questionData = {
				_id: Qstate.id,
				subject: Qstate.subject,
				questionTitle: Qstate.title,
				course: Qstate.course,
				qType: "single",
				category: Qstate.category,
				chapter: Qstate.chapter,
				options: Qstate.options,
				correctOption: Qstate.correctOption,
				maxTime: Qstate.maxTime,
				level: Qstate.level,
				highlight: Qstate.highlight,
				image: Qstate.image,
				solImage: Qstate.solImage,
				solTitle: Qstate.solTitle,
				hint: Qstate.hint,
			};
			axios
				.post(`/api/test/question/${Qstate.id}`, questionData)
				.then((res) => {
					if (res.data.variant === "success") {
						snackRef.current.handleSnack(res.data);
						Qdispatch({ type: "HANDLECLEAR" });
						setStep(0);
					} else snackRef.current.handleSnack(res.data);
				})
				.catch((err) => console.log(err));
		} else {
			// Move Next Slide
			setStep((prevActiveStep) => prevActiveStep + 1);
		}
	};
	const handleBack = () => {
		setStep((prevActiveStep) => prevActiveStep - 1);
	};
	const handleDelete = (id) => {
		axios
			.delete(`/api/test/question/deletequestion/${id}`)
			.then((res) => {
				snackRef.current.handleSnack(res.data);
				Qdispatch({ type: "HANDLECLEAR" });
				setStep(0);
			})
			.catch((err) => console.log(err));
	};

	return (
		<Fragment>
			<Container>
				<Paper elevation={3} className={classes.root}>
					<center>
						<Chip color="primary" label="Add Question" style={{ marginTop: 5, marginBottom: 5 }} />
					</center>
					<FcSearch className={classes.search} onClick={() => Qdispatch({ type: "TOGGLESEARCH" })} />
					<Stepper activeStep={activeStep} orientation="vertical">
						{steps.map((label, index) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
								<StepContent>
									{getStepContent(index)}
									<div className={classes.actionsContainer}>
										<div>
											<Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
												Back
											</Button>
											<Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
												{activeStep === steps.length - 1 ? (Qstate.id ? "Update Question" : "Add Question") : "Next"}
											</Button>
											{Qstate.id && (
												<Button color="secondary" onClick={() => handleDelete(Qstate.id)} className={classes.button}>
													Delete
												</Button>
											)}
										</div>
									</div>
								</StepContent>
							</Step>
						))}
					</Stepper>
				</Paper>
			</Container>
			<QuesSearch />
			<MySnackbar ref={snackRef} />
		</Fragment>
	);
}

export default function AddQuestion() {
	return (
		<QuesProvider>
			<Suspense
				fallback={
					<div className="center" style={{ minHeight: 400 }}>
						<CircularProgress />
					</div>
				}
			>
				<Question />
			</Suspense>
		</QuesProvider>
	);
}
