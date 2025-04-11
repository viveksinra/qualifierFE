import React, { useContext, useState, useEffect, Suspense } from "react";
import { Grid, TextField, FormControlLabel, Switch, Tooltip, Fab, CircularProgress, Autocomplete } from "@mui/material";
import { QuesContext } from "../../../Components/Context/AddQuesContext/QuestionContext";
// Import Draft.js and the WYSIWYG editor
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { imgUpload } from "./Section3";
import axios from "axios";
import { MdPanorama } from "react-icons/md";

export default function Section1() {
	const { Qstate, Qdispatch } = useContext(QuesContext);
	const [html, switchHtml] = useState(false);
	// Initialize editor state
	const [editorState, setEditorState] = useState(() => {
		if (Qstate.title) {
			const contentBlock = htmlToDraft(Qstate.title);
			if (contentBlock) {
				const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
				return EditorState.createWithContent(contentState);
			}
		}
		return EditorState.createEmpty();
	});

	// Handle editor state changes
	const onEditorStateChange = (newEditorState) => {
		setEditorState(newEditorState);
		const htmlContent = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));
		Qdispatch({ type: "SETQUES", payload: htmlContent });
	};

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
				<Grid item size={{xs: 6 }}>
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
				<Grid item size={{xs: 6 }}>
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
						<div style={{ border: '1px solid #F1F1F1', minHeight: '300px', borderRadius: '2px', backgroundColor: '#F1F1F1' }}>
							<Editor
								editorState={editorState}
								wrapperClassName="demo-wrapper"
								editorClassName="demo-editor"
								onEditorStateChange={onEditorStateChange}
								toolbar={{
									options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'history'],
									inline: { inDropdown: false },
									list: { inDropdown: true },
									textAlign: { inDropdown: true },
								}}
							/>
						</div>
					)}
				</Grid>
			</Grid>
		</Suspense>
	);
}
