import React, { useContext, useState, useEffect } from "react";
import { Grid, TextField, MenuItem, FormControlLabel, Switch } from "@mui/material";
import { QuesContext } from "../../../Components/Context/AddQuesContext/QuestionContext";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default function Section2() {
	const { Qstate, Qdispatch } = useContext(QuesContext);
	const [html, switchHtml] = useState(false);
	const [editorStates, setEditorStates] = useState([]);

	useEffect(() => {
		const states = Qstate.options.map(option => {
			if (option.title) {
				const contentBlock = htmlToDraft(option.title);
				if (contentBlock) {
					const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
					return EditorState.createWithContent(contentState);
				}
			}
			return EditorState.createEmpty();
		});
		setEditorStates(states);
	}, []);

	const onEditorStateChange = (index, newEditorState) => {
		const newStates = [...editorStates];
		newStates[index] = newEditorState;
		setEditorStates(newStates);

		const htmlContent = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));
		let newArr = [...Qstate.options];
		newArr[index] = { ...newArr[index], title: htmlContent };
		Qdispatch({ type: "SETOPTION", payload: newArr });
	};

	return (
		<Grid container spacing={2} justify="center">
			<Grid item size={{xs: 12}} >
				<FormControlLabel
					control={<Switch checked={html} onChange={() => switchHtml(!html)} name="checkedA" />}
					label={html ? "HTML Mode" : "Editor Mode"}
				/>
			</Grid>

			{Qstate.options.map((d, i) => (
				<Grid item size={{xs: 12, md: 6}} key={i}>
					{html ? (
						<TextField
							variant="outlined"
							required={i === 4 ? false : true}
							fullWidth
							multiline
							rows={3}
							label={`Option - ${i + 1}`}
							placeholder={i === 4 ? "If you want 5th option also, then write here, otherwise leave it" : "Type Option here..."}
							value={d.title}
							onChange={(e) => {
								let newArr = [...Qstate.options];
								newArr[i] = { ...newArr[i], title: e.target.value };
								Qdispatch({ type: "SETOPTION", payload: newArr });
							}}
						/>
					) : (
						<div style={{ border: '1px solid #F1F1F1', minHeight: '100px', borderRadius: '2px', backgroundColor: '#F1F1F1' }}>
							{editorStates[i] && (
								<Editor
									editorState={editorStates[i]}
									wrapperClassName="demo-wrapper"
									editorClassName="demo-editor"
									onEditorStateChange={(newState) => onEditorStateChange(i, newState)}
									toolbar={{
										options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'link', 'embedded', 'emoji', 'image', 'history'],
										inline: { inDropdown: false },
										list: { inDropdown: true },
										textAlign: { inDropdown: true },
									}}
								/>
							)}
						</div>
					)}
				</Grid>
			))}
			<Grid item size={{xs: 6}} className="center">
				<TextField
					variant="outlined"
					required
					select
					fullWidth
					label="Correct Option"
					value={Qstate.correctOption}
					onChange={(e) => Qdispatch({ type: "SETCORRECTOPT", payload: e.target.value })}
				>
					<MenuItem key="1" value={1}>
						Option - 1
					</MenuItem>
					<MenuItem key="2" value={2}>
						Option - 2
					</MenuItem>
					<MenuItem key="3" value={3}>
						Option - 3
					</MenuItem>
					<MenuItem key="4" value={4}>
						Option - 4
					</MenuItem>
					<MenuItem key="5" value={5}>
						Option - 5
					</MenuItem>
				</TextField>
			</Grid>
			<Grid item size={{xs: 6}}>
				<TextField
					variant="outlined"
					required
					select
					fullWidth
					label="Level"
					value={Qstate.level}
					onChange={(e) => Qdispatch({ type: "SETLEVEL", payload: e.target.value })}
				>
					<MenuItem key="1" value="Very Easy">
						Very Easy
					</MenuItem>
					<MenuItem key="2" value="Easy">
						Easy
					</MenuItem>
					<MenuItem key="3" value="Medium">
						Medium
					</MenuItem>
					<MenuItem key="4" value="Hard">
						Hard
					</MenuItem>
					<MenuItem key="5" value="Very Hard">
						Very Hard
					</MenuItem>
				</TextField>
			</Grid>
			<Grid item size={{xs: 6}}>
				<TextField
					variant="outlined"
					fullWidth
					required
					type="number"
					inputProps={{ min: "10" }}
					placeholder="Maximum time to solve (in second)"
					label="Max Time in Sec"
					value={Qstate.maxTime}
					onChange={(e) => Qdispatch({ type: "SETMAXTIME", payload: e.target.value })}
				/>
			</Grid>
			<Grid item size={{xs: 6}}>
				<TextField
					variant="outlined"
					fullWidth
					inputProps={{ maxLength: "30" }}
					label="Highlight"
					placeholder="[Questin Year / Exam Name]"
					value={Qstate.highlight}
					onChange={(e) => Qdispatch({ type: "SETHIGHLIGHT", payload: e.target.value })}
				/>
			</Grid>
			<Grid item size={{xs: 6}}>
				<TextField
					variant="outlined"
					fullWidth
					label="Hint (if any)"
					placeholder="Any hint for the question..."
					value={Qstate.hint}
					onChange={(e) => Qdispatch({ type: "SETHINT", payload: e.target.value })}
				/>
			</Grid>
		</Grid>
	);
}
