import React, { useState, useEffect, lazy } from "react";
import { Nav } from "../Components/Navigation/Nav";
import { makeStyles, Typography, Grid, Chip, Card } from "@material-ui/core";
import { Link } from "react-router-dom";
import orbit from "../img/orbit.svg";
import axios from "axios";
const MyDrawer = lazy(() => import("../Components/Navigation/MyDrawer"));

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		paddingLeft: "10px",
		paddingRight: "10px",
	},
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		marginTop: theme.spacing(2),
		background: `url(${orbit})`,
		width: "100%",
		minHeight: 650,
		backgroundSize: "cover",
	},
	card: {
		height: 140,
		display: "flex",
		boxShadow: "0 5px 20px 2px rgba(0,0,0,.12)",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
	},
	logo: {
		height: 80,
		padding: theme.spacing(),
	},
}));

export default function CourseList({ match }) {
	const classes = useStyles();
	const [catg, setCatg] = useState({});
	document.title = `${catg.categoryTitle} : Qualifier - Online Test Series & Practice - Railway, SSC, Banking, Placement Papers & CBSE Exams For FREE`;

	useEffect(() => {
		axios
			.get(`/api/public/catcourse/getall/${match.params.catlink}`)
			.then((res) => setCatg(res.data))
			.catch((err) => console.log(err));
	}, [match.params.catlink]);
	return (
		<div className={classes.root}>
			<Nav />
			<MyDrawer />
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Grid container>
					<Grid item xs={12}>
						<center>
							<Chip color="primary" label={catg.categoryTitle} />
						</center>
					</Grid>
					<Grid item xs={12}>
						<Typography align="center" variant="h4">
							Practice Best Questions, for Free!
						</Typography>
						<Typography align="center" color="textSecondary" paragraph>
							{catg.description}
						</Typography>
					</Grid>
					<Grid container spacing={2}>
						{catg.cour &&
							catg.cour.map((d) => (
								<Grid item xs={12} key={d._id} md={3}>
									<Link to={`${match.url}/${d.link}`}>
										<Card className={classes.card}>
											<img src={d.logo} alt={d.courseTitle} className={classes.logo} />
											<Chip variant="outlined" color="primary" label={d.courseTitle} />
										</Card>
									</Link>
								</Grid>
							))}
					</Grid>
				</Grid>
			</main>
		</div>
	);
}
