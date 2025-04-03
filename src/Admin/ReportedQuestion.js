import React, { useRef, useEffect, useState } from "react";
import {
	makeStyles,
	Grid,
	Chip,
	Typography,
	Button,
	ExpansionPanelDetails,
	Container,
	ExpansionPanel,
	ExpansionPanelSummary,
} from "@material-ui/core";
import { FcExpand, FcFullTrash } from "react-icons/fc";
import NoContent from "../Components/NoContent";
import axios from "axios";
import MySnackbar from "../Components/MySnackbar";
import ReactHtmlParser from "react-html-parser";

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: "33.33%",
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
	divider: {
		margin: theme.spacing(0),
	},
	img: {
		maxWidth: "100%",
		maxHeight: "100%",
		display: "block",
	},
}));
function ReportedQuestion() {
	const [data, setData] = useState([]);
	const classes = useStyles();
	useEffect(() => {
		axios
			.get("/api/private/qreport/getall")
			.then((res) => setData(res.data))
			.catch((err) => console.log(err));
	}, []);
	const snackRef = useRef();
	const handleDelete = (id) => {
		axios
			.get(`/api/private/qreport/update/${id}`)
			.then((res) => snackRef.current.handleSnack(res.data))
			.catch((err) => console.log(err));
		setTimeout(function () {
			window.location.reload();
		}, 4000);
	};
	return (
		<div>
			<Container>
				<br />
				<center>
					<Chip label="Reported Question List" color="primary" />
				</center>

				<br />
				{data.length === 0 ? (
					<NoContent msg="Enjoy !  No reported Question available." />
				) : (
					data.map((d, i) => (
						<ExpansionPanel key={i}>
							<ExpansionPanelSummary expandIcon={<FcExpand />} aria-controls="panel1a-content" id="panel1a-header">
								<Typography className={classes.heading}>{d.date} </Typography>
								<Typography className={classes.secondaryHeading}>Issue: {d.issue}</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<Grid container>
									<Grid item xs={12} md={4}>
										<ul>
											<li>
												Course <b> {d.course[0] && d.course[0].courseTitle} </b>
											</li>
											<li>
												Subject <b> {d.subject[0] && d.subject[0].subjectTitle} </b>
											</li>
											<li>
												Chapter <b> {d.chapter[0] && d.chapter[0].chapterTitle} </b>
											</li>
											<li>
												Level : <b> {d.level} </b>
											</li>
											<li>
												MaxTime : <b> {d.maxTime} Sec </b>
											</li>
											<li>
												Correct Option : <b>{d.correctOption}</b>
											</li>
										</ul>
									</Grid>

									<Grid item xs={12} md={8} style={{ borderLeft: "1px solid royalblue", paddingLeft: 10 }}>
										<Typography gutterBottom align="center">
											<b> Question</b>
										</Typography>
										{d.image && <img src={d.image} className={classes.img} alt="Solution" />}
										{ReactHtmlParser(d.questionTitle)}
										<ol>
											{d.options.map((o) => (
												<li key={o.number}> {o.title} </li>
											))}
										</ol>
									</Grid>
									<Grid item xs={12}>
										<Typography gutterBottom align="center">
											<b> Solution</b>
										</Typography>
										{d.solImage && <img src={d.solImage} className={classes.img} alt="Solution" />}

										{ReactHtmlParser(d.solTitle)}
										<br />
										<center>
											<Button color="secondary" endIcon={<FcFullTrash />} size="small" variant="outlined" onClick={() => handleDelete(d.reportId)}>
												Issue Solved
											</Button>
										</center>
									</Grid>
								</Grid>
							</ExpansionPanelDetails>
						</ExpansionPanel>
					))
				)}
			</Container>
			<MySnackbar ref={snackRef} />
		</div>
	);
}

export default ReportedQuestion;
