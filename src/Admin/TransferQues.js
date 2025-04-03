import React, { Suspense, useState, useEffect } from "react";
import {
	Paper,
	Container,
	Grid,
	Button,
	Card,
	CardHeader,
	Checkbox,
	TextField,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	Autocomplete,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { FcCheckmark } from "react-icons/fc";
import parse from "html-react-parser";
import axios from "axios";

const StyledPaper = styled(Paper)(({ theme }) => ({
	width: "100%",
	marginTop: theme.spacing(),
	padding: theme.spacing(),
	background: "linear-gradient(to right, #dae2f8, #93EDC7)",
	borderRadius: theme.spacing(),
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
	padding: theme.spacing(1, 2),
}));

const StyledList = styled(List)(({ theme }) => ({
	width: 500,
	height: 500,
	backgroundColor: theme.palette.background.paper,
	overflow: "auto",
}));

const StyledButton = styled(Button)(({ theme }) => ({
	margin: theme.spacing(0.5, 0),
}));

function TransferQues() {
	const [checked, setChecked] = useState([]);
	const [category, setCategory] = useState({ from: null, to: null });
	const [course, setCourse] = useState({ from: null, to: null });
	const [subject, setSubject] = useState({ from: null, to: null });
	const [chapter, setChapter] = useState({ from: null, to: null });
	const [allCategory, setAllCategory] = useState([]);
	const [allCourse, setAllCourse] = useState({ from: [], to: [] });
	const [allSubject, setAllSubject] = useState({ from: [], to: [] });
	const [allChapter, setAllChapter] = useState({ from: [], to: [] });
	const [left, setLeft] = useState([]);
	const [right, setRight] = useState([]);

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const numberOfChecked = (items) => intersection(checked, items).length;

	const handleToggleAll = (items) => () => {
		if (numberOfChecked(items) === items.length) {
			setChecked(not(checked, items));
		} else {
			setChecked(union(checked, items));
		}
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
	};
	const submitQues = () => {
		if (chapter.to) {
			let data = { questions: right, category: category.to, course: course.to, subject: subject.to, chapter: chapter.to };
			axios
				.post("/api/test/transfer", data)
				.then((res) => alert(res.data.message))
				.catch((err) => console.log(err));
		} else alert("Something is Missing. Please complete all field.");
	};
	const customList = (title, items) => (
		<Card>
			<StyledCardHeader
				avatar={
					<Checkbox
						onClick={handleToggleAll(items)}
						checked={numberOfChecked(items) === items.length && items.length !== 0}
						indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
						disabled={items.length === 0}
						inputProps={{ "aria-label": "all items selected" }}
					/>
				}
				title={title}
				subheader={`${numberOfChecked(items)}/${items.length} selected`}
				action={
					title === "Chosen (To)" && (
						<Button
							size="small"
							disabled={right.length === 0}
							style={{ marginTop: 15 }}
							variant="outlined"
							onClick={submitQues}
							startIcon={<FcCheckmark />}
						>
							Add Question
						</Button>
					)
				}
			/>

			<Divider />
			<StyledList dense component="div" role="list">
				{items.map((value, i) => {
					const labelId = `transfer-list-all-item-${value}-label`;

					return (
						<ListItem key={i} role="listitem" button onClick={handleToggle(value)}>
							<ListItemIcon>
								<Checkbox checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple inputProps={{ "aria-labelledby": labelId }} />
							</ListItemIcon>
							{parse(value.questionTitle)}
						</ListItem>
					);
				})}
				<ListItem />
			</StyledList>
		</Card>
	);

	useEffect(() => {
		axios
			.get(`/api/test/category/allcategory/`)
			.then((res) => setAllCategory(res.data))
			.catch((err) => console.log(err));
	}, []);
	const getCourse = async (side, v) => {
		if (v) {
			await axios
				.get(`/api/test/course/cat/${v.link}`)
				.then((res) => {
					setAllCourse((old) => ({ ...old, [side]: res.data }));
				})
				.catch((err) => console.log(err));
		}
	};
	const getSubject = async (side, v) => {
		if (v) {
			await axios
				.post(`/api/test/subject/cou/body`, { course: [v] })
				.then((res) => setAllSubject((old) => ({ ...old, [side]: res.data })))
				.catch((err) => console.log(err));
		}
	};
	const getQuestions = async (v, side) => {
		if (v && side === "from") {
			await axios
				.get(`/api/test/question/cha/${v.link}`)
				.then((res) => setLeft(res.data))
				.catch((err) => console.log(err));
		}
	};
	const getChapter = async (side, v) => {
		if (v) {
			await axios
				.post(`/api/test/chapter/cou/body`, { subject: [v] })
				.then((res) => setAllChapter((old) => ({ ...old, [side]: res.data })))
				.then(() => getQuestions(chapter, side))
				.catch((err) => console.log(err));
		}
	};

	const Section = (side) => (
		<Grid container spacing={2}>
			<Grid item xs={12} md={6}>
				<Autocomplete
					options={allCategory}
					getOptionLabel={(option) => option.categoryTitle}
					onChange={(e, v) => {
						setCategory((old) => ({ ...old, [side]: v }));
						getCourse(side, v);
					}}
					value={category[side]}
					renderInput={(params) => <TextField {...params} required label={`Select Category ${side}`} variant="outlined" fullWidth />}
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<Autocomplete
					options={allCourse[side]}
					getOptionLabel={(option) => option.courseTitle}
					onChange={(e, v) => {
						setCourse((old) => ({ ...old, [side]: v }));
						getSubject(side, v);
					}}
					value={course[side]}
					renderInput={(params) => <TextField {...params} required label={`Select Course ${side}`} variant="outlined" fullWidth />}
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<Autocomplete
					options={allSubject[side]}
					getOptionLabel={(option) => option.subjectTitle}
					onChange={(e, v) => {
						setSubject((old) => ({ ...old, [side]: v }));
						getChapter(side, v);
					}}
					value={subject[side]}
					renderInput={(params) => <TextField {...params} required label={`Select Subject ${side}`} variant="outlined" fullWidth />}
				/>
			</Grid>
			<Grid item xs={12} md={6}>
				<Autocomplete
					options={allChapter[side]}
					getOptionLabel={(option) => option.chapterTitle}
					onChange={(e, v) => {
						setChapter((old) => ({ ...old, [side]: v }));
						getQuestions(v, side);
					}}
					value={chapter[side]}
					renderInput={(params) => <TextField {...params} required label={`Select Chapter ${side}`} variant="outlined" fullWidth />}
				/>
			</Grid>
		</Grid>
	);
	return (
		<Suspense fallback={null}>
			<Container>
				<StyledPaper elevation={3}>
					<Grid container spacing={2} justify="center" alignItems="center" style={{ margn: "auto" }}>
						<Grid item xs={12} sm={6}>
							{Section("from")}
						</Grid>
						<Grid item xs={12} sm={6}>
							{Section("to")}
						</Grid>
						<Grid item>{customList("Choices (From)", left)}</Grid>
						<Grid item>
							<Grid container direction="column" alignItems="center">
								<StyledButton
									variant="outlined"
									size="small"
									onClick={handleCheckedRight}
									disabled={leftChecked.length === 0}
									aria-label="move selected right"
								>
									&gt;
								</StyledButton>
								<StyledButton
									variant="outlined"
									size="small"
									onClick={handleCheckedLeft}
									disabled={rightChecked.length === 0}
									aria-label="move selected left"
								>
									&lt;
								</StyledButton>
							</Grid>
						</Grid>
						<Grid item>{customList("Chosen (To)", right)}</Grid>
					</Grid>
				</StyledPaper>
			</Container>
		</Suspense>
	);
}

function not(a, b) {
	return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
	return a.filter((value) => b.indexOf(value) !== -1);
}

function union(a, b) {
	return [...a, ...not(b, a)];
}

export default TransferQues;
