import React, { Fragment, useState, useEffect, useRef } from "react";
import { styled } from "@mui/material/styles";
import {
  Grid,
  Chip,
  Paper,
  TextField,
  Button,
  Box,
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
  Divider
} from "@mui/material";
import MySnackbar from "../../Components/MySnackbar";
import axios from "axios";
import { MdSearch, MdDoneAll, MdClearAll, MdPanorama, MdAutorenew } from "react-icons/md";

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

// Search styles
const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: '100%'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInput = styled(Input)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '100%'
  }
}));

export default function AddTestSeries() {
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
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const snackRef = useRef();

	useEffect(() => {
		getData("");
	}, []);
	
	// Function to generate slug from title
	const generateSlug = (text) => {
		return text
			.toString()
			.toLowerCase()
			.trim()
			.replace(/\s+/g, '-')        // Replace spaces with -
			.replace(/[^\w\-]+/g, '')    // Remove all non-word chars
			.replace(/\-\-+/g, '-')      // Replace multiple - with single -
			.replace(/^-+/, '')          // Trim - from start of text
			.replace(/-+$/, '');         // Trim - from end of text
	};
	
	// Auto-generate link when title changes
	const handleTitleChange = (e) => {
		const newTitle = e.target.value;
		setTitle(newTitle);
		setLink(`/${generateSlug(newTitle)}`);
	};
	
	// Function to manually generate link from current title
	const regenerateLink = () => {
		setLink(`/${generateSlug(title)}`);
	};
	
	const getData = async (word) => {
		setLoading(true);
		setError(null);
		try {
			const res = await axios.get(`/api/bigtest/testbundle/alltestbundle/${word}`);
			setAllTseries(res.data || []);
		} catch (err) {
			console.log(err);
			setError("Failed to load test series data");
			setAllTseries([]);
			if (snackRef.current) {
				snackRef.current.handleSnack({ message: "Failed to load test series data", severity: "error" });
			}
		} finally {
			setLoading(false);
		}
	};
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		let Tseries = { _id: id, title, shortTitle, category, highlight, isPopular, logo, link, description };
		try {
			const res = await axios.post(`/api/bigtest/testbundle/${id}`, Tseries);
			if (snackRef.current) {
				snackRef.current.handleSnack(res.data);
			}
			getData("");
			handleClear();
		} catch (err) {
			console.log(err);
			if (snackRef.current) {
				snackRef.current.handleSnack({ message: "Failed to save test series", severity: "error" });
			}
		} finally {
			setLoading(false);
		}
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
		setLoading(true);
		try {
			const res = await axios.get(`/api/bigtest/testbundle/get/${id}`);
			if (res.data) {
				setId(res.data._id || "");
				setTitle(res.data.title || "");
				setST(res.data.shortTitle || "");
				setCategory(res.data.category || "");
				setLink(res.data.link || "");
				setIsP(res.data.isPopular || false);
				setLogo(res.data.logo || "");
				setHighlight(res.data.highlight || "");
				setDescription(res.data.description || "");
			}
		} catch (err) {
			console.log(err);
			if (snackRef.current) {
				snackRef.current.handleSnack({ message: "Failed to load test series details", severity: "error" });
			}
		} finally {
			setLoading(false);
		}
	};
	
	const imgUpload = async (e) => {
		if (e) {
			setLoading(true);
			const selectedFile = e;
			const imgData = new FormData();
			imgData.append("photo", selectedFile, selectedFile.name);
			try {
				const res = await axios.post(`/api/other/fileupload/upload`, imgData, {
					headers: {
						accept: "application/json",
						"Accept-Language": "en-US,en;q=0.8",
						"Content-Type": `multipart/form-data; boundary=${imgData._boundary}`,
					},
				});
				if (res.data && res.data.result) {
					setLogo(res.data.result.secure_url || "");
				}
			} catch (err) {
				console.log(err);
				if (snackRef.current) {
					snackRef.current.handleSnack({ message: "Failed to upload image", severity: "error" });
				}
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<Fragment>
			<Grid container>
				<Grid item size={{ xs: 12, md: 9 }}>
					<Paper sx={{ padding: 2, margin: 1, backgroundColor: 'background.paper' }}>
						<form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: "100vw" }}>
							<Grid container spacing={2}>
								<Grid item size={{ xs: 4 }}></Grid>
								<Grid item size={{ xs: 4 }}>
									<center>
										<Chip color="primary" label="Add Test Series" />
									</center>
								</Grid>
								<Grid item size={{ xs: 4 }}>
									<FormControlLabel
										control={<Switch checked={isPopular} onChange={() => setIsP(!isPopular)} name="Popular" color="primary" />}
										label="Popular"
									/>
								</Grid>
								<Grid item size={{ xs: 12, sm: 9 }}>
									<TextField
										variant="outlined"
										required
										fullWidth
										inputProps={{ maxLength: "30" }}
										label="Series Title"
										placeholder="State CGL 2020 Mock Test"
										value={title}
										onChange={handleTitleChange}
									/>
								</Grid>
								<Grid item size={{ xs: 12, sm: 3 }}>
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
								<Grid item size={{ xs: 6 }}>
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
								<Grid item size={{ xs: 6 }}>
									<Box sx={{ display: 'flex', alignItems: 'center' }}>
										<TextField
											variant="outlined"
											required
											fullWidth
											label="Link / URL"
											placeholder="/"
											value={link}
											onChange={(e) => setLink(e.target.value)}
										/>
										<Tooltip title="Auto-generate from title">
											<Fab 
												size="small" 
												color="primary" 
												onClick={regenerateLink} 
												sx={{ ml: 1 }}
												disabled={!title}
											>
												<MdAutorenew />
											</Fab>
										</Tooltip>
									</Box>
								</Grid>
								<Grid item size={{ xs: 4 }}>
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
								<Grid item size={{ xs: 4 }}>
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
								<Grid item size={{ xs: 12 }}>
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
								<Grid item size={{ xs: 12 }}>
									<Divider />
								</Grid>
								<Grid item size={{ xs: 12 }}>
									<center>
										<Tooltip title={id === "" ? "Save" : "Update"}>
											<Fab color="primary" type="submit" sx={{ margin: 1 }} disabled={loading}>
												<MdDoneAll />
											</Fab>
										</Tooltip>
										<Tooltip title="Clear All">
											<Fab size="small" color="secondary" onClick={() => handleClear()} sx={{ margin: 1 }} disabled={loading}>
												<MdClearAll />
											</Fab>
										</Tooltip>
										{logo !== "" && (
											<a href={logo} target="_blank" rel="noopener noreferrer">
												<Tooltip title="Logo">
													<Fab size="small" color="secondary" sx={{ margin: 1 }}>
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
				<Grid item size={{ xs: 12, md: 3 }}>
					{/* Search Section */}
					<Box sx={{ position: 'relative', borderRadius: 1, marginLeft: 0, width: '100%' }}>
						<Box sx={{ 
							padding: '0 16px', 
							height: '100%', 
							position: 'absolute', 
							pointerEvents: 'none', 
							display: 'flex', 
							alignItems: 'center', 
							justifyContent: 'center' 
						}}>
							<MdSearch />
						</Box>
						<Input
							placeholder="Search Test Series"
							onChange={(e) => getData(e.target.value)}
							disableUnderline
							sx={{
								color: 'inherit',
								width: '100%',
								'& .MuiInputBase-input': {
									padding: '8px 8px 8px 0',
									paddingLeft: 'calc(1em + 32px)',
									width: '100%'
								}
							}}
						/>
					</Box>
					<Box sx={{ maxHeight: '80vh', overflow: 'auto', margin: 1 }}>
						<Paper>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell component="th" scope="row">
											Search Results {loading && "- Loading..."}
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{error && (
										<TableRow>
											<TableCell component="td" scope="row">
												{error}
											</TableCell>
										</TableRow>
									)}
									{!loading && !error && allTseries.length === 0 && (
										<TableRow>
											<TableCell component="td" scope="row">
												No test series found
											</TableCell>
										</TableRow>
									)}
									{!loading && allTseries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
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
											onPageChange={(e, page) => setPage(page)}
											onRowsPerPageChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
										/>
									</TableRow>
								</TableFooter>
							</Table>
						</Paper>
					</Box>
				</Grid>
			</Grid>
			<MySnackbar ref={snackRef} />
		</Fragment>
	);
}

const allCategory = ["Government Exams", "Placement Exams", "CBSE Exams", "Gate Exams"];
