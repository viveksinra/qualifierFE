import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/material";
import { fetchData } from "../Api";
const img = fetchData("/api/general/myimage/offer");
const fullImg = fetchData("/api/general/myimage/test-series-buy");

const imgStyles = makeStyles((theme) => ({
	img1: {
		overflow: "hidden",
		"& img": {
			maxHeight: 300,
			maxWidth: "100%",
			transition: "all 0.3s ease-out",
			transitionDuration: ".3s",
			"&:hover": {
				transform: "scale(1.1) rotate(1deg)",
			},
		},
	},
	fullImg: {
		maxHeight: 400,
		marginTop: 20,
		marginBottom: 20,
		maxWidth: 1230,
		overflow: "hidden",
		marginLeft: "auto",
		marginRight: "auto",
		"& img": {
			maxWidth: "100%",
			"-webkit-transform": "scale(1)",
			transform: "scale(1)",
			"-webkit-transition": ".3s ease-in-out",
			transition: ".3s ease-in-out",
			"&:hover": {
				"-webkit-transform": "scale(1.05)",
				transform: "scale(1.05)",
			},
			[theme.breakpoints.up("sm")]: {
				borderRadius: 10,
			},
		},
	},
}));
// Img Size 283xh
export function OfferCard() {
	const classes = imgStyles();
	const data = img.data.read();
	return (
		<Link to="/pricing">
			<div className={classes.img1}>
				<img src={data.imageLink} alt="Offer" />
			</div>
		</Link>
	);
}

// Img Size 283xh
export function FullOffer() {
	const data = fullImg.data.read();
	const classes = imgStyles();

	return (
		<Link to="/pricing">
			<div className={classes.fullImg}>
				<img src={data.imageLink} alt="banner" />
			</div>
		</Link>
	);
}
