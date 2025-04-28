import React, { Fragment, useContext, useState, useEffect, useRef, lazy, Suspense, useCallback, memo } from "react";
import { QuesProvider, QuesContext } from "../../../Components/Context/AddQuesContext/QuestionContext";
import { Chip, Paper, Container, Stepper, Step, StepLabel, StepContent, Button, CircularProgress, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
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

// New component for the question list (replacement for popup)
function QuestionList() {
	const { Qstate, Qdispatch } = useContext(QuesContext);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [allQuestion, setAllQuestion] = useState([]);
	const [totalPages, setTotalPages] = useState(0);
	const [totalQuestions, setTotalQuestions] = useState(0);
	const [searchQuery, setSearchQuery] = useState("");
	const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const searchInputRef = useRef(null);
	
	// Debounce search query
	useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedSearchQuery(searchQuery);
		}, 500); // 500ms debounce delay
		
		return () => {
			clearTimeout(timerId);
		};
	}, [searchQuery]);
	
	// Keep focus on search input after rerenders
	const handleSearchChange = useCallback((e) => {
		setSearchQuery(e.target.value);
	}, []);
	
	// Maintain focus after data fetching completes
	useEffect(() => {
		// Focus only if it was focused before
		if (document.activeElement === searchInputRef.current) {
			const inputPosition = searchInputRef.current.selectionStart;
			setTimeout(() => {
				if (searchInputRef.current) {
					searchInputRef.current.focus();
					searchInputRef.current.setSelectionRange(inputPosition, inputPosition);
				}
			}, 0);
		}
	}, [allQuestion, isLoading]);
	
	const getData = useCallback(async (chapterLink, word) => {
		setIsLoading(true);
		let data = {
			catLink: Qstate.category?.link || "",
			courseLink: Qstate.course?.length > 0 ? Qstate.course[0].link : "",
			subjectLink: Qstate.subject?.length > 0 ? Qstate.subject[0].link : "",
			chapterLink: chapterLink || (Qstate.chapter?.length > 0 ? Qstate.chapter[0].link : ""),
			page: page,
			limit: limit,
			searchTerm: word || ""
		};
		
		await axios
			.post(`/api/test/question/getByFilter`, data)
			.then((res) => {
				setIsLoading(false);
				if (res.data.variant === "success") {
					setAllQuestion(res.data.questions);
					setTotalPages(res.data.totalPages);
					setTotalQuestions(res.data.totalQuestions);
					setErrorMessage("");
				} else {
					setAllQuestion([]);
					setErrorMessage(res.data.message || "Failed to fetch questions");
				}
			})
			.catch((err) => {
				setIsLoading(false);
				console.log(err);
				setAllQuestion([]);
				setErrorMessage("An error occurred while fetching questions");
			});
	}, [Qstate.category, Qstate.course, Qstate.subject, Qstate.chapter, page, limit]);
	
	useEffect(() => {
		const chapterLink = Qstate.chapter?.length > 0 ? Qstate.chapter[0].link : null;
		getData(chapterLink, debouncedSearchQuery);
	}, [Qstate.category, Qstate.course, Qstate.subject, Qstate.chapter, page, limit, debouncedSearchQuery, getData]);
	
	const setData = useCallback((id) => {
		setIsLoading(true);
		axios
			.get(`/api/test/question/get/${id}`)
			.then((res) => {
				Qdispatch({
					type: "SETQUESTION",
					payload: {
						id: res.data._id,
						title: res.data.questionTitle,
						category: res.data.category[0],
						course: res.data.course,
						subject: res.data.subject,
						chapter: res.data.chapter,
						options: res.data.options,
						correctOption: res.data.correctOption,
						level: res.data.level,
						maxTime: res.data.maxTime,
						highlight: res.data.highlight,
						image: res.data.image,
						solImage: res.data.solImage,
						hint: res.data.hint,
						solTitle: res.data.solTitle,
					},
				});
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setIsLoading(false);
			});
	}, [Qdispatch, setIsLoading]);
	
	const SearchContainer = styled('div')(({ theme }) => ({
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: theme.palette.common.white,
		'&:hover': {
			backgroundColor: theme.palette.grey[100],
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		marginBottom: theme.spacing(2),
	}));

	const SearchIconWrapper = styled('div')(({ theme }) => ({
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	}));

	const StyledInput = styled('input')(({ theme }) => ({
		color: 'inherit',
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		border: 'none',
		outline: 'none',
		backgroundColor: 'transparent',
	}));
	
	// Memoize question items to prevent unnecessary re-renders
	const QuestionItems = memo(({ questions }) => {
		return questions.map((data) => (
			<Paper 
				key={data._id} 
				elevation={1} 
				onClick={() => setData(data._id)} 
				sx={{ 
					p: 2, 
					mb: 1, 
					cursor: 'pointer',
					backgroundColor: Qstate.id === data._id ? '#e3f2fd' : 'inherit',
					borderLeft: Qstate.id === data._id ? '4px solid #1976d2' : 'none',
					'&:hover': { 
						backgroundColor: Qstate.id === data._id ? '#bbdefb' : '#f5f5f5' 
					} 
				}}
			>
				<div dangerouslySetInnerHTML={{ __html: data.questionTitle.slice(0, 200) }} />
			</Paper>
		));
	});
	
	return (
		<Paper elevation={3} sx={{ height: '100%', p: 2, overflow: 'auto' }}>
			<center>
				<Chip color="primary" label="Question List" style={{ marginTop: 5, marginBottom: 5 }} />
			</center>
			
			<SearchContainer>
				<SearchIconWrapper>
					<FcSearch />
				</SearchIconWrapper>
				<StyledInput
					ref={searchInputRef}
					placeholder="Search Question..."
					onChange={handleSearchChange}
					value={searchQuery}
					autoFocus
				/>
			</SearchContainer>
			
			{isLoading ? (
				<div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
					<CircularProgress />
				</div>
			) : allQuestion.length !== 0 ? (
				<div style={{ maxHeight: '80vh', overflow: 'auto' }}>
					<QuestionItems questions={allQuestion} />
					
					<Paper elevation={0} sx={{ display: 'flex', justifyContent: 'center' }}>
						<Button
							disabled={page === 1}
							onClick={() => setPage(prev => prev - 1)}
						>
							Previous
						</Button>
						<span style={{ margin: '0 10px', alignSelf: 'center' }}>
							Page {page} of {totalPages} ({totalQuestions} questions)
						</span>
						<Button
							disabled={page >= totalPages}
							onClick={() => setPage(prev => prev + 1)}
						>
							Next
						</Button>
					</Paper>
				</div>
			) : (
				<Paper sx={{ p: 2, textAlign: 'center' }}>
					{errorMessage || "No questions available. Select appropriate Chapter."}
				</Paper>
			)}
		</Paper>
	);
}

function Question() {
	const { Qstate, Qdispatch } = useContext(QuesContext);
	const [activeStep, setStep] = useState(0);
	const steps = getSteps();
	const snackRef = useRef();
	const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
	const [questionToDelete, setQuestionToDelete] = useState(null);
	
	useEffect(() => {
		axios
			.get(`/api/test/category/allcategory/`)
			.then((res) => Qdispatch({ type: "SETALLCATG", payload: res.data }))
			.catch((err) => console.log(err));
	}, [Qdispatch]);
	
	// Reset to first step when a question is selected for editing
	useEffect(() => {
		if (Qstate.id) {
			setStep(0);
		}
	}, [Qstate.id]);

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
	const handleDeleteClick = (id) => {
		setQuestionToDelete(id);
		setDeleteConfirmOpen(true);
	};
	
	const handleDeleteConfirm = () => {
		if (!questionToDelete) return;
		
		axios
			.delete(`/api/test/question/deletequestion/${questionToDelete}`)
			.then((res) => {
				snackRef.current.handleSnack(res.data);
				Qdispatch({ type: "HANDLECLEAR" });
				setStep(0);
				setDeleteConfirmOpen(false);
				setQuestionToDelete(null);
			})
			.catch((err) => {
				console.log(err);
				setDeleteConfirmOpen(false);
				setQuestionToDelete(null);
			});
	};
	
	const handleDeleteCancel = () => {
		setDeleteConfirmOpen(false);
		setQuestionToDelete(null);
	};

	return (
		<Fragment>
			<Container>
				<Grid container spacing={3}>
					<Grid size={{ xs: 12, md: 7 }}>
						<StyledPaper elevation={3}>
							<center>
								<Chip color="primary" label="Add Question" style={{ marginTop: 5, marginBottom: 5 }} />
								{Qstate.id && 
									<Chip 
										color="secondary" 
										label="Editing Question" 
										style={{ marginTop: 5, marginBottom: 5, marginLeft: 10 }} 
										onDelete={() => {
											Qdispatch({ type: "HANDLECLEAR" });
											setStep(0);
										}}
									/>
								}
							</center>
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
														<StyledButton color="secondary" onClick={() => handleDeleteClick(Qstate.id)}>
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
					</Grid>
					<Grid size={{ xs: 12, md: 5 }}>
						<QuestionList />
					</Grid>
				</Grid>
			</Container>
			
			{/* Delete Confirmation Dialog */}
			<Dialog
				open={deleteConfirmOpen}
				onClose={handleDeleteCancel}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you want to delete this question? This action cannot be undone.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleDeleteCancel} color="primary">
						Cancel
					</Button>
					<Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
						Delete
					</Button>
				</DialogActions>
			</Dialog>
			
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
