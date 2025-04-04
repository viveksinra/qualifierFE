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
	TableCell,
	TableBody,
	TableFooter,
	TablePagination,
	Divider,
	Button,
	Typography,
	Card,
	CardContent,
	InputAdornment,
	Box
} from "@mui/material";
import axios from "axios";
import { MdDoneAll, MdClearAll, MdTitle, MdLink, MdNewReleases, MdDescription, MdImage } from "react-icons/md";

// Styled components to replace useStyles
const EntryAreaCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius * 2
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1)
}));

const SearchResultCard = styled(Card)(({ theme }) => ({
  maxHeight: '80vh',
  overflow: 'auto',
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius * 2
}));

export default function AddCategory() {
	const [id, setId] = useState("");
	const [title, setTitle] = useState("");
	const [link, setLink] = useState("");
	const [highlight, setHighlight] = useState("");
	const [image, setImage] = useState("");
	const [description, setDescription] = useState("");
	const [allCat, setAllCat] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [err] = useState({ errIn: "", msg: "" });
	const snackRef = useRef();
	useEffect(() => {
		getData("");
	}, []);
	const getData = async (word) => {
		await axios
			.get(`/api/test/category/allcategory/${word}`)
			.then((res) => setAllCat(res.data))
			.catch((err) => console.log(err));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		let newCat = { _id: id, categoryTitle: title, highlight, image, link, description };
		await axios
			.post(`/api/test/category/${id}`, newCat)
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
		setLink("");
		setImage("");
		setHighlight("");
		setDescription("");
	};
	const setData = async (id) => {
		await axios
			.get(`/api/test/category/get/${id}`)
			.then((res) => {
				setId(res.data[0]._id);
				setTitle(res.data[0].categoryTitle);
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

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<Fragment>
			<Grid container spacing={3}>
				<Grid item size={{xs: 12, sm:9 }} >
					<EntryAreaCard>
						<CardContent>
							<Typography variant="h5" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
								<Chip color="primary" label={id ? "Update Category" : "Add New Category"} />
							</Typography>
							
							<form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: "100%" }}>
								<Grid container spacing={3}>
									<Grid item size={{xs: 12}} >
										<TextField
											variant="outlined"
											required
											fullWidth
											inputProps={{ maxLength: "42" }}
											onBlur={() => handleErr("title")}
											error={err.errIn === "title" ? true : false}
											label={err.errIn === "title" ? err.msg : "Category Title"}
											placeholder="Name of the Category.."
											value={title}
											onChange={(e) => setTitle(e.target.value)}
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<MdTitle />
													</InputAdornment>
												),
											}}
										/>
									</Grid>
									<Grid item size={{xs: 12, sm: 6 }}>
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
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<MdLink />
													</InputAdornment>
												),
											}}
										/>
									</Grid>
									<Grid item size={{xs: 12, sm: 6 }}>
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
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<MdNewReleases />
													</InputAdornment>
												),
											}}
										/>
									</Grid>
									<Grid item size={{xs: 12}} >
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
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<MdImage />
													</InputAdornment>
												),
											}}
										/>
									</Grid>
									{image && (
										<Grid item size={{xs: 12}}>
											<Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
												<img src={image} alt="Category" style={{ maxHeight: '150px', maxWidth: '100%', borderRadius: '8px' }} />
											</Box>
										</Grid>
									)}
									<Grid item size={{xs: 12}} >
										<TextField
											variant="outlined"
											fullWidth
											multiline
											rows={3}
											onBlur={() => handleErr("description")}
											error={err.errIn === "description" ? true : false}
											label={err.errIn === "description" ? err.msg : "Description "}
											placeholder="few words..."
											value={description}
											onChange={(e) => setDescription(e.target.value)}
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<MdDescription />
													</InputAdornment>
												),
											}}
										/>
									</Grid>
									<Grid item size={{xs: 12}} >
										<Divider sx={{ my: 2 }} />
										<Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
											<StyledButton
												variant="contained"
												startIcon={<MdDoneAll />}
												type="submit"
												color="primary"
												size="large"
											>
												{id ? "Update Category" : "Create New Category"}
											</StyledButton>
											<StyledButton
												startIcon={<MdClearAll />}
												variant="outlined"
												onClick={handleClear}
												color="secondary"
												size="large"
											>
												Clear All
											</StyledButton>
										</Box>
									</Grid>
								</Grid>
							</form>
						</CardContent>
					</EntryAreaCard>
				</Grid>
				<Grid item size={{xs: 12, sm:3 }} >
					<SearchResultCard>
						<CardContent>
							<Typography variant="h6" gutterBottom>
								Existing Categories
							</Typography>
							<Divider sx={{ mb: 2 }} />
							<Table>
								<TableHead>
									<TableRow>
										<TableCell component="th" scope="row">
											Category Name
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{allCat.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
										<TableRow 
											key={data._id} 
											onClick={() => setData(data._id)} 
											hover
											sx={{ 
												cursor: 'pointer',
												'&:hover': {
													backgroundColor: 'rgba(0, 0, 0, 0.04)'
												}
											}}
										>
											<TableCell component="td" scope="row">
												{data.categoryTitle}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TablePagination
											rowsPerPageOptions={[5, 10, 25]}
											count={allCat.length}
											rowsPerPage={rowsPerPage}
											page={page}
											onPageChange={handleChangePage}
											onRowsPerPageChange={handleChangeRowsPerPage}
										/>
									</TableRow>
								</TableFooter>
							</Table>
						</CardContent>
					</SearchResultCard>
				</Grid>
			</Grid>
			<MySnackbar ref={snackRef} />
		</Fragment>
	);
}
