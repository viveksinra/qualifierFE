import React, { useState, useEffect, lazy } from "react";
import { Nav } from "../Components/Navigation/Nav";
import { styled, Typography, Grid, Chip, Card, useTheme } from "@mui/material";
import { Link, useParams, useLocation } from "react-router-dom";
import orbit from "../img/orbit.svg";
import axios from "axios";
const MyDrawer = lazy(() => import("../Components/Navigation/MyDrawer"));

const RootContainer = styled('div')(({ theme }) => ({
	display: "flex",
	paddingLeft: "10px",
	paddingRight: "10px",
}));

const ContentContainer = styled('main')(({ theme }) => ({
	flexGrow: 1,
	marginTop: theme.spacing(2),
	background: `url(${orbit})`,
	width: "100%",
	minHeight: 650,
	backgroundSize: "cover",
}));

const StyledCard = styled(Card)(({ theme }) => ({
	height: 140,
	display: "flex",
	boxShadow: "0 5px 20px 2px rgba(0,0,0,.12)",
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
}));

const LogoImage = styled('img')(({ theme }) => ({
	height: 80,
	padding: theme.spacing(),
}));

export default function CourseList() {
	const { catlink } = useParams();
	const location = useLocation();
	const [catg, setCatg] = useState({});
	const theme = useTheme();
	document.title = `${catg.categoryTitle} : Qualifier - Online Test Series & Practice - Railway, SSC, Banking, Placement Papers & CBSE Exams For FREE`;

	useEffect(() => {
		axios
			.get(`/api/public/catcourse/getall/${catlink}`)
			.then((res) => setCatg(res.data))
			.catch((err) => console.log(err));
	}, [catlink]);
	return (
		<RootContainer>
			<Nav />
			<MyDrawer />
			<ContentContainer>
				<div style={{ ...theme.mixins.toolbar }} />
				<Grid container>
					<Grid item size={{xs: 12}} >
						<center>
							<Chip color="primary" label={catg.categoryTitle} />
						</center>
					</Grid>
					<Grid item size={{xs: 12}} >
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
								<Grid item size={{xs: 12, md: 3}} key={d._id}>
									<Link to={`${location.pathname}/${d.link}`}>
										<StyledCard>
											<LogoImage src={d.logo} alt={d.courseTitle} />
											<Chip variant="outlined" color="primary" label={d.courseTitle} />
										</StyledCard>
									</Link>
								</Grid>
							))}
					</Grid>
				</Grid>
			</ContentContainer>
		</RootContainer>
	);
}
