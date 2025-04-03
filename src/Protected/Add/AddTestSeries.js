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
	Switch,
	TableCell,
	TableBody,
	TableFooter,
	TablePagination,
	Input,
	MenuItem,
	Divider,
} from "@mui/material";
import axios from "axios";
import { MdSearch, MdDoneAll, MdClearAll, MdPanorama } from "react-icons/md";

export default function AddTestSeries() {
	const classes = useStyles();
	const [id, setId] = useState("");
	const [title, setTitle] = useState("");
	const [shortTitle, setST] = useState("");
	const [category, setCategory] = useState("");
	const [link, setLink] = useState("");
	const [isPopular, setIsP] = useState(false);
	const [highlight, setHighlight] = useState("");
	const [logo, setLogo] = useState("");
	const [description, setDescription] = useState("");
	const [allTseries, setAllTseries] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const snackRef = useRef();

	useEffect(() => {
		getData("");
	}, []);
	const getData = async (word) => {
		await axios
			.get(`/api/bigtest/testbundle/alltestbundle/${word}`)
			.then((res) => setAllTseries(res.data))
			.catch((err) => console.log(err));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		let Tseries = { _id: id, title, shortTitle, category, highlight, isPopular, logo, link, description };
		await axios
			.post(`/api/bigtest/testbundle/${id}`, Tseries)
			.then((res) => {
				snackRef.current.handleSnack(res.data);
				getData("");
				handleClear();
			})
			.catch((err) => console.log(err));
	};
	const handleClear = () => {
		setId("");
		setTitle("");
		setST("");
		setCategory("");
		setLink("");
		setIsP(false);
		setLogo("");
		setHighlight("");
		setDescription("");
	};

	const setData = async (id) => {
		await axios
			.get(`/api/bigtest/testbundle/get/${id}`)
			.then((res) => {
				setId(res.data._id);
				setTitle(res.data.title);
				setST(res.data.shortTitle);
				setCategory(res.data.category);
				setLink(res.data.link);
				setIsP(res.data.isPopular);
				setLogo(res.data.logo);
				setHighlight(res.data.highlight);
				setDescription(res.data.description);
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
										<Chip color="primary" label="Add Test Series" />
									</center>
								</Grid>
								<Grid item xs={4}>
									<FormControlLabel
										control={<Switch checked={isPopular} onChange={() => setIsP(!isPopular)} name="Popular" color="primary" />}
										label="Popular"
									/>
								</Grid>
								<Grid item xs={12} sm={9}>
									<TextField
										variant="outlined"
										required
										fullWidth
										inputProps={{ maxLength: "30" }}
										label="Series Title"
										placeholder="State CGL 2020 Mock Test"
										value={title}
										onChange={(e) => setTitle(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} sm={3}>
									<TextField
										variant="outlined"
										required
										fullWidth
										inputProps={{ maxLength: "15" }}
										label="Short Name"
										placeholder="RRC Group D"
										value={shortTitle}
										onChange={(e) => setST(e.target.value)}
									/>
								</Grid>
								<Grid item xs={6}>
									<TextField
										variant="outlined"
										fullWidth
										required
										select
										label="Select Category"
										value={category}
										onChange={(e) => setCategory(e.target.value)}
									>
										{allCategory.map((d) => (
											<MenuItem key={d} value={d}>
												{d}
											</MenuItem>
										))}
									</TextField>
								</Grid>
								<Grid item xs={6}>
									<TextField
										variant="outlined"
										required
										fullWidth
										label="Link / URL"
										placeholder="/"
										value={link}
										onChange={(e) => setLink(e.target.value)}
									/>
								</Grid>
								<Grid item xs={4}>
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
								<Grid item xs={4}>
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
									{allTseries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
										<TableRow key={data._id} onClick={() => setData(data._id)} hover>
											<TableCell component="td" scope="row">
												Name : {data.title} <br />
											</TableCell>
										</TableRow>
									))}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TablePagination
											count={allTseries.length}
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

const allCategory = ["Government Exams", "Placement Exams", "CBSE Exams", "Gate Exams"];
