import React, { useContext, useState } from "react";
import { Grid, TextField, FormControlLabel, Switch, Tooltip, Fab } from "@mui/material";
import { QuesContext } from "../../../Components/Context/AddQuesContext/QuestionContext";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axios from "axios";
import { MdCloudDone } from "react-icons/md";

export default function Section3() {
	const { Qstate, Qdispatch } = useContext(QuesContext);
	const [html, switchHtml] = useState(false);
	return (
		<Grid container spacing={2} justify="center">
			<Grid item xs={6}>
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
			<Grid item xs={6}>
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
			<Grid item xs={12}>
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
					<CKEditor
						editor={ClassicEditor}
						data={Qstate.solTitle}
						onChange={(event, editor) => {
							const data = editor.getData();
							Qdispatch({ type: "SETSOL", payload: data });
						}}
					/>
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
