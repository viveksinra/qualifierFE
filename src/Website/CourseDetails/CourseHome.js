import React from "react";
import {
	styled,
	Accordion,
	AccordionSummary,
	Button,
	AccordionDetails,
	Table,
	TableContainer,
	TableRow,
	Typography,
	TableBody,
	TableCell,
} from "@mui/material";
import { MdExpandMore, MdLock } from "react-icons/md";
import { Link } from "react-router-dom";

const RootContainer = styled('div')(({ theme }) => ({
	width: "100%",
	marginTop: theme.spacing(),
}));

const StyledAccordionSummary = styled(AccordionSummary)({
	flexGrow: 1,
});

const HeadingTypography = styled(Typography)(({ theme }) => ({
	fontSize: theme.typography.pxToRem(15),
	fontWeight: theme.typography.fontWeightRegular,
}));

export default function CourseHome({ data, match }) {
	return (
		<RootContainer>
			{data.sub &&
				data.sub.map((s, k) => (
					<Accordion key={k}>
						<StyledAccordionSummary expandIcon={<MdExpandMore />} aria-controls="course-data" id="course-data">
							<HeadingTypography>{s.subjectTitle}</HeadingTypography>
							<span style={{ flexGrow: 1 }} />
							<Link to={`/practice/${match.params.catlink}/${match.params.corslink}/${s.link}`}>
								<Button color="primary">Start</Button>
							</Link>
						</StyledAccordionSummary>
						{s.chap &&
							s.chap.map((c, i) => (
								<AccordionDetails key={i}>
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
								</AccordionDetails>
							))}
					</Accordion>
				))}
		</RootContainer>
	);
}
