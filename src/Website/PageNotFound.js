import React from "react";

import { makeStyles, Typography, Fab, Grid } from "@material-ui/core";

import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
	root: {
		margin: 0,
		padding: 0,
	},
	h1: {
		fontSize: "150px",
		[theme.breakpoints.down("sm")]: {
			fontSize: "70px",
		},
		textTransform: "uppercase",
		fontWeight: "900",
		letterSpacing: "10px",
		position: "absolute",
		textAlign: "center",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		margin: "0",
		background: "url(https://i.ibb.co/CWnH4H4/bg.jpg) 50% 50%",
		backgroundSize: "cover",
		WebkitTextFillColor: "transparent",
		WebkitBackgroundClip: "text",
	},
	margin: {
		margin: theme.spacing(1),
	},
	extendedIcon: {
		marginRight: theme.spacing(1),
		fontSize: "20px",
	},
}));

export default function PageNotFound() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<h1 className={classes.h1}>PAGE NOT FOUND</h1>
			<Grid container>
				<Grid item>
					<img id="logo" src="https://i.ibb.co/Q9DyDpZ/Qualifier-Logo.png" alt="logo" />
				</Grid>
				<span style={{ flexGrow: 1 }} />
				<Grid item>
					<center>
						<Link to="/">
							<Fab size="small" variant="extended" className={classes.margin} color="primary">
								<FaHome className={classes.extendedIcon} />
								Go to Home
							</Fab>
						</Link>
					</center>
				</Grid>
			</Grid>

			<Typography variant="h6" color="primary" style={{ position: "absolute", bottom: "10%", left: "10%" }}>
				It seems that you are looking for the page that is not Qualifier's server.
			</Typography>
		</div>
	);
}
