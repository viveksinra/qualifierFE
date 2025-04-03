import React from "react";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { fetchData } from "../Api";

const img = fetchData("/api/general/myimage/offer");
const fullImg = fetchData("/api/general/myimage/test-series-buy");

const StyledImg1Div = styled('div')(({ theme }) => ({
	overflow: "hidden",
}));

const StyledImg1 = styled('img')(({ theme }) => ({
	maxHeight: 300,
	maxWidth: "100%",
	transition: "all 0.3s ease-out",
	transitionDuration: ".3s",
	"&:hover": {
		transform: "scale(1.1) rotate(1deg)",
	},
}));

const StyledFullImgDiv = styled('div')(({ theme }) => ({
	maxHeight: 400,
	marginTop: 20,
	marginBottom: 20,
	maxWidth: 1230,
	overflow: "hidden",
	marginLeft: "auto",
	marginRight: "auto",
	[`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
		borderRadius: 10,
	},
}));

const StyledFullImg = styled('img')(({ theme }) => ({
	maxWidth: "100%",
	WebkitTransform: "scale(1)",
	transform: "scale(1)",
	WebkitTransition: ".3s ease-in-out",
	transition: ".3s ease-in-out",
	"&:hover": {
		WebkitTransform: "scale(1.05)",
		transform: "scale(1.05)",
	},
	[`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
		borderRadius: 10,
	},
}));

// Img Size 283xh
export function OfferCard() {
	const data = img.data.read();
	return (
		<Link to="/pricing">
			<StyledImg1Div>
				<StyledImg1 src={data.imageLink} alt="Offer" />
			</StyledImg1Div>
		</Link>
	);
}

// Img Size 283xh
export function FullOffer() {
	const data = fullImg.data.read();

	return (
		<Link to="/pricing">
			<StyledFullImgDiv>
				<StyledFullImg src={data.imageLink} alt="banner" />
			</StyledFullImgDiv>
		</Link>
	);
}
