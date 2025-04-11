import React, { Fragment, useContext, useState, useEffect, useRef, lazy, Suspense } from "react";
import { QuesProvider, QuesContext } from "../../../Components/Context/AddQuesContext/QuestionContext";
import { Chip, Paper, Container, Stepper, Step, StepLabel, StepContent, Button, CircularProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
import Section2 from "./Section2";
import Section3 from "./Section3";
import QuesSearch from "./QuesSearch";
import axios from "axios";
import { FcSearch } from "react-icons/fc";
const Section1 = lazy(() => import("./Section1"));
const MySnackbar = lazy(() => import("../../../Components/MySnackbar"));

const StyledPaper = styled(Paper)(({ theme }) => ({
	width: "100%",
	marginTop: theme.spacing(),
	background: "linear-gradient(to right, #dae2f8, #93EDC7)",
	borderRadius: theme.spacing(),
}));

const ActionsContainer = styled('div')(({ theme }) => ({
	marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
	marginTop: theme.spacing(1),
	marginRight: theme.spacing(1),
}));

const StyledFcSearch = styled(FcSearch)(({ theme }) => ({
	fontSize: 25,
	position: "absolute",
	float: "right",
	right: "12%",
	top: 200,
	cursor: "pointer",
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
				<StyledPaper elevation={3}>
					<center>
						<Chip color="primary" label="Add Question" style={{ marginTop: 5, marginBottom: 5 }} />
					</center>
					<StyledFcSearch onClick={() => Qdispatch({ type: "TOGGLESEARCH" })} />
					<Stepper activeStep={activeStep} orientation="vertical">
						{steps.map((label, index) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
								<StepContent>
									{getStepContent(index)}
									<ActionsContainer>
										<div>
											<StyledButton disabled={activeStep === 0} onClick={handleBack}>
												Back
											</StyledButton>
											<StyledButton variant="contained" color="primary" onClick={handleNext}>
												{activeStep === steps.length - 1 ? (Qstate.id ? "Update Question" : "Add Question") : "Next"}
											</StyledButton>
											{Qstate.id && (
												<StyledButton color="secondary" onClick={() => handleDelete(Qstate.id)}>
													Delete
												</StyledButton>
											)}
										</div>
									</ActionsContainer>
								</StepContent>
							</Step>
						))}
					</Stepper>
				</StyledPaper>
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
