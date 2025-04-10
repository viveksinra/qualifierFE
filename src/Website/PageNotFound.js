import React from "react";

import { styled, Typography, Fab, Grid } from "@mui/material";

import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { brandImage, brandText } from "../theme";

const RootContainer = styled('div')(({ theme }) => ({
	margin: 0,
	padding: 0,
}));

const Heading = styled('h1')(({ theme }) => ({
	fontSize: "150px",
	[`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
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
}));

const StyledFab = styled(Fab)(({ theme }) => ({
	margin: theme.spacing(1),
}));

const ExtendedIcon = styled(FaHome)(({ theme }) => ({
	marginRight: theme.spacing(1),
	fontSize: "20px",
}));

export default function PageNotFound() {
	return (
		<RootContainer>
			<Heading>PAGE NOT FOUND</Heading>
			<Grid container>
				<Grid item>
					<img id="logo" src={brandImage.logo} alt="logo" />
				</Grid>
				<span style={{ flexGrow: 1 }} />
				<Grid item>
					<center>
						<Link to="/">
							<StyledFab size="small" variant="extended" color="primary">
								<ExtendedIcon />
								Go to Home
							</StyledFab>
						</Link>
					</center>
				</Grid>
			</Grid>

			<Typography variant="h6" color="primary" style={{ position: "absolute", bottom: "10%", left: "10%" }}>
				It seems that you are looking for the page that is not {brandText.brandName}'s server.
			</Typography>
		</RootContainer>
	);
}
