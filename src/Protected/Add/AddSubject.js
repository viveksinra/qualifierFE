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
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  Input,
  Divider
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import MySnackbar from "../../Components/MySnackbar";
import axios from "axios";
import { MdSearch, MdDoneAll, MdClearAll, MdPanorama } from "react-icons/md";

// Styled components
const StyledButton = styled(Button)(({ theme }) => ({
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

export default function AddSubject() {
	const [id, setId] = useState("");
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState(null);
	const [course, setCourse] = useState(null);
	const [allCategory, setAllCategory] = useState([]);
	const [link, setLink] = useState("");
	const [highlight, setHighlight] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const [allCourse, setAllCourse] = useState([]);
	const [allSubject, setAllSubject] = useState([]);
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
			.get(`/api/test/subject/allsubject/${word}`)
			.then((res) => setAllSubject(res.data))
			.catch((err) => console.log(err));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		let subjectData = { _id: id, subjectTitle: title, course: [course], category: [category], highlight, image, link, description };
		await axios
			.post(`/api/test/subject/${id}`, subjectData)
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
		setCategory(null);
		setCourse(null);
		setLink("");
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
	const getCourse = (v) => {
		if (v) {
			axios
				.get(`/api/test/course/cat/${v.link}`)
				.then((res) => setAllCourse(res.data))
				.catch((err) => console.log(err));
		}
	};
	const setData = async (id) => {
		await axios
			.get(`/api/test/subject/get/${id}`)
			.then((res) => {
				setId(res.data[0]._id);
				setTitle(res.data[0].subjectTitle);
				setCategory(res.data[0].category[0]);
				setCourse(res.data[0].course[0]);
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
	
	// Generate URL-friendly slug from title
	const generateSlug = (text) => {
		return text
			.toString()
			.toLowerCase()
			.trim()
			.replace(/\s+/g, '-')          // Replace spaces with -
			.replace(/&/g, '-and-')         // Replace & with 'and'
			.replace(/[^\w\-]+/g, '')      // Remove all non-word characters
			.replace(/\-\-+/g, '-')         // Replace multiple - with single -
			.replace(/^-+/, '')             // Trim - from start of text
			.replace(/-+$/, '');            // Trim - from end of text
	};
	
	// Handle title change and auto-generate link
	const handleTitleChange = (e) => {
		const newTitle = e.target.value;
		setTitle(newTitle);
		setLink(generateSlug(newTitle));
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
				<Grid item size={{xs: 12, md: 9}}>
					<Paper sx={{
                        padding: theme => theme.spacing(2),
                        margin: theme => theme.spacing(1),
                        backgroundColor: theme => theme.palette.background.paper
                    }}>
						<form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: "100vw" }}>
							<Grid container spacing={2}>
								<Grid item size={{xs: 4}}></Grid>
								<Grid item size={{xs: 4}}>
									<center>
										<Chip color="primary" label="Add Subject" />
									</center>
								</Grid>
								<Grid item size={{xs: 4}}></Grid>
								<Grid item size={{xs: 12}}>
									<TextField
										variant="outlined"
										required
										fullWidth
										inputProps={{ maxLength: "42" }}
										onBlur={() => handleErr("title")}
										error={err.errIn === "title" ? true : false}
										label={err.errIn === "title" ? err.msg : "Subject Title"}
										placeholder="Name of the Subject.."
										value={title}
										onChange={handleTitleChange}
									/>
								</Grid>
								<Grid item size={{xs: 12}}>
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
								<Grid item size={{xs: 12}}>
									<Autocomplete
										options={allCourse}
										getOptionLabel={(option) => option.courseTitle}
										onChange={(e, v) => setCourse(v)}
										value={course}
										renderInput={(params) => <TextField {...params} required label="Select Course" variant="outlined" fullWidth />}
									/>
								</Grid>
								<Grid item size={{xs: 6}}>
									<TextField
										variant="outlined"
										required
										fullWidth
										onBlur={() => handleErr("link")}
										error={err.errIn === "link" ? true : false}
										label={err.errIn === "link" ? err.msg : "Link / URL (auto-generated)"}
										placeholder="/"
										value={link}
										onChange={(e) => setLink(e.target.value)}
									/>
								</Grid>
								<Grid item size={{xs: 6}}>
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
								<Grid item size={{xs: 12}}>
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
								<Grid item size={{xs: 12}}>
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
								<Grid item size={{xs: 12}}>
									<Divider />
								</Grid>
								<Grid item size={{xs: 12}}>
									<center>
										<Tooltip title={id === "" ? "Save" : "Update"}>
											<Fab color="primary" type="submit" sx={{ margin: theme => theme.spacing(1) }}>
												<MdDoneAll />
											</Fab>
										</Tooltip>
										<Tooltip title="Clear All">
											<Fab size="small" color="secondary" onClick={() => handleClear()} sx={{ margin: theme => theme.spacing(1) }}>
												<MdClearAll />
											</Fab>
										</Tooltip>
										{image !== "" && (
											<a href={image} target="_blank" rel="noopener noreferrer">
												<Tooltip title="Image">
													<Fab size="small" color="secondary" sx={{ margin: theme => theme.spacing(1) }}>
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
				<Grid item size={{xs: 12, md: 3}}>
					{/* Search Section */}
					<SearchContainer>
						<SearchIconWrapper>
							<MdSearch />
						</SearchIconWrapper>
						<StyledInput
							placeholder="Search Subject..."
							onChange={(e) => getData(e.target.value)}
							disableUnderline
						/>
					</SearchContainer>
					<Box sx={{
                        maxHeight: '80vh',
                        overflow: 'auto',
                        margin: theme => theme.spacing(1)
                    }}>
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
									{allSubject.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
										<TableRow key={data._id} onClick={() => setData(data._id)} hover>
											<TableCell component="td" scope="row">
												Name : {data.subjectTitle} <br />
											</TableCell>
										</TableRow>
									))}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TablePagination
											count={allSubject.length}
											rowsPerPage={rowsPerPage}
											page={page}
											onChangePage={(e, page) => setPage(page)}
											onChangeRowsPerPage={(r) => setRowsPerPage(r.target.value)}
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
