import React, { useEffect, useState, useContext, lazy } from "react";
import { Nav } from "../Components/Navigation/Nav";
import { MainContext } from "../Components/Context/MainContext";
import {
	makeStyles,
	withStyles,
	Card,
	Grid,
	CardHeader,
	Avatar,
	Typography,
	LinearProgress,
	TextField,
	Table,
	lighten,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import CourseAnalysis from "../Website/CourseDetails/CourseAnalysis";
const MyDrawer = lazy(() => import("../Components/Navigation/MyDrawer"));
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		padding: theme.spacing(2),
	},
	topCard: {
		width: "100%",
		padding: 20,
		backgroundRepeat: "repeat",
		backgroundImage: 'url("https://i.ibb.co/sq4v7RN/cloud-bg.png")',
	},
	section: {
		overflowX: "auto",
		maxWidth: "90vw",
	},
	emptyCard: {
		marginLeft: "auto",
		marginRight: "auto",
		borderRadius: "1px solid red",
		height: 210,
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundPosition: `50% 100%`,
		background: "url(https://res.cloudinary.com/qualifier/image/upload/v1586014502/Default/foam-cyan_gedffk.svg)",
	},
}));

export default function Report({ match }) {
	const classes = useStyles();
	const [category, setCategory] = useState(null);
	const [course, setCourse] = useState(null);
	const [subject, setSubject] = useState(null);
	const [allCategory, setAllCategory] = useState([]);
	const [allCourse, setAllCourse] = useState([]);
	const [allSubject, setAllSubject] = useState([]);
	const { state } = useContext(MainContext);

	useEffect(() => {
		getCategory();
		if (match.params.sublink) {
			setSubject({ link: match.params.sublink, subjectTitle: "" });
		} else if (match.params.corslink) {
			setCourse({ link: match.params.corslink, courseTitle: "" });
		}
	}, [match]);
	const getCategory = () => {
		axios
			.get(`/api/test/category/allcategory/`)
			.then((res) => setAllCategory(res.data))
			.catch((err) => console.log(err));
	};
	const getCourse = async (v) => {
		if (v) {
			await axios
				.get(`/api/test/course/cat/${v.link}`)
				.then((res) => setAllCourse(res.data))
				.catch((err) => console.log(err));
		}
	};

	const getSubject = (v) => {
		if (v) {
			axios
				.post(`/api/test/subject/cou/body`, { course: [v] })
				.then((res) => setAllSubject(res.data))
				.catch((err) => console.log(err));
		}
	};

	const todayDate = () => {
		var d = new Date(),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();
		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;
		return day + "-" + month + "-" + year;
	};

	return (
		<div className={classes.root}>
			<Nav />
			<MyDrawer />
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Card className={classes.topCard}>
					<CardHeader
						avatar={<Avatar alt="Remy Sharp" src={state.userImage} />}
						title={<Typography color="primary">{state.name}</Typography>}
						action={<Typography color="primary">My Report</Typography>}
						subheader={todayDate()}
					/>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={4}>
							<Autocomplete
								options={allCategory}
								getOptionLabel={(option) => option.categoryTitle}
								onChange={(e, v) => {
									setCategory(v);
									getCourse(v);
								}}
								value={category}
								renderInput={(params) => <TextField {...params} required label="Select Category" variant="outlined" fullWidth />}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Autocomplete
								options={allCourse}
								getOptionLabel={(option) => option.courseTitle}
								noOptionsText="Select A Category First"
								onChange={(e, v) => {
									setCourse(v);
									getSubject(v);
								}}
								value={course}
								renderInput={(params) => <TextField {...params} required label="Select Course" variant="outlined" fullWidth />}
							/>
						</Grid>
						<Grid item xs={12} sm={4}>
							<Autocomplete
								options={allSubject}
								getOptionLabel={(option) => option.subjectTitle}
								noOptionsText="Select Category & Course First"
								onChange={(e, v) => {
									setSubject(v);
								}}
								value={subject}
								renderInput={(params) => <TextField {...params} required label="Select Subject" variant="outlined" fullWidth />}
							/>
						</Grid>
					</Grid>
				</Card>
				<CourseAnalysis link={course ? `course/${course.link}` : ""} />
				<SectionBreakdown subLink={subject ? subject.link : null} courLink={course ? course.link : null} />
			</main>
		</div>
	);
}

export function SectionBreakdown(props) {
	const classes = useStyles();
	const [sectionData, setSectionData] = useState([]);
	const [loading, setLoading] = useState(false);
	useEffect(() => {
		document.title = "Report | Qualifier : See your Daily Report & improve your weak zone - Score All India Rank For FREE";

		setLoading(true);
		if (props.data) {
			setSectionData(props.data);
			setLoading(false);
		} else {
			if (props.subLink) {
				var link = `/api/report/analytics/section/subject/${props.subLink}`;
			} else if (props.courLink) {
				link = `/api/report/analytics/section/course/${props.courLink}`;
			}
			axios
				.get(link)
				.then((res) => {
					setSectionData(res.data);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		}
	}, [props]);

	if (loading) {
		return <LinearProgress style={{ marginTop: 30 }} />;
	}
	return (
		<div className={classes.section}>
			<br />
			<Typography gutterBottom variant="subtitle1" align="center" color="secondary">
				Section-Wise Breakdown
			</Typography>
			{sectionData.length === 0 ? (
				<div className={classes.emptyCard}>
					<Typography align="center" color="textSecondary">
						Select a Course or Subject for Section wise Summary
					</Typography>
				</div>
			) : (
				<Table className={classes.secTable} aria-label="Transaction-Data">
					<TableHead>
						<TableRow hover>
							<TableCell>
								<Typography align="center" color="primary" variant="body1">
									Secction Name
								</Typography>
							</TableCell>
							<TableCell>Attempted</TableCell>
							<TableCell>Correct</TableCell>
							<TableCell>Incorrect</TableCell>
							<TableCell>Accuracy</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{sectionData.map((d, i) => (
							<TableRow hover key={i}>
								<TableCell>
									<Typography align="center" color="primary" variant="body1">
										{d.section}
									</Typography>
								</TableCell>
								<TableCell>
									<LinearProgress
										variant="determinate"
										color="primary"
										value={Number((+d.attempt / +d.total) * 100)}
										style={{ height: 20, width: "60%" }}
									/>
									<Typography color="secondary" align="center" variant="button">
										{`${d.attempt} / ${d.total}`}
									</Typography>
								</TableCell>
								<TableCell>
									<CorrectLinearProgress variant="determinate" value={Number((+d.correct / +d.attempt) * 100)} />
									<Typography color="secondary" align="center" variant="button">
										{`${d.correct} / ${d.attempt}`}
									</Typography>
								</TableCell>
								<TableCell>
									<LinearProgress
										variant="determinate"
										color="secondary"
										value={Number((+d.incorrect / +d.attempt) * 100)}
										style={{ height: 20, width: "60%" }}
									/>
									<Typography color="secondary" align="center" variant="button">
										{`${d.incorrect} / ${d.attempt}`}
									</Typography>
								</TableCell>
								<TableCell>
									<AccuracyLinearProgress variant="determinate" value={+d.accuracy} />
									<Typography color="secondary" align="center" variant="button">
										{`${d.accuracy} %`}
									</Typography>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</div>
	);
}

const CorrectLinearProgress = withStyles({
	root: {
		height: 20,
		width: "60%",
		backgroundColor: lighten("#0a9e07", 0.5),
	},
	bar: {
		borderRadius: 5,
		backgroundColor: "#0a9e07",
	},
})(LinearProgress);

const AccuracyLinearProgress = withStyles({
	root: {
		height: 20,
		width: "60%",
		backgroundColor: lighten("#00cbff", 0.5),
	},
	bar: {
		borderRadius: 5,
		backgroundColor: "#00cbff",
	},
})(LinearProgress);
