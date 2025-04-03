import React, { useState, Fragment, useEffect, useContext } from "react";
import Footer from "../Components/Footer/Footer";
import { FullNav, HideOnScroll } from "../Components/Navigation/Nav";
import { makeStyles, Grid, Container, Avatar, Typography } from "@material-ui/core";
import axios from "axios";
import clsx from "clsx";
import { REFERRAL } from "../Components/Context/types";
import { PriceCard } from "../Website/Pricing";
import FAQ from "../Components/FAQ";
import { MainContext } from "../Components/Context/MainContext";
import Features from "../Components/Decoration/Features";
import { FcExpand } from "react-icons/fc";
import invite from "../img/invite.png";
const useStyles = makeStyles((theme) => ({
	inviteTop: {
		backgroundColor: "#ffffff",
		background: "linear-gradient(to right, #b2fefa, #6190E8)",
		// backgroundImage:
		// "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' %3E%3Cdefs%3E%3ClinearGradient id='a' x1='0' x2='0' y1='0' y2='1'%3E%3Cstop offset='0' stop-color='%2348fcff'/%3E%3Cstop offset='1' stop-color='%238eff8c'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpattern id='b' width='24' height='24' patternUnits='userSpaceOnUse'%3E%3Ccircle fill='%23a44fff' cx='12' cy='12' r='12'/%3E%3C/pattern%3E%3Crect width='100%25' height='100%25' fill='url(%23a)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23b)' fill-opacity='0.1'/%3E%3C/svg%3E\")",
		// backgroundAttachment: "fixed",
		padding: theme.spacing(2, 0),
		// backgroundSize: "cover",
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
	},

	offerCard: {
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
	},
}));

export default function Invite({ match }) {
	const classes = useStyles();
	document.title = "Referral Program @ Qualifier - Online Test Series & Practice - Railway, SSC, Banking, Placement Papers & CBSE Exams For FREE";
	const [data, setData] = useState({
		refName: "Wrong Code",
		refImg: "https://vetdeniz.com/wp-content/uploads/2017/10/default-user.jpg",
		discount: 0,
	});
	const { dispatch } = useContext(MainContext);
	useEffect(() => {
		if (match.params.ref) {
			axios
				.get(`/api/other/promocode/verify/${match.params.ref}`)
				.then((res) => {
					if (res.data.alert.variant === "success") {
						dispatch({ type: REFERRAL, payload: { ref: match.params.ref } });
						setData({ ...res.data });
					}
				})
				.catch((err) => console.log(err));
		}
	}, [match.params.ref, dispatch]);
	return (
		<Fragment>
			<FullNav />
			<HideOnScroll>
				<FullNav />
			</HideOnScroll>
			<div className={clsx(classes.inviteTop, "center")}>
				<Container maxWidth="md">
					<Grid container>
						<Grid item xs={12} sm={4} className="center">
							<div className={clsx(classes.offerCard, "center")}>
								<img src={invite} alt="offer" />
								<p>{data.discount} % </p>
							</div>
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
			</div>
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
