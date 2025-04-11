import React, { useContext, useState, useEffect } from "react";
import { Grid, TextField, FormControlLabel, Switch, Tooltip, Fab } from "@mui/material";
import { QuesContext } from "../../../Components/Context/AddQuesContext/QuestionContext";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from "axios";
import { MdCloudDone } from "react-icons/md";

export default function Section3() {
	const { Qstate, Qdispatch } = useContext(QuesContext);
	const [html, switchHtml] = useState(false);
	const [editorState, setEditorState] = useState(() => {
		if (Qstate.solTitle) {
			const contentBlock = htmlToDraft(Qstate.solTitle);
			if (contentBlock) {
				const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
				return EditorState.createWithContent(contentState);
			}
		}
		return EditorState.createEmpty();
	});

	const onEditorStateChange = (newEditorState) => {
		setEditorState(newEditorState);
		const htmlContent = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));
		Qdispatch({ type: "SETSOL", payload: htmlContent });
	};
	
	return (
		<Grid container spacing={2} justify="center">
			<Grid item size={{xs: 6 }}>
				<TextField
					variant="outlined"
					type="file"
					InputLabelProps={{ shrink: true }}
					inputProps={{ accept: "image/*" }}
					fullWidth
					label="Solution Image"
					onChange={(e) => imgUpload(e.target.files[0], "Simage", Qdispatch)}
				/>
			</Grid>
			<Grid item size={{xs: 6 }}>
				<FormControlLabel
					control={<Switch checked={html} onChange={() => switchHtml(!html)} name="checkedA" />}
					label={html ? "HTML Mode" : "Editor Mode"}
				/>

				{Qstate.solImage !== "" && (
					<a href={Qstate.solImage} target="_blank" rel="noopener noreferrer">
						<Tooltip title="Solution Image">
							<Fab size="small" color="secondary">
								<MdCloudDone />
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
						placeholder="Paste HTML Code for Solution"
						helperText="You may use wordhtml.com"
						value={Qstate.solTitle}
						onChange={(e) => Qdispatch({ type: "SETSOL", payload: e.target.value })}
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
	);
}

export const imgUpload = async (e, name, Qdispatch) => {
	if (e) {
		const selectedFile = e;
		const imgData = new FormData();
		imgData.append("photo", selectedFile, selectedFile.name);
		if (name === "Qimage") {
			await axios
				.post(`/api/other/fileupload/upload`, imgData, {
					headers: {
						accept: "application/json",
						"Accept-Language": "en-US,en;q=0.8",
						"Content-Type": `multipart/form-data; boundary=${imgData._boundary}`,
					},
				})
				.then((res) => Qdispatch({ type: "SETIMG", payload: { link: res.data.result.secure_url, img: "question" } }))
				.catch((err) => console.log(err));
		} else if (name === "Simage") {
			await axios
				.post(`/api/other/fileupload/upload`, imgData, {
					headers: {
						accept: "application/json",
						"Accept-Language": "en-US,en;q=0.8",
						"Content-Type": `multipart/form-data; boundary=${imgData._boundary}`,
					},
				})
				.then((res) => Qdispatch({ type: "SETIMG", payload: { link: res.data.result.secure_url, img: "solution" } }))
				.catch((err) => console.log(err));
		}
	}
};
