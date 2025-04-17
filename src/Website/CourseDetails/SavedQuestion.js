import React, { Fragment, useState, useEffect, useRef } from "react";
import { OptionNo } from "../../img/numbers/numbers";
import {
	Card,
	CardHeader,
	CardContent,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	TextField,
	Typography,
	Tabs,
	Tab,
	CircularProgress,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import MySnackbar from "../../Components/MySnackbar";
import parse from "html-react-parser";

import { MdBookmark, MdExpandMore } from "react-icons/md";
import Autocomplete from "@mui/material/Autocomplete";
import NoContent from "../../Components/NoContent";
import { isQualifier } from "../../theme";

const QCard = styled(Card)(({ theme }) => ({
	minHeight: 170,
	border: "1px solid rgba(33,150,243,0.25)",
	[`@media (min-width:${theme.breakpoints.values.md}px)`]: {
		padding: theme.spacing(2),
	},
}));



const OptList = styled(ListItem)(({ theme }) => ({
	"&:hover": {
		backgroundColor: theme.palette.grey[300],
		borderRadius: "10px",
		color: "#0f84dd",
		cursor: "grab",
	},
}));

export default function SavedQuestion({ link }) {
	const [allData, setAllData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [tabVal, setTabVal] = useState(0);
	const [allCourses, setAllCourses] = useState([]);
	const [course, setCourse] = useState(null);
	const [courseLink, setCourseLink] = useState(link);
	const snackRef = useRef();

	useEffect(() => {
		document.title = "Saved Questions | " +  isQualifier ? "Test Platform" : "Risk Hawk : Test Platform";

		setLoading(true);
		if (courseLink) {
			getData(`/api/report/savedquest/${tabVal}/${courseLink}`);
		} else getData(`/api/report/savedquest/${tabVal}`);
	}, [courseLink, course, tabVal]);

	useEffect(() => {
		axios
			.get(`/api/test/course/allcourse/`)
			.then((res) => {
				setLoading(false);
				setAllCourses(res.data);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	}, []);

	const getData = (url) => {
		axios
			.get(url)
			.then((res) => {
				setAllData(res.data);
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
			});
	};

	const handleSubmit = (ans, i) => {
		if (+ans === allData[i].correctOption) {
			snackRef.current.handleSnack({ message: "Congratulation! You are right.", variant: "success" });
		} else {
			snackRef.current.handleSnack({ message: "Oo no! Wrong. Try Again.", variant: "error" });
		}
	};

	return (
		<Fragment>
			<Grid container>
				<Grid item>
					<Tabs
						value={tabVal}
						onChange={(e, v) => setTabVal(v)}
						indicatorColor="secondary"
						textColor="primary"
						variant="fullWidth"
						aria-label="Filters"
					>
						<Tab label="newest" />
						<Tab label="oldest" />
					</Tabs>
				</Grid>
				<span style={{ flexGrow: 1 }} />
				<Grid item size={{xs: 6, md: 4}}>
					<Autocomplete
						options={allCourses}
						getOptionLabel={(option) => option.courseTitle}
						onChange={(e, v) => {
							setCourse(v);
							if (v) {
								setCourseLink(v.link);
							}
						}}
						value={course}
						style={{ marginBottom: "10px" }}
						renderInput={(params) => <TextField margin="dense" {...params} placeholder="Type Course name..." label="Select Course" fullWidth />}
					/>
				</Grid>
			</Grid>
			{loading ? (
				<center>
					<CircularProgress sx={{ mt: 20 }} />
				</center>
			) : allData.length !== 0 ? (
				<Grid container spacing={2}>
					{allData.map((q, qi) => (
						<Grid item size={{xs: 12}} key={q.qid}>
							<QCard>
								<CardHeader
									avatar={<img style={{ width: 40 }} alt={q.number} src={q.avatar} />}
									action={
										<Typography>
											{`${q.number}`}
											<IconButton color="primary" aria-label="saved">
												<MdBookmark />
											</IconButton>
										</Typography>
									}
									title={q.address}
									subheader={`Saved Date : ${q.savedDate}`}
								/>
								<Accordion elevation={0}>
									<AccordionSummary expandIcon={<MdExpandMore />} aria-controls="panel1a-content">
										<CardContent>{parse(q.question)}</CardContent>
									</AccordionSummary>
									<AccordionDetails>
										<List style={{ width: "100%" }}>
											{q.options &&
												q.options.map((o, i) => (
													<OptList key={i} onClick={() => (q.submitted !== true ? handleSubmit(o.number, qi) : null)}>
														<ListItemIcon>
															<OptionNo index={i} />
														</ListItemIcon>
														<ListItemText primary={o.title} />
														{/* {q.submitted ? <AnsIcon ans="right" /> : <AnsIcon ans="wrong" />}
													{q.submitted === true &&
														+o.correctOption !==
															+o.ansGiven(
																<ListItemIcon>
																	<AnsIcon ans="wrong" />
																</ListItemIcon>,
															)} */}
													</OptList>
												))}
										</List>
									</AccordionDetails>
								</Accordion>
							</QCard>
						</Grid>
					))}
				</Grid>
			) : (
				<NoContent msg="No Saved Question" />
			)}

			<MySnackbar ref={snackRef} />
		</Fragment>
	);
}
