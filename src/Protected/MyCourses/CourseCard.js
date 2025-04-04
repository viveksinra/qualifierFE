import React from "react";
import { Grid, Card, Typography, Chip } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";

import { fetchData } from "../../Components/Api";
const resource = fetchData("/api/report/user/ce");

const PREFIX = 'CourseCard';
const cardClasses = {
	card: `${PREFIX}-card`,
	cardLogo: `${PREFIX}-cardLogo`,
	firstLetter: `${PREFIX}-firstLetter`
};

const StyledCard = styled(Card)(({ theme }) => ({
	[`&.${cardClasses.card}`]: {
		padding: theme.spacing(2),
		marginLeft: "auto",
		marginRight: "auto",
		background: "#ebf5fc",
		maxWidth: 370,
		height: 420,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		boxShadow: "-6px -6px 20px rgba(255,255,255,1), 6px 6px 20px rgba(0,0,0,0.1)",
		borderRadius: "30px",
		"&:hover": {
			boxShadow: "inset -6px -6px 10px rgba(255,255,255,0.5), inset 6px 6px 20px rgba(0,0,0,0.05)",
		},
	},
	[`& .${cardClasses.cardLogo}`]: {
		maxWidth: 120,
		maxHeight: 80,
		// marginBottom: theme.spacing(),
	},
	[`& .${cardClasses.firstLetter}`]: {
		position: "absolute",
		display: "inline-flex",
		marginLeft: 15,
		marginTop: -20,
		letterSpacing: -6,
		fontSize: "7em",
		color: "#a7d0ef",
		lineHeight: 0.8,
		fontWeight: "bold",
	},
}));

export default function CourseCard() {
	const allCourses = resource.data.read();
	return (
		<Grid container spacing={2}>
			{allCourses.length !== 0 ? (
				allCourses.map((c, i) => (
					<Grid item key={i} size={{xs: 12,md: 4 }} >
						<Link to={`/practice/${c.categoryLink}/${c.link}`} style={{ textDecoration: "none" }}>
							<StyledCard className={cardClasses.card}>
								<span style={{ height: 90 }}>
									<img alt={c.courseTitle} className={cardClasses.cardLogo} src={c.logo} />
								</span>
								<Chip label={c.courseTitle} color="primary" />
								<Typography gutterBottom align="center" color="secondary">
									{c.categoryTitle}
								</Typography>

								<span style={{ flexGrow: 1 }} />
								<Typography style={{ height: 140, overflow: "hidden" }} align="center" color="textSecondary">
									{c.description}
								</Typography>
								<span style={{ flexGrow: 1 }} />
								<Typography color="primary" variant="caption">
									Last Visited : {c.lastOpened}
									<p className={cardClasses.firstLetter}> {c.count} </p>
								</Typography>
								<Chip style={{ cursor: "grab", marginTop: 10 }} label="Resume Course" variant="outlined" color="primary" />
								<span style={{ flexGrow: 1 }} />
							</StyledCard>
						</Link>
					</Grid>
				))
			) : (
				<NoData />
			)}
		</Grid>
	);
}

function NoData() {
	return (
		<StyledCard className={cardClasses.card}>
			<Chip label="No Course Available" color="primary" />
			<video
				muted
				autoPlay
				loop
				style={{ borderRadius: "30% 70% 70% 30% / 30% 42% 58% 70%", marginTop: 10 }}
				width="280"
				src="https://media.flaticon.com/dist/min/img/video/sad/video.mp4"
				type="video/mp4"
			/>
			<Link to="/courses">
				<Chip style={{ cursor: "grab", marginTop: 10 }} label="Add Course" variant="outlined" color="primary" />
			</Link>
		</StyledCard>
	);
}
