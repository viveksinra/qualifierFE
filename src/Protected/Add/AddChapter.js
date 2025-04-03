import React, { Fragment, useState, useEffect, useRef } from "react";
import useStyles from "./useStyles";
import MySnackbar from "../../Components/MySnackbar";
import {
	Grid,
	Chip,
	Paper,
	TextField,
	Table,
	TableHead,
	TableRow,
	Tooltip,
	Fab,
	TableCell,
	TableBody,
	TableFooter,
	TablePagination,
	Input,
	Divider,
} from "@mui/material";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import { MdSearch, MdDoneAll, MdClearAll, MdPanorama, MdLockOpen, MdLock } from "react-icons/md";

export default function AddChapter() {
	const classes = useStyles();
	const [id, setId] = useState("");
	const [title, setTitle] = useState("");
	const [lock, setLock] = useState(false);
	const [category, setCategory] = useState(null);
	const [course, setCourse] = useState(null);
	const [subject, setSubject] = useState(null);
	const [link, setLink] = useState("");
	const [highlight, setHighlight] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const [allCategory, setAllCategory] = useState([]);
	const [allCourse, setAllCourse] = useState([]);
	const [allSubject, setAllSubject] = useState([]);
	const [allChapter, setAllChapter] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [err] = useState({ errIn: "", msg: "" });
	const snackRef = useRef();

	useEffect(() => {
		getData("");
		getCategory();
	}, []);
	const getData = async (word) => {
		await axios
			.get(`/api/test/chapter/allchapter/${word}`)
			.then((res) => setAllChapter(res.data))
			.catch((err) => console.log(err));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		let chapterData = { _id: id, subject, lock, chapterTitle: title, course, category, highlight, image, link, description };
		await axios
			.post(`/api/test/chapter/${id}`, chapterData)
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
		// setCategory(null);
		// setLock(false);
		// setCourse(null);
		// setSubject(null);
		// setLink("");
		setImage("");
		setHighlight("");
		setDescription("");
	};
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
	const setData = async (id) => {
		await axios
			.get(`/api/test/chapter/get/${id}`)
			.then((res) => {
				setId(res.data[0]._id);
				setTitle(res.data[0].chapterTitle);
				setLock(res.data[0].lock);
				setCategory(res.data[0].category[0]);
				setCourse(res.data[0].course[0]);
				setSubject(res.data[0].subject[0]);
				setLink(res.data[0].link);
				setImage(res.data[0].image);
				setHighlight(res.data[0].highlight);
				setDescription(res.data[0].description);
			})
			.catch((err) => console.log(err));
	};
	const imgUpload = async (e) => {
		if (e) {
			const selectedFile = e;
			const imgData = new FormData();
			imgData.append("photo", selectedFile, selectedFile.name);
			await axios
				.post(`/api/other/fileupload/upload`, imgData, {
					headers: {
						accept: "application/json",
						"Accept-Language": "en-US,en;q=0.8",
						"Content-Type": `multipart/form-data; boundary=${imgData._boundary}`,
					},
				})
				.then((res) => setImage(res.data.result.secure_url))
				.catch((err) => console.log(err));
		}
	};
	const handleErr = (errIn) => {
		switch (errIn) {
			case "title":
				// if(title.length  < 10){
				//     setErr({errIn:"mobileNo", msg:"Enter 10 Digits Mobile No."})
				// }else setErr({errIn:"", msg:""})
				break;
			default:
				break;
		}
	};
	return (
		<Fragment>
			<Grid container>
				<Grid item xs={12} md={9}>
					<Paper className={classes.entryArea}>
						<form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: "100vw" }}>
							<Grid container spacing={2}>
								<Grid item xs={4}></Grid>
								<Grid item xs={4}>
									<center>
										<Chip color="primary" label="Add Chapter" />
									</center>
								</Grid>
								<Grid item xs={4}>
									{lock ? (
										<Fab style={{ float: "right" }} size="small" onClick={() => setLock(false)} color="secondary" aria-label="Lock">
											<MdLock />
										</Fab>
									) : (
										<Fab style={{ float: "right" }} size="small" onClick={() => setLock(true)} color="secondary" aria-label="Lock">
											<MdLockOpen />
										</Fab>
									)}
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										required
										fullWidth
										inputProps={{ maxLength: "42" }}
										onBlur={() => handleErr("title")}
										error={err.errIn === "title" ? true : false}
										label={err.errIn === "title" ? err.msg : "Chapter Title"}
										placeholder="Name of the Chapter.."
										value={title}
										onChange={(e) => setTitle(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
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
								<Grid item xs={12}>
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
								<Grid item xs={12}>
									<Autocomplete
										options={allSubject}
										getOptionLabel={(option) => option.subjectTitle}
										onChange={(e, v) => setSubject(v)}
										value={subject}
										renderInput={(params) => <TextField {...params} required label="Select Subject" variant="outlined" fullWidth />}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										variant="outlined"
										fullWidth
										onBlur={() => handleErr("link")}
										error={err.errIn === "link" ? true : false}
										label={err.errIn === "link" ? err.msg : "Link / URL "}
										placeholder="/"
										value={link}
										onChange={(e) => setLink(e.target.value)}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										variant="outlined"
										fullWidth
										onBlur={() => handleErr("highlight")}
										inputProps={{ maxLength: "10" }}
										error={err.errIn === "highlight" ? true : false}
										label={err.errIn === "highlight" ? err.msg : "Highlight "}
										placeholder="New"
										value={highlight}
										onChange={(e) => setHighlight(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										type="file"
										InputLabelProps={{ shrink: true }}
										inputProps={{ accept: "image/*" }}
										fullWidth
										onBlur={() => handleErr("image")}
										error={err.errIn === "image" ? true : false}
										label={err.errIn === "image" ? err.msg : "Image "}
										onChange={(e) => imgUpload(e.target.files[0])}
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										variant="outlined"
										fullWidth
										onBlur={() => handleErr("description")}
										error={err.errIn === "description" ? true : false}
										label={err.errIn === "description" ? err.msg : "Description "}
										placeholder="few words..."
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Divider />
								</Grid>
								<Grid item xs={12}>
									<center>
										<Tooltip title={id === "" ? "Save" : "Update"}>
											<Fab color="primary" type="submit" className={classes.button}>
												<MdDoneAll />
											</Fab>
										</Tooltip>
										<Tooltip title="Clear All">
											<Fab size="small" color="secondary" onClick={() => handleClear()} className={classes.button}>
												<MdClearAll />
											</Fab>
										</Tooltip>
										{image !== "" && (
											<a href={image} target="_blank" rel="noopener noreferrer">
												<Tooltip title="Image">
													<Fab size="small" color="secondary" className={classes.button}>
														<MdPanorama />
													</Fab>
												</Tooltip>
											</a>
										)}
									</center>
								</Grid>
							</Grid>
						</form>
					</Paper>
				</Grid>
				<Grid item xs={12} md={3}>
					{/* Search Section */}
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<MdSearch />
						</div>
						<Input
							placeholder="Search Chapter..."
							onChange={(e) => getData(e.target.value)}
							disableUnderline
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
						/>
					</div>
					<div className={classes.searchResult}>
						<Paper>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell component="th" scope="row">
											Search Results
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{allChapter.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
										<TableRow key={data._id} onClick={() => setData(data._id)} hover>
											<TableCell component="td" scope="row">
												Name : {data.chapterTitle} <br />
											</TableCell>
										</TableRow>
									))}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TablePagination
											count={allChapter.length}
											rowsPerPage={rowsPerPage}
											page={page}
											onChangePage={(e, page) => setPage(page)}
											onChangeRowsPerPage={(r) => setRowsPerPage(r.target.value)}
										/>
									</TableRow>
								</TableFooter>
							</Table>
						</Paper>
					</div>
				</Grid>
			</Grid>
			<MySnackbar ref={snackRef} />
		</Fragment>
	);
}
