import React, { Fragment, Suspense } from "react";
import "./categories.css";
import { Link } from "react-router-dom";
import { Container, Grid, List, ListItem, ListItemText, Typography, SvgIcon, CircularProgress } from "@mui/material";
import { fetchData } from "../Api";
const resource = fetchData("/api/public/getcourse/getall");

export default function Categories() {
	return (
		<div id="category">
			<Container>
				<Grid container spacing={2} justify="center" alignItems="center">
					<Grid item size={{xs: 12}} >
						<Typography align="center" variant="h5" color="primary">
							Popular Practice Test Categories
						</Typography>
						<Typography align="center" gutterBottom color="textSecondary">
						Practice questions & Mock Tests for Government Exams, Placement Exams, CBSE Exams and also get the latest news & articles for <b>FREE</b>.
						</Typography>
						<br />
					</Grid>
					<Suspense fallback={<CircularProgress />}>
						<CatgDetails />
					</Suspense>
				</Grid>
			</Container>
		</div>
	);
}

const CatgDetails = () => {
	const cat = resource.data.read();

	if (!cat || !Array.isArray(cat)) {
		return (
			<Grid item size={{xs: 12}}>
				<Typography align="center" color="error">
					No categories available at the moment.
				</Typography>
			</Grid>
		);
	}

	return (
		<>
		{
			cat && cat.length > 0 && 	<Fragment>
			{cat?.map((d, i) => (
				<Grid item size={{xs: 12, sm: 6, md: 4}} key={i} style={{ display: "flex", justifyContent: "center" }}>
					<div className="categ">
						<Link to={`/practice/${d.link}`}>
							<img src={d.image} alt={d.categoryTitle} />
							<Typography align="center" color="secondary" varian="subtitle1">
								{d.categoryTitle}
							</Typography>
							{d.highlight !== "" && (
								<div className="folded">
									<h2>{d.highlight} </h2>
								</div>
							)}
						</Link>
						<List dense disablePadding component="nav" aria-label="Category List">
							{d.cour.map((c, j) => (
								<Link key={j} to={`/practice/${d.link}/${c.link}`}>
									<ListItem dense button="true">
										<SvgIcon
											style={{ marginRight: 10 }}
											className="MuiSvgIcon-root"
											focusable="false"
											viewBox="0 0 24 24"
											aria-hidden="true"
											role="presentation"
										>
											<path
												fill="#13b3bf"
												d="M21.71 11.29l-9-9a.9959.9959 0 00-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z"
											></path>
										</SvgIcon>
										<ListItemText primary={c.courseTitle} />
									</ListItem>
								</Link>
							))}
						</List>
						<Link to={`/practice/${d.link}`}>
							<button id="btn-block">VIEW ALL</button>
						</Link>
						<Link to={`/practice/${d.link}`}>
							<div className="go-corner">
								<div className="go-arrow">→</div>
							</div>
						</Link>
					</div>
				</Grid>
			))}
		</Fragment>
		}
		
		</>
	
	);
};
