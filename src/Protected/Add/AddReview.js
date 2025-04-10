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
	Rating,
	FormControlLabel,
	Switch
} from "@mui/material";
import axios from "axios";
import { MdDoneAll, MdClearAll, MdPerson, MdNumbers, MdOutlineWork, MdDescription, MdImage, MdStar } from "react-icons/md";

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

export default function AddReview() {
	const [id, setId] = useState("");
	const [user, setUser] = useState("");
	const [voucherNo, setVoucherNo] = useState("");
	const [name, setName] = useState("");
	const [designation, setDesignation] = useState("");
	const [image, setImage] = useState("");
	const [review, setReview] = useState("");
	const [rating, setRating] = useState("5");
	const [live, setLive] = useState("true");
	const [allReviews, setAllReviews] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [err] = useState({ errIn: "", msg: "" });
	const snackRef = useRef();
	
	useEffect(() => {
		getReviews();
	}, []);
	
	const getReviews = async () => {
		await axios
			.get(`/api/other/review/admin/getAll`)
			.then((res) => setAllReviews(res.data))
			.catch((err) => console.log(err));
	};
	

	
	const handleSubmit = async (e) => {
		e.preventDefault();
		let newReview = { 
			_id: id, 
			user, 
			voucherNo, 
			name, 
			designation, 
			image, 
			review, 
			rating, 
			live 
		};
		
		await axios
			.post(`/api/other/review/admin/save/${id ? id : 'add'}`, newReview)
			.then((res) => {
				snackRef.current.handleSnack(res.data);
				getReviews();
				handleClear();
			})
			.catch((err) => console.log(err));
	};
	
	const handleClear = () => {
		setId("");
		setUser("");
		setVoucherNo("");
		setName("");
		setDesignation("");
		setImage("");
		setReview("");
		setRating("5");
		setLive("true");
	};
	
	const handleRemoveImage = () => {
		setImage("");
	};
	
	const setData = async (id) => {
		await axios
			.get(`/api/other/review/admin/getOne/${id}`)
			.then((res) => {
				setId(res.data._id);
				setUser(res.data.user || "");
				setVoucherNo(res.data.voucherNo);
				setName(res.data.name);
				setDesignation(res.data.designation);
				setImage(res.data.image);
				setReview(res.data.review);
				setRating(res.data.rating);
				setLive(res.data.live);
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
			case "name":
				// if(name.length < 2){
				//     setErr({errIn:"name", msg:"Enter valid name"})
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
								<Chip color="primary" label={id ? "Update Review" : "Add New Review"} />
							</Typography>
							
							<form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: "100%" }}>
								<Grid container spacing={3}>
									
								{	id && <Grid item size={{xs: 12, sm: 6}}>
										<TextField
											variant="outlined"
											disabled={true}
											required
											fullWidth
											onBlur={() => handleErr("voucherNo")}
											error={err.errIn === "voucherNo" ? true : false}
											label={err.errIn === "voucherNo" ? err.msg : "Voucher Number"}
											placeholder="Enter voucher number"
											value={voucherNo}
											onChange={(e) => setVoucherNo(e.target.value)}
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<MdNumbers />
													</InputAdornment>
												),
											}}
										/>
									</Grid>}
									<Grid item size={{xs: 12, sm: 6}}>
										<TextField
											variant="outlined"
											required
											fullWidth
											onBlur={() => handleErr("name")}
											error={err.errIn === "name" ? true : false}
											label={err.errIn === "name" ? err.msg : "Name"}
											placeholder="Enter reviewer name"
											value={name}
											onChange={(e) => setName(e.target.value)}
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<MdPerson />
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
											onBlur={() => handleErr("designation")}
											error={err.errIn === "designation" ? true : false}
											label={err.errIn === "designation" ? err.msg : "Designation"}
											placeholder="Enter reviewer designation"
											value={designation}
											onChange={(e) => setDesignation(e.target.value)}
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<MdOutlineWork />
													</InputAdornment>
												),
											}}
										/>
									</Grid>
									<Grid item size={{xs: 12}}>
										{!image ? (
											<TextField
												variant="outlined"
												type="file"
												InputLabelProps={{ shrink: true }}
												inputProps={{ accept: "image/*" }}
												fullWidth
												required
												onBlur={() => handleErr("image")}
												error={err.errIn === "image" ? true : false}
												label={err.errIn === "image" ? err.msg : "Reviewer Image"}
												onChange={(e) => imgUpload(e.target.files[0])}
												InputProps={{
													startAdornment: (
														<InputAdornment position="start">
															<MdImage />
														</InputAdornment>
													),
												}}
											/>
										) : (
											<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
												<img src={image} alt="Reviewer" style={{ maxHeight: '150px', maxWidth: '100%', borderRadius: '8px', marginBottom: '10px' }} />
												<Button 
													variant="contained" 
													color="error" 
													onClick={handleRemoveImage}
													startIcon={<MdClearAll />}
												>
													Remove Image
												</Button>
											</Box>
										)}
									</Grid>
									<Grid item size={{xs: 12}}>
										<TextField
											variant="outlined"
											required
											fullWidth
											multiline
											rows={4}
											onBlur={() => handleErr("review")}
											error={err.errIn === "review" ? true : false}
											label={err.errIn === "review" ? err.msg : "Review"}
											placeholder="Enter the review content"
											value={review}
											onChange={(e) => setReview(e.target.value)}
											InputProps={{
												startAdornment: (
													<InputAdornment position="start">
														<MdDescription />
													</InputAdornment>
												),
											}}
										/>
									</Grid>
									<Grid item size={{xs: 12, sm: 6}}>
										<Box sx={{ display: 'flex', alignItems: 'center' }}>
											<InputLabel sx={{ mr: 2 }}>Rating</InputLabel>
											<Rating
												name="rating"
												value={Number(rating)}
												onChange={(event, newValue) => {
													setRating(String(newValue));
												}}
												icon={<MdStar style={{ fontSize: 30 }} />}
												emptyIcon={<MdStar style={{ fontSize: 30, opacity: 0.3 }} />}
											/>
											<Typography sx={{ ml: 1 }}>{rating}/5</Typography>
										</Box>
									</Grid>
									<Grid item size={{xs: 12, sm: 6}}>
										<FormControlLabel
											control={
												<Switch
													checked={live === "true"}
													onChange={(e) => setLive(e.target.checked ? "true" : "false")}
													color="primary"
												/>
											}
											label="Display Review (Live)"
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
												{id ? "Update Review" : "Add Review"}
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
								Existing Reviews
							</Typography>
							<Divider sx={{ mb: 2 }} />
							<Table>
								<TableHead>
									<TableRow>
										<TableCell component="th" scope="row">
											Reviewer Name
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{allReviews.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
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
												{data.name}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TablePagination
											rowsPerPageOptions={[5, 10, 25]}
											count={allReviews.length}
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
