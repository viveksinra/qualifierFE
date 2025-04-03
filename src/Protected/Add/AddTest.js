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
	FormControlLabel,
	Collapse,
	Switch,
	TableCell,
	TableBody,
	TableFooter,
	TablePagination,
	Input,
	MenuItem,
	Divider,
} from "@mui/material";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import { MdSearch, MdDoneAll, MdClearAll, MdPanorama } from "react-icons/md";

export default function AddTest() {
	const classes = useStyles();
	const [id, setId] = useState("");
	const [testName, setTestName] = useState("");
	const [testBundle, setTs] = useState(null);
	const [totalTime, setTotalTime] = useState("");
	const [testLink, setLink] = useState("");
	const [type, setType] = useState("");
	const [subType, setSubType] = useState("");
	const [isLock, setIsLock] = useState(false);
	const [isLive, setIsLive] = useState(false);
	const [sections, setSec] = useState([]);
	const [liveTimeStart, setLTS] = useState("");
	const [liveTimeEnd, setLTE] = useState("");
	const [highlight, setHighlight] = useState("");
	const [logo, setLogo] = useState("");
	const [description, setDescription] = useState("");
	const [allTest, setAllTest] = useState([]);
	const [allSec, setAllSec] = useState([]);
	const [allTseries, setAllTseries] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const snackRef = useRef();

	useEffect(() => {
		getData("");
		getTseries("");
	}, []);

	useEffect(() => {
		if (testBundle && subType) {
			axios
				.post("/api/bigtest/section/getin/test", { bundleLink: testBundle.link,  subType })
				.then((res) => setAllSec(res.data))
				.catch((err) => console.log(err));
		}
	}, [testBundle, subType]);

	const getData = async (word) => {
		await axios
			.get(`/api/bigtest/mocktest/allmocktest/${word}`)
			.then((res) => setAllTest(res.data))
			.catch((err) => console.log(err));
	};
	const getTseries = async () => {
		await axios
			.get("/api/bigtest/testbundle/alltestbundle/")
			.then((res) => setAllTseries(res.data))
			.catch((err) => console.log(err));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let TData = {
			_id: id,
			testName,
			testBundle,
			totalTime,
			highlight,
			type,
			subType,
			isLock,
			isLive,
			sections,
			liveTimeStart,
			liveTimeEnd,
			logo,
			testLink,
			description,
		};

		await axios
			.post(`/api/bigtest/mocktest/${id}`, TData)
			.then((res) => {
				snackRef.current.handleSnack(res.data);
				getData("");
				handleClear();
			})
			.catch((err) => console.log(err));
	};
	const handleClear = () => {
		setId("");
		// setTestName("");
		// setTs(null);
		// setTotalTime("");
		// setType("");
		setSubType("");
		setSec([]);
		setIsLive(false);
		setLTS("");
		setLTE("");
		// setLink("");
		// setIsLock(false);
		setLogo("");
		setHighlight("");
		setDescription("");
	};

	const setData = async (id) => {
		await axios
			.get(`/api/bigtest/mocktest/get/${id}`)
			.then((res) => {
				setId(res.data._id);
				setTestName(res.data.testName);
				setTs(res.data.testBundle);
				setTotalTime(res.data.totalTime);
				setLink(res.data.testLink);
				setType(res.data.type);
				setSubType(res.data.subType);
				setIsLive(res.data.isLive);
				setIsLock(res.data.isLock);
				setSec(res.data.sections);
				setLTS(res.data.liveTimeStart);
				setLTE(res.data.liveTimeEnd);
				setLogo(res.data.logo);
				setHighlight(res.data.highlight);
				setDescription(res.data.description);
				setSec(res.data.sections);
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
				.then((res) => setLogo(res.data.result.secure_url))
				.catch((err) => console.log(err));
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
										<Chip color="primary" label="Add Test" />
									</center>
								</Grid>
								<Grid item xs={4}>
									<FormControlLabel
										control={<Switch checked={isLock} onChange={() => setIsLock(!isLock)} name="Popular" color="primary" />}
										label="Lock"
									/>
									<FormControlLabel
										control={<Switch checked={isLive} onChange={() => setIsLive(!isLive)} name="Live" color="primary" />}
										label="Live Test"
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										variant="outlined"
										required
										fullWidth
										inputProps={{ maxLength: "45" }}
										label="Test Name"
										placeholder="Railways Group D - Test"
										value={testName}
										onChange={(e) => setTestName(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} sm={3}>
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
								<Grid item xs={12} sm={3}>
									<TextField
										variant="outlined"
										fullWidth
										required
										select
										label="Test Type"
										value={type}
										onChange={(e) => {
											setType(e.target.value);
										}}
									>
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
										type="number"
										inputProps={{ min: "10" }}
										label="Total Time (in Minutes)"
										value={totalTime}
										onChange={(e) => setTotalTime(e.target.value)}
									/>
								</Grid>

								<Grid item xs={6} sm={3}>
									<TextField
										variant="outlined"
										required
										fullWidth
										label="Link / URL"
										placeholder="/"
										value={testLink}
										onChange={(e) => setLink(e.target.value)}
									/>
								</Grid>
								<Grid item xs={6} sm={3}>
									<TextField
										variant="outlined"
										fullWidth
										inputProps={{ maxLength: "10" }}
										label="Highlight"
										placeholder="New"
										value={highlight}
										onChange={(e) => setHighlight(e.target.value)}
									/>
								</Grid>
								<Grid item xs={6} sm={3}>
									<TextField
										variant="outlined"
										fullWidth
										required
										select
										label="Test Sub Type"
										value={subType}
										onChange={(e) => {
											setSubType(e.target.value);
										}}
									>
										{allSubTypes.map((d) => (
											<MenuItem key={d} value={d}>
												{d}
											</MenuItem>
										))}
									</TextField>
								</Grid>
								<Grid item xs={12} sm={4}>
									<TextField
										variant="outlined"
										type="file"
										InputLabelProps={{ shrink: true }}
										inputProps={{ accept: "image/*" }}
										fullWidth
										label="Logo"
										onChange={(e) => imgUpload(e.target.files[0])}
									/>
								</Grid>

								<Grid item xs={12} sm={8}>
									<Collapse in={isLive}>
										<Grid container spacing={2}>
											<Grid item xs={6}>
												<TextField
													variant="outlined"
													type="datetime-local"
													fullWidth
													InputLabelProps={{ shrink: true }}
													value={liveTimeStart}
													label="Live Start Date & Time"
													onChange={(e) => setLTS(e.target.value)}
												/>
											</Grid>
											<Grid item xs={6}>
												<TextField
													variant="outlined"
													type="datetime-local"
													InputLabelProps={{ shrink: true }}
													fullWidth
													value={liveTimeEnd}
													label="Live END Date & Time"
													onChange={(e) => setLTE(e.target.value)}
												/>
											</Grid>
										</Grid>
									</Collapse>
								</Grid>

								<Grid item xs={12}>
									<TextField
										variant="outlined"
										fullWidth
										inputProps={{ maxLength: "60" }}
										label="Description"
										placeholder="few words..."
										value={description}
										onChange={(e) => setDescription(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Autocomplete
										options={allSec}
										multiple
										getOptionLabel={(o) => `${o.title} ~ ${o.description} ~ TQ:${o.totalQuestion} ~ TM:${o.totalMarks}`}
										onChange={(e, v) => {
											setSec(v);
										}}
										value={sections}
										renderInput={(params) => <TextField {...params} label="Select Sections" variant="outlined" fullWidth />}
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
										{logo !== "" && (
											<a href={logo} target="_blank" rel="noopener noreferrer">
												<Tooltip title="Logo">
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
							placeholder="Search Test Series"
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
									{allTest.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
										<TableRow key={data._id} onClick={() => setData(data._id)} hover>
											<TableCell component="td" scope="row">
												Name : {data.testName} <br />
											</TableCell>
										</TableRow>
									))}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TablePagination
											count={allTest.length}
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

export const allTypes = ["Full Test", "Subject Test", "Chapter Test", "Previous Paper"];
// export const allSubTypes = ["General Awareness", "Logical Reasoning","General Intelligence and Reasoning", "Quantitative Aptitude", "English Language", "C Programming"];
// export const allSubTypes = ["Science",  "Math",    "Social", "Chemistry", "Physics","Biology",  "History",  "Geography", "Not required"];
export const allSubTypes = ["General Ability", "Technical (ME)", "Technical (ECE)", "Technical (CIVIL)", "Technical (EE)", "Technical (CS)"];
