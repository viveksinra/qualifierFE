import React from "react";
import {
	makeStyles,
	ExpansionPanel,
	ExpansionPanelSummary,
	Button,
	ExpansionPanelDetails,
	Table,
	TableContainer,
	TableRow,
	Typography,
	TableBody,
	TableCell,
} from "@material-ui/core";
import { MdExpandMore, MdLock } from "react-icons/md";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		marginTop: theme.spacing(),
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		fontWeight: theme.typography.fontWeightRegular,
	},
	grow: {
		flexGrow: 1,
	},
}));

export default function CourseHome({ data, match }) {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			{data.sub &&
				data.sub.map((s, k) => (
					<ExpansionPanel key={k}>
						<ExpansionPanelSummary expandIcon={<MdExpandMore />} aria-controls="course-data" id="course-data">
							<Typography className={classes.heading}>{s.subjectTitle}</Typography>
							<span className={classes.grow} />
							<Link to={`/practice/${match.params.catlink}/${match.params.corslink}/${s.link}`}>
								<Button color="primary">Start</Button>
							</Link>
						</ExpansionPanelSummary>
						{s.chap &&
							s.chap.map((c, i) => (
								<ExpansionPanelDetails key={i}>
									<TableContainer>
										<Table size="small" style={{ maxWidth: 1040, marginLeft: "auto", marginRight: "auto" }} aria-label="Chapter List">
											<TableBody>
												<TableRow>
													<TableCell>{c.chapterTitle}</TableCell>
													<TableCell align="right">
														{c.lock ? (
															<Link to={"/pricing"}>
																<Button color="primary" size="small" disabled={c.lock} endIcon={<MdLock />}>
																	Unlock
																</Button>
															</Link>
														) : (
															<Link to={`/practice/${match.params.catlink}/${match.params.corslink}/${s.link}/${c.link}`}>
																<Button size="small" color="primary" disabled={c.lock}>
																	Start
																</Button>
															</Link>
														)}
													</TableCell>
												</TableRow>
											</TableBody>
										</Table>
									</TableContainer>
								</ExpansionPanelDetails>
							))}
					</ExpansionPanel>
				))}
		</div>
	);
}
