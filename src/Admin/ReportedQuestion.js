import React, { useRef, useEffect, useState } from "react";
import {
	Grid,
	Chip,
	Typography,
	Button,
	AccordionDetails,
	Container,
	Accordion,
	AccordionSummary,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { FcExpand, FcFullTrash } from "react-icons/fc";
import NoContent from "../Components/NoContent";
import axios from "axios";
import MySnackbar from "../Components/MySnackbar";
import parse from "html-react-parser";

const StyledHeadingTypography = styled(Typography)(({ theme }) => ({
	fontSize: theme.typography.pxToRem(15),
	flexBasis: "33.33%",
	flexShrink: 0,
}));

const StyledSecondaryHeadingTypography = styled(Typography)(({ theme }) => ({
	fontSize: theme.typography.pxToRem(15),
	color: theme.palette.text.secondary,
}));

const StyledImg = styled('img')(({ theme }) => ({
	maxWidth: "100%",
	maxHeight: "100%",
	display: "block",
}));

function ReportedQuestion() {
	const [data, setData] = useState([]);
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
						<Accordion key={i}>
							<AccordionSummary expandIcon={<FcExpand />} aria-controls="panel1a-content" id="panel1a-header">
								<StyledHeadingTypography>{d.date} </StyledHeadingTypography>
								<StyledSecondaryHeadingTypography>Issue: {d.issue}</StyledSecondaryHeadingTypography>
							</AccordionSummary>
							<AccordionDetails>
								<Grid container>
									<Grid item size={{xs: 12,md: 4 }} >
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

									<Grid item size={{xs: 12, md:8 }}  style={{ borderLeft: "1px solid royalblue", paddingLeft: 10 }}>
										<Typography gutterBottom align="center">
											<b> Question</b>
										</Typography>
										{d.image && <StyledImg src={d.image} alt="Solution" />}
										{parse(d.questionTitle)}
										<ol>
											{d.options.map((o) => (
												<li key={o.number}> {o.title} </li>
											))}
										</ol>
									</Grid>
									<Grid item size={{xs: 12}} >
										<Typography gutterBottom align="center">
											<b> Solution</b>
										</Typography>
										{d.solImage && <StyledImg src={d.solImage} alt="Solution" />}

										{parse(d.solTitle)}
										<br />
										<center>
											<Button color="secondary" endIcon={<FcFullTrash />} size="small" variant="outlined" onClick={() => handleDelete(d.reportId)}>
												Issue Solved
											</Button>
										</center>
									</Grid>
								</Grid>
							</AccordionDetails>
						</Accordion>
					))
				)}
			</Container>
			<MySnackbar ref={snackRef} />
		</div>
	);
}

export default ReportedQuestion;
