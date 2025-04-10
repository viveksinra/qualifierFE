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
	Box,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	FormControlLabel,
	Switch
} from "@mui/material";
import axios from "axios";
import { MdDoneAll, MdClearAll, MdPerson, MdTitle, MdImage, MdLink, MdLabel, MdDescription, MdDelete } from "react-icons/md";

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

export default function AddWebsiteImage() {
	const [id, setId] = useState("");
	const [user, setUser] = useState("");
	const [title, setTitle] = useState("");
	const [imageLink, setImageLink] = useState("");
	const [referLink, setReferLink] = useState("");
	const [link, setLink] = useState("offer");
	const [tag, setTag] = useState("dashboard");
	const [description, setDescription] = useState("");
	const [allImages, setAllImages] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [err] = useState({ errIn: "", msg: "" });
	const [isUploading, setIsUploading] = useState(false);
	const [selectedFileName, setSelectedFileName] = useState("");
	const snackRef = useRef();
	
	useEffect(() => {
		getImages();
	}, []);
	
	const getImages = async () => {
		await axios
			.get(`/api/general/myImage/admin/getAll`)
			.then((res) => setAllImages(res.data.data))
			.catch((err) => console.log(err));
	};
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		
		// Validate that an image is uploaded
		if (!imageLink) {
			snackRef.current.handleSnack({
				severity: "error",
				message: "Please upload an image before submitting"
			});
			return;
		}
		
		let newImage = { 
			_id: id, 
			user, 
			title, 
			imageLink, 
			referLink, 
			link, 
			tag, 
			description
		};
		
		await axios
			.post(`/api/general/myImage/admin/save/${id ? id : 'add'}`, newImage)
			.then((res) => {
				snackRef.current.handleSnack(res.data);
				getImages();
				handleClear();
			})
			.catch((err) => console.log(err));
	};
	
	const handleClear = () => {
		setId("");
		setUser("");
		setTitle("");
		setImageLink("");
		setReferLink("");
		setLink("offer");
		setTag("dashboard");
		setDescription("");
		setSelectedFileName("");
	};
	
	const removeImage = () => {
		setImageLink("");
		setSelectedFileName("");
		snackRef.current.handleSnack({
			severity: "info",
			message: "Image removed"
		});
	};
	
	const setData = async (id) => {
		await axios
			.get(`/api/general/myImage/admin/getOne/${id}`)
			.then((res) => {
				// Check if data is an array and use the first item
				const myImage = Array.isArray(res.data.data) ? res.data.data[0] : res.data.data;
				setId(myImage._id);
				setUser(myImage.user || "");
				setTitle(myImage.title);
				setImageLink(myImage.imageLink);
				setReferLink(myImage.referLink);
				setLink(myImage.link);
				setTag(myImage.tag);
				setDescription(myImage.description);
			})
			.catch((err) => console.log(err));
	};
	
	const imgUpload = async (e) => {
		if (e) {
			setIsUploading(true);
			const selectedFile = e;
			setSelectedFileName(selectedFile.name);
			
			const imgData = new FormData();
			imgData.append("photo", selectedFile, selectedFile.name);
			
			try {
				const res = await axios.post(
					`/api/other/fileupload/upload`, 
					imgData, 
					{
						headers: {
							accept: "application/json",
							"Accept-Language": "en-US,en;q=0.8",
							"Content-Type": `multipart/form-data; boundary=${imgData._boundary}`,
						},
					}
				);
				
				setImageLink(res.data.result.secure_url);
				snackRef.current.handleSnack({
					severity: "success",
					message: "Image uploaded successfully"
				});
			} catch (err) {
				console.log(err);
				snackRef.current.handleSnack({
					severity: "error",
					message: "Failed to upload image"
				});
			} finally {
				setIsUploading(false);
			}
		}
	};
	
	const handleErr = (errIn) => {
		switch (errIn) {
			case "title":
				// if(title.length < 2){
				//     setErr({errIn:"title", msg:"Enter valid title"})
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
								<Chip color="primary" label={id ? "Update Image" : "Add New Image"} />
							</Typography>
							
							<form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: "100%" }}>
								<Grid container spacing={3}>
									
									<Grid item size={{xs: 12, sm: 6}}>
										<TextField
											variant="outlined"
											required
											fullWidth
											onBlur={() => handleErr("title")}
											error={err.errIn === "title" ? true : false}
											label={err.errIn === "title" ? err.msg : "Title"}
											placeholder="Enter image title"
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
									<Grid item size={{xs: 12, sm: 6}}>
										<TextField
											variant="outlined"
											required
											fullWidth
											onBlur={() => handleErr("referLink")}
											error={err.errIn === "referLink" ? true : false}
											label={err.errIn === "referLink" ? err.msg : "Refer Link"}
											placeholder="Enter refer link (e.g., /pricing)"
											value={referLink}
											onChange={(e) => setReferLink(e.target.value)}
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<MdLink />
													</InputAdornment>
												),
											}}
										/>
									</Grid>
									<Grid item size={{xs: 12, sm: 6}}>
										<FormControl fullWidth required variant="outlined">
											<InputLabel id="link-select-label">Link Type</InputLabel>
											<Select
												labelId="link-select-label"
												value={link}
												onChange={(e) => setLink(e.target.value)}
												label="Link Type"
												startAdornment={
													<InputAdornment position="start">
														<MdLink />
													</InputAdornment>
												}
											>
												<MenuItem value="offer">Offer</MenuItem>
												<MenuItem value="slider">Slider</MenuItem>
												<MenuItem value="test-series1">Test Series 1</MenuItem>
												<MenuItem value="test-series2">Test Series 2</MenuItem>
											</Select>
										</FormControl>
									</Grid>
									<Grid item size={{xs: 12, sm: 6}}>
										<FormControl fullWidth variant="outlined">
											<InputLabel id="tag-select-label">Tag</InputLabel>
											<Select
												labelId="tag-select-label"
												value={tag}
												onChange={(e) => setTag(e.target.value)}
												label="Tag"
												startAdornment={
													<InputAdornment position="start">
														<MdLabel />
													</InputAdornment>
												}
											>
												<MenuItem value="dashboard">Dashboard</MenuItem>
												<MenuItem value="practice">Practice</MenuItem>
											</Select>
										</FormControl>
									</Grid>
									<Grid item size={{xs: 12}}>
										{!imageLink ? (
											<>
												<TextField
													variant="outlined"
													type="file"
													InputLabelProps={{ shrink: true }}
													inputProps={{ accept: "image/*" }}
													fullWidth
													required
													onBlur={() => handleErr("imageLink")}
													error={err.errIn === "imageLink" ? true : false}
													label={err.errIn === "imageLink" ? err.msg : "Image"}
													onChange={(e) => imgUpload(e.target.files[0])}
													InputProps={{
														startAdornment: (
															<InputAdornment position="start">
																<MdImage />
															</InputAdornment>
														),
														endAdornment: (
															<InputAdornment position="end">
																{isUploading && <Chip color="warning" size="small" label="Uploading..." />}
															</InputAdornment>
														)
													}}
												/>
												{selectedFileName && !imageLink && !isUploading && (
													<Typography variant="caption" color="error">
														Upload failed for: {selectedFileName}. Please try again.
													</Typography>
												)}
												{!selectedFileName && (
													<Typography variant="caption" color="textSecondary">
														Please select an image file to upload
													</Typography>
												)}
												{isUploading && (
													<Typography variant="caption" color="primary">
														Uploading: {selectedFileName}...
													</Typography>
												)}
											</>
										) : (
											<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
												<Box sx={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
													<img 
														src={imageLink} 
														alt="Website Image" 
														style={{ 
															width: '100%', 
															borderRadius: '8px',
															boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
														}} 
													/>
													<Button
														variant="contained"
														color="error"
														startIcon={<MdDelete />}
														onClick={removeImage}
														size="small"
														sx={{
															position: 'absolute',
															top: 10,
															right: 10,
															minWidth: 'unset',
															padding: '4px 8px',
														}}
													>
														Remove
													</Button>
												</Box>
												<Typography>
													Image uploaded successfully
												</Typography>
											</Box>
										)}
									</Grid>
									<Grid item size={{xs: 12}}>
										<TextField
											variant="outlined"
											fullWidth
											multiline
											rows={4}
											onBlur={() => handleErr("description")}
											error={err.errIn === "description" ? true : false}
											label={err.errIn === "description" ? err.msg : "Description"}
											placeholder="Enter image description"
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
									<Grid item size={{xs: 12}}>
										<Divider sx={{ my: 2 }} />
										<Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
											<StyledButton
												variant="contained"
												startIcon={<MdDoneAll />}
												type="submit"
												color="primary"
												size="large"
											>
												{id ? "Update Image" : "Add Image"}
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
				<Grid item size={{xs: 12, sm:3}}>
					<SearchResultCard>
						<CardContent>
							<Typography variant="h6" gutterBottom>
								Existing Images
							</Typography>
							<Divider sx={{ mb: 2 }} />
							<Table>
								<TableHead>
									<TableRow>
										<TableCell component="th" scope="row">
											Title
										</TableCell>
										<TableCell component="th" scope="row">
											Type
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{allImages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
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
												{data.title}
											</TableCell>
											<TableCell component="td" scope="row">
												{data.link}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TablePagination
											rowsPerPageOptions={[5, 10, 25]}
											count={allImages.length}
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
