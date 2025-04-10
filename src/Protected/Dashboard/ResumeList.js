import React from "react";
import { List, ListItem, ListItemText, ListSubheader } from "@mui/material";
import { Link } from "react-router-dom";
import { FcReading, FcInspection, FcGraduationCap, FcAdvance } from "react-icons/fc";
import { fetchData } from "../../Components/Api";
import { isQualifier } from "../../theme";
const resumeData = fetchData("/api/report/user/four");

export default function ResumeList() {
	const resume = resumeData.data.read();
	const icon = {
		fontSize: 40,
		marginRight: 10,
	};
	return (
		<List
			dense
			component="nav"
			aria-label="course-Resume"
			subheader={
				<ListSubheader component="div" id="course-Resume">
					Resume Your Study
				</ListSubheader>
			}
		>
			{resume.length === 0 ? (
				<div>
					<Link to={"/online-test-series"}>
						<ListItem button="true">
							<FcInspection style={icon} />
							<ListItemText primary="Explore Test Series" />
							<FcAdvance style={{ fontSize: 30 }} />
						</ListItem>
					</Link>
			{	isQualifier &&	<Link to={"/practice"}>
						<ListItem button="true">
							<FcGraduationCap style={icon} />
							<ListItemText primary="Start New Course Practice" />
							<FcAdvance style={{ fontSize: 30 }} />
						</ListItem>
					</Link>}
			{isQualifier &&	<Link to={"/blog"}>
						<ListItem button="true">
							<FcReading style={icon} />
							<ListItemText primary="Read New Blog & News" />
							<FcAdvance style={{ fontSize: 30 }} />
						</ListItem>
					</Link>}
				</div>
			) : (
				resume.map((r, i) => (
					<Link to={`/practice/${r.categoryLink}/${r.link}`} key={i}>
						<ListItem button="true">
							<img style={{ marginRight: 10, width: 40 }} alt={r.courseTitle} src={r.logo} />
							<ListItemText primary={r.courseTitle.slice(0, 34)} />
							<FcAdvance style={{ fontSize: 30 }} />
						</ListItem>
					</Link>
				))
			)}
		</List>
	);
}
