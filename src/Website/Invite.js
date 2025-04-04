import React, { useState, Fragment, useEffect, useContext } from "react";
import Footer from "../Components/Footer/Footer";
import { FullNav, HideOnScroll } from "../Components/Navigation/Nav";
import { styled, Grid, Container, Avatar, Typography } from "@mui/material";
import axios from "axios";
import clsx from "clsx";
import { REFERRAL } from "../Components/Context/types";
import { PriceCard } from "../Website/Pricing";
import FAQ from "../Components/FAQ";
import { MainContext } from "../Components/Context/MainContext";
import Features from "../Components/Decoration/Features";
import { FcExpand } from "react-icons/fc";
import invite from "../img/invite.png";
import { useParams } from "react-router-dom";

const InviteTop = styled('div')(({ theme }) => ({
	backgroundColor: "#ffffff",
	background: "linear-gradient(to right, #b2fefa, #6190E8)",
	padding: theme.spacing(2, 0),
	margin: 0,
	minHeight: "30vh",
	"& h6": {
		color: "white",
		fontSize: "1rem",
		font: "icon",
		textAlign: "center",
	},
	"& svg": {
		fontSize: 22,
		marginTop: 10,
		animation: "pulse 2s linear alternate infinite",
	},
	"@keyframes pulse": {
		"0%": { transform: "scale(1)" },
		"100%": { transform: "scale(1.2)" },
	},
}));

const OfferCardContainer = styled('div')(({ theme }) => ({
	"& img": {
		width: 150,
	},
	width: 150,
	flexDirection: "column",
	height: 150,
	"& p": {
		margin: 0,
		paddingLeft: 10,
		paddingBottom: 10,
		color: "blue",
		position: "absolute",
		fontSize: 25,
		fontWeight: 900,
	},
}));

export default function Invite() {
	const { ref } = useParams();
	document.title = "Referral Program @ Qualifier - Online Test Series & Practice - Railway, SSC, Banking, Placement Papers & CBSE Exams For FREE";
	const [data, setData] = useState({
		refName: "Wrong Code",
		refImg: "https://vetdeniz.com/wp-content/uploads/2017/10/default-user.jpg",
		discount: 0,
	});
	const { dispatch } = useContext(MainContext);
	
	useEffect(() => {
		if (ref) {
			axios
				.get(`/api/other/promocode/verify/${ref}`)
				.then((res) => {
					if (res.data.alert.variant === "success") {
						dispatch({ type: REFERRAL, payload: { ref } });
						setData({ ...res.data });
					}
				})
				.catch((err) => console.log(err));
		}
	}, [ref, dispatch]);
	
	return (
		<Fragment>
			<FullNav />
			<HideOnScroll>
				<FullNav />
			</HideOnScroll>
			<InviteTop className={clsx("center")}>
				<Container maxWidth="md">
					<Grid container>
						<Grid item xs={12} sm={4} className="center">
							<OfferCardContainer className={clsx("center")}>
								<img src={invite} alt="offer" />
								<p>{data.discount} % </p>
							</OfferCardContainer>
						</Grid>
						<Grid item xs={12} sm={8} style={{ display: "flex", alignItems: "center" }}>
							<Avatar alt={data.refName} src={data.refImg} />
							&nbsp;&nbsp;
							<h6> {`${data.refName} has invited you to buy Qualifier Special Plan.`}</h6>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="subtitle1" align="center">
								Welcome to Qualifier : An Online Test & Practice Hub <br /> Get additional discount of {data.discount} %
								{data.maxDiscount && ` upto ₹ ${data.maxDiscount}`} and thanks <b>{data.refName}</b> for it.
								<br />
								<FcExpand />
							</Typography>
						</Grid>
					</Grid>
				</Container>
			</InviteTop>
			<PriceCard />
			<br />
			<br />
			<FAQ />
			<br />
			<Features />
			<br />
			<Footer />
		</Fragment>
	);
}
