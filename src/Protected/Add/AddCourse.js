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
	Tooltip,
	Fab,
	TableCell,
	TableBody,
	TableFooter,
	TablePagination,
	Input,
	Divider,
	Autocomplete,
	Button,
	Box
} from "@mui/material";
import axios from "axios";
import { MdSearch, MdDoneAll, MdClearAll, MdPanorama, MdImportantDevices } from "react-icons/md";

// Styled components
const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1)
}));

// Search styles
const SearchDiv = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2)
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

const InputRoot = styled('div')(({ theme }) => ({
  color: 'inherit',
  width: '100%'
}));

const InputInput = styled(Input)(({ theme }) => ({
  padding: theme.spacing(1, 1, 1, 0),
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  width: '100%'
}));

export default function AddCourse() {
	const [id, setId] = useState("");
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState([]);
	const [allCategory, setAllCategory] = useState([]);
	const [link, setLink] = useState("");
	const [highlight, setHighlight] = useState("");
	const [image, setImage] = useState("");
	const [logo, setLogo] = useState("");
	const [description, setDescription] = useState("");
	const [allCourse, setAllCourse] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [err] = useState({ errIn: "", msg: "" });
	const snackRef = useRef();

	useEffect(() => {
		getData("");
		getCategory();
	}, []);
	
	// Generate URL-friendly string from title
	const generateURLFromTitle = (title) => {
		return title
			.toLowerCase()
			.replace(/[^\w\s-]/g, "") // Remove special characters
			.replace(/\s+/g, "-") // Replace spaces with hyphens
			.replace(/-+/g, "-"); // Remove consecutive hyphens
	};
	
	// Update title and auto-generate link
	const handleTitleChange = (e) => {
		const newTitle = e.target.value;
		setTitle(newTitle);
		setLink(generateURLFromTitle(newTitle));
	};
	
	const getData = async (word) => {
		await axios
			.get(`/api/test/course/allcourse/${word}`)
			.then((res) => {
				setAllCourse(res.data);
			})
			.catch((err) => console.log(err));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		let courseData = { _id: id, courseTitle: title, logo, category, highlight, image, link, description };
		await axios
			.post(`/api/test/course/${id}`, courseData)
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
		setCategory([]);
		setLink("");
		setImage("");
		setLogo("");
		setHighlight("");
		setDescription("");
	};
	const getCategory = () => {
		axios
			.get(`/api/test/category/allcategory/`)
			.then((res) => setAllCategory(res.data))
			.catch((err) => console.log(err));
	};
	const setData = async (id) => {
		await axios
			.get(`/api/test/course/get/${id}`)
			.then((res) => {
				setId(res.data[0]._id);
				setTitle(res.data[0].courseTitle);
				setCategory(res.data[0].category);
				setLink(res.data[0].link);
				setImage(res.data[0].image);
				setLogo(res.data[0].logo);
				setHighlight(res.data[0].highlight);
				setDescription(res.data[0].description);
			})
			.catch((err) => console.log(err));
	};
	const imgUpload = async (e, name) => {
		if (e) {
			const selectedFile = e;
			const imgData = new FormData();
			imgData.append("photo", selectedFile, selectedFile.name);
			if (name === "image") {
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
			} else if (name === "logo") {
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
				<Grid item size={{xs: 12,  md: 9 }} >
					<Paper sx={{
                        padding: theme => theme.spacing(2),
                        margin: theme => theme.spacing(1),
                        backgroundColor: theme => theme.palette.background.paper
                    }}>
						<form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: "100vw" }}>
							<Grid container spacing={2}>
								<Grid item size={{xs: 4 }}></Grid>
								<Grid item size={{xs: 4 }}>
									<center>
										<Chip color="primary" label="Add Course" />
									</center>
								</Grid>
								<Grid item size={{xs: 4 }}></Grid>
								<Grid item size={{xs: 12}} >
									<TextField
										variant="outlined"
										required
										fullWidth
										inputProps={{ maxLength: "42" }}
										onBlur={() => handleErr("title")}
										error={err.errIn === "title" ? true : false}
										label={err.errIn === "title" ? err.msg : "Course Title"}
										placeholder="Name of the Course.."
										value={title}
										onChange={handleTitleChange}
									/>
								</Grid>
								<Grid item size={{xs: 12}} >
									<Autocomplete
										multiple
										options={allCategory}
										filterSelectedOptions
										getOptionLabel={(option) => option.categoryTitle}
										onChange={(e, v) => {
											setCategory(v);
										}}
										value={category}
										renderInput={(params) => <TextField {...params} variant="outlined" label="Select Category" />}
									/>
								</Grid>
								<Grid item size={{xs: 6 }}>
									<TextField
										variant="outlined"
										required
										fullWidth
										onBlur={() => handleErr("link")}
										error={err.errIn === "link" ? true : false}
										label={err.errIn === "link" ? err.msg : "Link / URL "}
										placeholder="/"
										value={link}
										onChange={(e) => setLink(e.target.value)}
										helperText="Auto-generated from title, but can be edited"
									/>
								</Grid>
								<Grid item size={{xs: 6 }}>
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
								<Grid item size={{xs: 6 }}>
									<TextField
										variant="outlined"
										type="file"
										InputLabelProps={{ shrink: true }}
										inputProps={{ accept: "image/*" }}
										fullWidth
										onBlur={() => handleErr("image")}
										error={err.errIn === "image" ? true : false}
										label={err.errIn === "image" ? err.msg : "Course Image"}
										onChange={(e) => imgUpload(e.target.files[0], "image")}
									/>
								</Grid>
								<Grid item size={{xs: 6 }}>
									<TextField
										variant="outlined"
										type="file"
										InputLabelProps={{ shrink: true }}
										inputProps={{ accept: "image/png" }}
										fullWidth
										onBlur={() => handleErr("logo")}
										error={err.errIn === "logo" ? true : false}
										label={err.errIn === "logo" ? err.msg : "Logo (PNG Only)"}
										onChange={(e) => imgUpload(e.target.files[0], "logo")}
									/>
								</Grid>
								<Grid item size={{xs: 12}} >
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
								<Grid item size={{xs: 12}} >
									<Divider />
								</Grid>
								<Grid item size={{xs: 12}} >
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
										{logo !== "" && (
											<a href={logo} target="_blank" rel="noopener noreferrer">
												<Tooltip title="Logo">
													<Fab size="small" color="secondary" sx={{ margin: theme => theme.spacing(1) }}>
														<MdImportantDevices />
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
				<Grid item size={{xs: 12, md:3 }} >
					{/* Search Section */}
					<SearchDiv>
						<SearchIconWrapper>
							<MdSearch />
						</SearchIconWrapper>
						<InputInput
							placeholder="Search Course..."
							onChange={(e) => getData(e.target.value)}
							disableUnderline
						/>
					</SearchDiv>
					<Paper sx={{ maxHeight: '80vh', overflow: 'auto', margin: theme => theme.spacing(1) }}>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell component="th" scope="row">
										Search Results
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{allCourse.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
									<TableRow key={data._id} onClick={() => setData(data._id)} hover>
										<TableCell component="td" scope="row">
											Name : {data.courseTitle} <br />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										count={allCourse.length}
										rowsPerPage={rowsPerPage}
										page={page}
										onPageChange={(e, page) => setPage(page)}
										onRowsPerPageChange={(e) => setRowsPerPage(e.target.value)}
									/>
								</TableRow>
							</TableFooter>
						</Table>
					</Paper>
				</Grid>
			</Grid>
			<MySnackbar ref={snackRef} />
		</Fragment>
	);
}
