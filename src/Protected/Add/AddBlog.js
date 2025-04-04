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
	Switch,
	RadioGroup,
	Radio,
	FormControlLabel,
	TableCell,
	TableBody,
	TableFooter,
	TablePagination,
	Input,
	Divider,
	Autocomplete,
	Button
} from "@mui/material";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { MdSearch, MdDoneAll, MdClearAll, MdPanorama, MdLock, MdPublic, MdDeleteForever } from "react-icons/md";

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

const InputInput = styled(Input)(({ theme }) => ({
	padding: theme.spacing(1, 1, 1, 0),
	paddingLeft: `calc(1em + ${theme.spacing(4)})`,
	width: '100%'
}));

export default function AddBlog() {
	const [id, setId] = useState("");
	const [text, setText] = useState("");
	const [title, setTitle] = useState("");
	const [category, setCategory] = useState({ catgName: "" });
	const [live, setLive] = useState(true);
	const [tags, setTags] = useState([]);
	const [image, setImage] = useState("");
	const [link, setLink] = useState("");
	const [type, setType] = useState("blogs");
	const [allCat, setAllCat] = useState([]);
	const [allBlog, setAllBlog] = useState([]);
	const [allTags, setAllTags] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [html, switchHtml] = useState(false);
	const [err] = useState({ errIn: "", msg: "" });
	const snackRef = useRef();
	useEffect(() => {
		axios
			.get(`/api/blog/blogcat/get`)
			.then((res) => setAllCat(res.data))
			.catch((err) => console.log(err));
		axios
			.get(`/api/blog/addtag/get`)
			.then((res) => setAllTags(res.data))
			.catch((err) => console.log(err));
		getData("");
	}, []);
	const getData = async (word) => {
		await axios
			.get(`/api/blog/addblog/getall/${word}`)
			.then((res) => setAllBlog(res.data))
			.catch((err) => console.log(err));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		let newBlog = { _id: id, text, link, img: image, live, title, type, category, tags };
		await axios
			.post(`/api/blog/addblog/${id}`, newBlog)
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
		setCategory({ catgName: "" });
		setType("blogs");
		setTags([]);
		setLive(true);
		setImage("");
		setText("");
	};
	const setData = async (id) => {
		await axios
			.get(`/api/blog/addblog/get/${id}`)
			.then((res) => {
				setId(res.data[0]._id);
				setText(res.data[0].text);
				setTitle(res.data[0].title);
				setCategory(res.data[0].category);
				setType(res.data[0].type);
				setLink(res.data[0].link);
				setLive(res.data[0].live);
				setTags(res.data[0].tags);
				setImage(res.data[0].img);
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
	const handleDelete = (id) => {
		axios
			.delete(`/api/blog/delete/${id}`)
			.then((res) => alert(res.data.message))
			.then(() => getData(""))
			.catch((err) => console.log(err));
		handleClear();
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
					<Paper sx={{
                        padding: theme => theme.spacing(2),
                        margin: theme => theme.spacing(1),
                        backgroundColor: theme => theme.palette.background.paper
                    }}>
						<form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: "100vw" }}>
							<Grid container spacing={2}>
								<Grid item xs={4}>
									<RadioGroup aria-label="position" value={type} onChange={(e) => setType(e.target.value)} name="position" row>
										<FormControlLabel value="blogs" control={<Radio color="primary" />} label="Blogs" labelPlacement="end" />
										<FormControlLabel value="news" control={<Radio color="primary" />} label="News" labelPlacement="end" />
									</RadioGroup>
								</Grid>
								<Grid item xs={4}>
									<center>
										<Chip color="primary" label={`Add ${type}`} />
									</center>
								</Grid>
								<Grid item xs={4}>
									{live ? (
										<Fab
											style={{ float: "right", fontSize: "x-large" }}
											size="small"
											onClick={() => setLive(false)}
											color="secondary"
											aria-label="Lock"
										>
											<MdPublic />
										</Fab>
									) : (
										<Fab
											style={{ float: "right", fontSize: "x-large" }}
											size="small"
											onClick={() => setLive(true)}
											color="secondary"
											aria-label="Lock"
										>
											<MdLock />
										</Fab>
									)}
								</Grid>
								<Grid item xs={6}>
									<TextField variant="outlined" required fullWidth label="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
								</Grid>
								<Grid item xs={6}>
									<Autocomplete
										options={allCat}
										getOptionLabel={(option) => option.catgName}
										onChange={(e, v) => {
											setCategory(v);
										}}
										value={category}
										renderInput={(params) => <TextField {...params} required label="Select Category" variant="outlined" fullWidth />}
									/>
								</Grid>
								<Grid item xs={12}>
									<Autocomplete
										options={allTags}
										getOptionLabel={(option) => option.keyword}
										multiple
										onChange={(e, v) => {
											setTags(v);
										}}
										value={tags}
										renderInput={(params) => <TextField {...params} label="Select Tags" variant="outlined" fullWidth />}
									/>
								</Grid>
								<Grid item xs={6}>
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
								<Grid item xs={6}>
									<TextField
										variant="outlined"
										fullWidth
										label="Link"
										required
										placeholder="SSC-CGL-Exam-2020"
										helperText="Do not use space in link"
										value={link}
										onChange={(e) => setLink(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<FormControlLabel
										control={<Switch checked={html} onChange={() => switchHtml(!html)} name="checkedA" />}
										label={html ? "HTML Mode" : "Editor Mode"}
									/>
									{html ? (
										<TextField
											variant="filled"
											fullWidth
											rows={10}
											multiline
											required
											placeholder="Paste Your HTML Code here"
											helperText="You may use wordhtml.com"
											value={text}
											onChange={(e) => setText(e.target.value)}
										/>
									) : (
										<CKEditor
											editor={ClassicEditor}
											data={text}
											onChange={(event, editor) => {
												const data = editor.getData();
												setText(data);
											}}
										/>
									)}
								</Grid>

								<Grid item xs={12}>
									<Divider />
								</Grid>
								<Grid item xs={12}>
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
										{id !== "" && (
											<Tooltip title="Delete Forever">
												<Fab size="small" color="secondary" onClick={() => handleDelete(id)} sx={{ margin: theme => theme.spacing(1) }}>
													<MdDeleteForever />
												</Fab>
											</Tooltip>
										)}
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
				<Grid item xs={12} md={3}>
					{/* Search Section */}
					<SearchDiv>
						<SearchIconWrapper>
							<MdSearch />
						</SearchIconWrapper>
						<InputInput
							placeholder="Search Blog..."
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
								{allBlog.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
									<TableRow key={data._id} onClick={() => setData(data._id)} hover>
										<TableCell component="td" scope="row">
											Title : {data.title} <br />
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										count={allBlog.length}
										rowsPerPage={rowsPerPage}
										page={page}
										onPageChange={(e, page) => setPage(page)}
										onRowsPerPageChange={(r) => setRowsPerPage(r.target.value)}
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
