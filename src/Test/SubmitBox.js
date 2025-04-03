import React, { useContext, useState, useEffect } from "react";
import { SUBMITBOX } from "../Components/Context/types";
import { TestContext } from "../Components/Context/TestContext/TestContext";
import {
	Dialog,
	DialogActions,
	DialogContent,
	Button,
	Table,
	TableHead,
	TableRow,
	TableBody,
	TableCell,
	Typography,
	CircularProgress,
} from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";

// const quesStyle = makeStyles((theme) => ({
// 	qArea: {
// 		background: "#fff",
// 		margin: theme.spacing(11, 2, 0),
// 		fontFamily: "sans-serif",
// 		display: "block",
// 		color: "#000",
// 		height: `calc(100vh - ${210}px)`,
// 	},
// 	options: {
// 		margin: theme.spacing(2),
// 	},
// 	img: {
// 		maxWidth: "100%",
// 		maxHeight: "100%",
// 		display: "block",
// 	},
// }));

function SubmitBox() {
	// const classes = quesStyle();
	const { Tstate, Tdispatch } = useContext(TestContext);
	const [data, setData] = useState([{ sec: "", noQues: 0, A: 0, NA: 0, MR: 0, NV: 0 }]);
	const [loading, setLoading] = useState(false);
	const [goReport, setGoR] = useState(false);
	useEffect(() => {
		if (Tstate.submitBox) {
			let arr = [];
			Tstate.sections.map((s) => {
				let A = 0,
					NA = 0,
					MR = 0,
					NV = 0;
				s.questions.map((q) => {
					switch (q.status) {
						case "NV":
							return NV++;
						case "A":
							return A++;
						case "M":
							return MR++;
						case "MA":
							return MR++;
						case "NA":
							return NA++;
						default:
							return null;
					}
				});
				return arr.push({ sec: s.title, noQues: s.questions.length, A, NA, MR, NV });
			});
			setData(arr);
		}
	}, [Tstate.sections, Tstate.submitBox]);
	const submitTest = async () => {
		setLoading(true);
		await axios
			.post("/api/bigtest/testresponse", Tstate)
			.then(() => {
				Tdispatch({ type: SUBMITBOX });
				setLoading(false);
				setGoR(true);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};

	if (goReport) {
		return <Redirect to={`/test/${Tstate.TseriesLink}/${Tstate.testLink}/report`} />;
	} else
		return (
			<div>
				<Dialog maxWidth="lg" open={Tstate.submitBox} onClose={() => Tdispatch({ type: SUBMITBOX })} aria-labelledby="submit-box">
					<DialogContent>
						<Typography align="center" gutterBottom variant="h6" color="primary">
							{loading ? "Please Wait... Submiting your test" : "Submit your test"}
						</Typography>
						{loading ? (
							<div className="center">
								<CircularProgress />
							</div>
						) : (
							<Table size="small" aria-label="Submit-table">
								<TableHead>
									<TableRow>
										<TableCell>
											<Typography variant="subtitle1" color="secondary">
												Section
											</Typography>
										</TableCell>
										<TableCell align="right">
											<Typography variant="subtitle1" color="secondary">
												Total Questions
											</Typography>
										</TableCell>
										<TableCell align="right">
											<Typography variant="subtitle1" color="secondary">
												Answered
											</Typography>
										</TableCell>
										<TableCell align="right">
											<Typography variant="subtitle1" color="secondary">
												Not&nbsp;Answered
											</Typography>
										</TableCell>
										<TableCell align="right">
											<Typography variant="subtitle1" color="secondary">
												Marked&nbsp;for&nbsp;Review
											</Typography>
										</TableCell>
										<TableCell align="right">
											<Typography variant="subtitle1" color="secondary">
												Not&nbsp;Visited
											</Typography>
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{data.map((r) => (
										<TableRow key={r.sec}>
											<TableCell component="th" scope="row">
												{r.sec}
											</TableCell>
											<TableCell align="center">{r.noQues}</TableCell>
											<TableCell align="center">{r.A}</TableCell>
											<TableCell align="center">{r.NA}</TableCell>
											<TableCell align="center">{r.MR}</TableCell>
											<TableCell align="center">{r.NV}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						)}
					</DialogContent>
					<DialogActions>
						<Button onClick={() => Tdispatch({ type: SUBMITBOX })} color="primary">
							Close
						</Button>

						<Button color="primary" onClick={submitTest} size="small" variant="contained">
							Submit
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
}

export default SubmitBox;
