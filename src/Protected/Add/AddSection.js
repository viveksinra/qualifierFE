import React, { Fragment, useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import MySnackbar from "../../Components/MySnackbar";
import {
	Grid,
	Chip,
	Paper,
	TextField,
	Table,
	TableHead,
	TableRow,
	Button,
	TableCell,
	TableBody,
	TableFooter,
	MenuItem,
	TablePagination,
	Divider,
	Autocomplete,
	Box
} from "@mui/material";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { allTypes, allSubTypes } from "./AddTest";
import parse from "html-react-parser";
import axios from "axios";
import { MdDoneAll, MdClearAll, MdDelete } from "react-icons/md";

// Styled components to replace useStyles
const EntryAreaPaper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
	margin: theme.spacing(1),
	backgroundColor: theme.palette.background.paper
}));

const StyledButton = styled(Button)(({ theme }) => ({
	margin: theme.spacing(1)
}));

const SearchResultDiv = styled('div')(({ theme }) => ({
	maxHeight: '80vh',
	overflow: 'auto',
	margin: theme.spacing(1)
}));

export default function AddSection() {
	const [id, setId] = useState("");
	const [title, setTitle] = useState("");
	const [testBundle, setTs] = useState(null);
	const [description, setDesc] = useState("");
	// const [allsec, setAllSec] = useState([]);

	const [category, setCategory] = useState(null);
	const [course, setCourse] = useState(null);
	const [subject, setSubject] = useState(null);
	const [chapter, setChapter] = useState(null);
	const [questions, pushQList] = useState([]);
	const [type, setType] = useState("");
	const [subType, setSubType] = useState("");
	const [allCategory, setAllCategory] = useState([]);
	const [allCourse, setAllCourse] = useState([]);
	const [allSubject, setAllSubject] = useState([]);
	const [allChapter, setAllChapter] = useState([]);
	const [secTime, setMin] = useState("");
	const [marks, setMarks] = useState({ correct: "", incorrect: "" });
	const [allQuestion, setAllQuestion] = useState([{ questionTitle: "Please Select All Options" }]);
	const [allTseries, setAllTseries] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const snackRef = useRef();

	useEffect(() => {
		getData("");
		getTseries("");
		getCategory();
	}, []);

	//this useEffect is made by vivek similar to below getData
	useEffect(() => {
		if (chapter && testBundle) {
			console.log(`/api/test/question/forsec/${chapter.link}/${testBundle.link}`)
			 axios
			.get(`/api/test/question/forsec/${chapter.link}/${testBundle.link}`)
			.then((res) => {
				console.log(res.data)
				res.data.length === 0
					? setAllQuestion([{ questionTitle: "Sorry, There is no Question available in the selected Chapter." }])
					: setAllQuestion(res.data);
			})
			.catch((err) => console.log(err));
		}
	}, [chapter, testBundle]);

	const getData = async (v,k, word) => {
		if (v && k) {

			await axios
				.get(`/api/test/question/forsec/${v.link}/${word}`)
				.then((res) => {
					res.data.length === 0
						? setAllQuestion([{ questionTitle: "Sorry, There is no Question available in the selected Chapter." }])
						: setAllQuestion(res.data);
				})
				.catch((err) => console.log(err));
		}
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
	const getChapter = (v) => {
		if (v) {
			axios
				.post(`/api/test/chapter/cou/body`, { subject: [v] })
				.then((res) => setAllChapter(res.data))
				.then(() => getData(chapter,testBundle, ""))
				.catch((err) => console.log(err));
		}
	};
	const getTseries = async () => {
		await axios
			.get("/api/bigtest/testbundle/alltestbundle/")
			.then((res) => setAllTseries(res.data))
			.catch((err) => console.log(err));
	};
	const getCategory = () => {
		axios
			.get(`/api/test/category/allcategory/`)
			.then((res) => setAllCategory(res.data))
			.catch((err) => console.log(err));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let secD = { _id: id, title, secTime, type, subType, testBundle, description, questions };
		await axios
			.post(`/api/bigtest/section/${id}`, secD)
			.then((res) => {
				snackRef.current.handleSnack(res.data);
				getData("");
				handleClear();
			})
			.catch((err) => console.log(err));
	};
	const handleClear = () => {
		setId("");
		// setTitle("");
		// setTs(null);
		// setDesc("");
		// setType("");
		// setSubType("");
		pushQList([]);
		// setCategory(null);
		// setCourse(null);
		setSubject(null);
		setChapter(null);
		// setMin("");
		// setMarks({ correct: "", incorrect: "" });
		setAllQuestion([{ questionTitle: "Please Select All Options" }]);
	};

	const setData = async (id) => {
		await axios
			.get(`/api/bigtest/section/get/${id}`)
			.then((res) => {
				setId(res.data._id);
			})
			.catch((err) => console.log(err));
	};
	const handleAdd = (q, i, d) => {
		if (d === "a") {
			if (marks.correct !== "" && marks.incorrect !== "") {
				pushQList([{ ...q, marks }, ...questions]);
				snackRef.current.handleSnack({ message: "Question Added", variant: "success" });
			} else snackRef.current.handleSnack({ message: "Please Write Correct & Incorrecct Marks.", variant: "error" });
		} else if (d === "r") {
			const found = questions.find((f) => f._id === q._id);
			const ind = questions.indexOf(found);
			if (ind > -1) {
				questions.splice(ind, 1);
			}
			snackRef.current.handleSnack({ message: "Question Removed", variant: "info" });
		}
	};
	return (
		<Fragment>
			<Grid container>
				<Grid item size={{xs: 12,  md: 9 }} >
					<EntryAreaPaper>
						<form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: "100vw" }}>
							<Grid container spacing={2}>
								<Grid item xs={4}></Grid>
								<Grid item xs={4}>
									<center>
										<Chip color="primary" label="Add Test Section" />
									</center>
								</Grid>
								<Grid item xs={4} />

								<Grid item xs={6} sm={3}>
									<TextField
										variant="outlined"
										required
										fullWidth
										inputProps={{ maxLength: "25" }}
										label="Section Name"
										placeholder="Like = Physics"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
									/>
								</Grid>
								<Grid item xs={6} sm={3}>
									<Autocomplete
										options={allTseries}
										getOptionLabel={(option) => option.title}
										onChange={(e, v) => {
											setTs(v);
										}}
										value={testBundle}
										renderInput={(params) => <TextField {...params} label="Select Test Series" variant="outlined" fullWidth />}
									/>
								</Grid>
								<Grid item xs={6} sm={3}>
									<TextField
										variant="outlined"
										required
										fullWidth
										label="Description"
										placeholder="Short Notes"
										value={description}
										onChange={(e) => setDesc(e.target.value)}
									/>
								</Grid>
								<Grid item xs={6} sm={3}>
									<TextField
										variant="outlined"
										type="number"
										fullWidth
										inputProps={{ min: "1" }}
										label=" Section Maximum Time in (Min)"
										placeholder="Total Time in Minutes "
										value={secTime}
										onChange={(e) => setMin(e.target.value)}
									/>
								</Grid>
								<Grid item xs={6} sm={3}>
									<TextField variant="outlined" fullWidth required select label="Section Type" value={type} onChange={(e) => setType(e.target.value)}>
										{allTypes.map((d) => (
											<MenuItem key={d} value={d}>
												{d}
											</MenuItem>
										))}
									</TextField>
								</Grid>
								<Grid item xs={6} sm={3}>
									<TextField
										variant="outlined"
										fullWidth
										required
										select
										label="Section Sub Type"
										value={subType}
										onChange={(e) => setSubType(e.target.value)}
									>
										{allSubTypes.map((d) => (
											<MenuItem key={d} value={d}>
												{d}
											</MenuItem>
										))}
									</TextField>
								</Grid>
								<Grid item xs={6} sm={3}>
									<TextField
										variant="outlined"
										required
										type="number"
										fullWidth
										inputProps={{ min: "1" }}
										label="Positive Marks / Question"
										placeholder="Positive"
										value={marks.correct}
										onChange={(e) => setMarks({ ...marks, correct: e.target.value })}
									/>
								</Grid>
								<Grid item xs={6} sm={3}>
									<TextField
										variant="outlined"
										required
										fullWidth
										type="number"
										// inputProps={{ min: "0" }}
										label="Negative Marks / Question"
										placeholder="(Don't Write -1) Just Write 1 "
										value={marks.incorrect}
										onChange={(e) => setMarks({ ...marks, incorrect: e.target.value })}
									/>
								</Grid>
								<Grid item size={{xs: 12,  md: 6, lg:3 }} >>
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
								<Grid item size={{xs: 12,  md: 6, lg:3 }} >>
									<Autocomplete
										options={allCourse}
										getOptionLabel={(option) => option.courseTitle}
										onChange={(e, v) => {
											setCourse(v);
											getSubject(v);
										}}
										value={course}
										renderInput={(params) => <TextField {...params} required label="Select Course" variant="outlined" fullWidth />}
									/>
								</Grid>
								<Grid item size={{xs: 12,  md: 6, lg:3 }} >>
									<Autocomplete
										options={allSubject}
										getOptionLabel={(option) => option.subjectTitle}
										onChange={(e, v) => {
											setSubject(v);
											getChapter(v);
										}}
										value={subject}
										renderInput={(params) => <TextField {...params} required label="Select Subject" variant="outlined" fullWidth />}
									/>
								</Grid>
								<Grid item size={{xs: 12,  md: 6, lg:3 }} >>
									<Autocomplete
										options={allChapter}
										getOptionLabel={(option) => option.chapterTitle}
										onChange={(e, v) => {
											setChapter(v);
											getData(v, "");
										}}
										value={chapter}
										renderInput={(params) => <TextField {...params} required label="Select Chapter" variant="outlined" fullWidth />}
									/>
								</Grid>

								<Grid item size={{xs: 12}} >
									<Divider />
								</Grid>
								<Grid item size={{xs: 12}} >
									<Carousel showThumbs={false} useKeyboardArrows={true}>
										{allQuestion.map((q, i) => (
											<Paper key={i} elevation={2}>
												{parse(q.questionTitle)}
												{q.options && (
													<>
														<span>
															<b>Level ~ {q.level}</b>
														</span>
														<ol>
															{q.options.map((o, j) => (
																<li key={j}>{parse(o.title)}</li>
															))}
														</ol>
														<center>
															{questions.filter((f) => f._id === q._id).length === 0 ? (
																<StyledButton
																	size="small"
																	variant="contained"
																	startIcon={<MdDoneAll />}
																	onClick={() => handleAdd(q, i, "a")}
																	color="primary"
																>
																	Add IT
																</StyledButton>
															) : (
																<StyledButton
																	size="small"
																	variant="contained"
																	startIcon={<MdDelete />}
																	onClick={() => handleAdd(q, i, "r")}
																	color="secondary"
																>
																	Remove it
																</StyledButton>
															)}
														</center>
													</>
												)}
											</Paper>
										))}
									</Carousel>
								</Grid>
								<Grid item size={{xs: 12}} >
									<Divider />
									<center>
										<StyledButton size="small" variant="contained" startIcon={<MdDoneAll />} type="submit" color="secondary">
											{id ? "Update Section" : "Create New Section"}
										</StyledButton>
										<StyledButton
											size="small"
											startIcon={<MdClearAll />}
											variant="outlined"
											onClick={() => handleClear()}
											color="secondary"
										>
											Clear All
										</StyledButton>
									</center>
								</Grid>
							</Grid>
						</form>
					</EntryAreaPaper>
				</Grid>
				<Grid item size={{xs: 12, md:3 }} >
					<SearchResultDiv>
						<Paper>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell component="th" scope="row">
											Selected Question List
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{questions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
										<TableRow key={data._id} onClick={() => setData(data._id)} hover>
											<TableCell component="td" scope="row">
												{parse(data.questionTitle.slice(0, 100))}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TablePagination
											count={questions.length}
											rowsPerPage={rowsPerPage}
											page={page}
											onPageChange={(e, page) => setPage(page)}
											onRowsPerPageChange={(r) => setRowsPerPage(r.target.value)}
										/>
									</TableRow>
								</TableFooter>
							</Table>
						</Paper>
					</SearchResultDiv>
				</Grid>
			</Grid>
			<MySnackbar ref={snackRef} />
		</Fragment>
	);
}
