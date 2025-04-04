import React, { useContext, useState, useEffect, Suspense } from "react";
import { Grid, TextField, FormControlLabel, Switch, Tooltip, Fab, CircularProgress, Autocomplete } from "@mui/material";
import { QuesContext } from "../../../Components/Context/AddQuesContext/QuestionContext";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { imgUpload } from "./Section3";
import axios from "axios";
import { MdPanorama } from "react-icons/md";

export default function Section1() {
	const { Qstate, Qdispatch } = useContext(QuesContext);
	const [html, switchHtml] = useState(false);
	useEffect(() => {
		if (Qstate.category) {
			axios
				.get(`/api/test/course/cat/${Qstate.category.link}`)
				.then((res) => Qdispatch({ type: "SETALLCOURSE", payload: res.data }))
				.catch((err) => console.log(err));
		}
	}, [Qstate.category, Qdispatch]);
	useEffect(() => {
		if (Qstate.course.length !== 0) {
			axios
				.post(`/api/test/subject/cou/body`, { course: Qstate.course })
				.then((res) => Qdispatch({ type: "SETALLSUBJECT", payload: res.data }))
				.catch((err) => console.log(err));
		}
	}, [Qstate.course, Qdispatch]);
	useEffect(() => {
		if (Qstate.subject.length !== 0) {
			axios
				.post(`/api/test/chapter/cou/body`, { subject: Qstate.subject })
				.then((res) => Qdispatch({ type: "SETALLCHAPTER", payload: res.data }))
				.catch((err) => console.log(err));
		}
	}, [Qstate.subject, Qdispatch]);
	return (
		<Suspense
			fallback={
				<div className="center" style={{ minHeight: 400 }}>
					<CircularProgress />
				</div>
			}
		>
			<Grid container spacing={2} justify="center">
				<Grid item size={{xs: 12,  md: 6 }} >
					<Autocomplete
						options={Qstate.allCategory}
						getOptionLabel={(option) => option.categoryTitle}
						onChange={(e, v) => Qdispatch({ type: "SETCATG", payload: v })}
						value={Qstate.category}
						renderInput={(params) => <TextField {...params} label="Select Category" variant="outlined" fullWidth />}
					/>
				</Grid>
				<Grid item size={{xs: 12,  md: 6 }} >
					<Autocomplete
						multiple
						options={Qstate.allCourse}
						noOptionsText="First Select Category"
						filterSelectedOptions
						getOptionLabel={(option) => option.courseTitle}
						onChange={(e, v) => Qdispatch({ type: "SETCOURSE", payload: v })}
						value={Qstate.course}
						renderInput={(params) => <TextField {...params} label="Select Course" variant="outlined" fullWidth />}
					/>
				</Grid>
				<Grid item size={{xs: 12,  md: 6 }} >
					<Autocomplete
						multiple
						options={Qstate.allSubject}
						noOptionsText="First Select Category & Course"
						filterSelectedOptions
						getOptionLabel={(option) => `${option.subjectTitle} ~ ${option.courseTitle}`}
						onChange={(e, v) => Qdispatch({ type: "SETSUBJECT", payload: v })}
						value={Qstate.subject}
						renderInput={(params) => <TextField {...params} label="Select Subject" variant="outlined" fullWidth />}
					/>
				</Grid>
				<Grid item size={{xs: 12,  md: 6 }} >
					<Autocomplete
						multiple
						options={Qstate.allChapter}
						filterSelectedOptions
						noOptionsText="First Select Category, Course & Subject"
						getOptionLabel={(option) => `${option.chapterTitle} ~ ${option.courseTitle}`}
						onChange={(e, v) => Qdispatch({ type: "SETCHAPTER", payload: v })}
						value={Qstate.chapter}
						renderInput={(params) => <TextField {...params} label="Select Chapter" variant="outlined" fullWidth />}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						variant="outlined"
						type="file"
						InputLabelProps={{ shrink: true }}
						inputProps={{ accept: "image/*" }}
						fullWidth
						// onBlur={() => handleErr("Qimage")}
						// error={err.errIn === "Qimage" ? true : false}
						// label={err.errIn === "Qimage" ? err.msg : "Question Image"}
						label="Question Image"
						onChange={(e) => imgUpload(e.target.files[0], "Qimage", Qdispatch)}
					/>
				</Grid>
				<Grid item xs={6}>
					<FormControlLabel
						control={<Switch checked={html} onChange={() => switchHtml(!html)} name="checkedA" />}
						label={html ? "HTML Mode" : "Editor Mode"}
					/>
					{Qstate.image !== "" && (
						<a href={Qstate.image} target="_blank" rel="noopener noreferrer">
							<Tooltip title="Question Image">
								<Fab size="small" color="secondary">
									<MdPanorama />
								</Fab>
							</Tooltip>
						</a>
					)}
				</Grid>
				<Grid item size={{xs: 12}} >
					{html ? (
						<TextField
							variant="filled"
							fullWidth
							rows={15}
							multiline
							required
							placeholder="Paste HTML Code for Question"
							helperText="You may use wordhtml.com"
							value={Qstate.title}
							onChange={(e) => Qdispatch({ type: "SETQUES", payload: e.target.value })}
						/>
					) : (
						<CKEditor
							editor={ClassicEditor}
							data={Qstate.title}
							onChange={(event, editor) => {
								const data = editor.getData();
								Qdispatch({ type: "SETQUES", payload: data });
							}}
						/>
					)}
				</Grid>
			</Grid>
		</Suspense>
	);
}
