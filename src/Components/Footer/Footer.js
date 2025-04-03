import React from "react";
import paytm from "./paytm.svg";
import visa from "./visa.svg";
import masterCard from "./mastercard.svg";
import cardSvg from "./card-payment.svg";
import upi from "./upi.svg";
import { Grid, Container, makeStyles, Divider, Typography, List, ListItem, ListItemText, Avatar, Chip } from "@mui/material";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaWhatsapp, FaGooglePlay, FaHeadset } from "react-icons/fa";
import { FcFeedback, FcDepartment } from "react-icons/fc";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
	footer: {
		paddingTop: theme.spacing(3),
		backgroundAttachment: "fixed",
		color: "#ffffff",
		backgroundSize: "cover",
		backgroundColor: "#330000",
		backgroundImage:
			"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Cdefs%3E%3CradialGradient id='a' cx='396' cy='281' r='514' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%230c0215'/%3E%3Cstop offset='1' stop-color='%23330000'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='400' y1='148' x2='400' y2='333'%3E%3Cstop offset='0' stop-color='%232151ff' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%232151ff' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='400'/%3E%3Cg fill-opacity='0.4'%3E%3Ccircle fill='url(%23b)' cx='267.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='532.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='400' cy='30' r='300'/%3E%3C/g%3E%3C/svg%3E\")",
		backgroundPosition: "center",
	},
	chat: {
		background: "#fff",
		color: "#0a5494",
		cursor: "grab",
		marginTop: theme.spacing(2),
	},
	socialUl: {
		display: "flex",
		alignItems: "stretch",
		justifyContent: "space-between",
		width: "70%",
	},
	list: {
		padding: 0,
		lineHeight: 0.6,
	},
	listText: {
		color: "#40ddb6",
		transition: "all 0.3s ease-in-out",
		"&:hover, &:focus": {
			backgroundColor: theme.palette.grey[300],
			borderRadius: "10px",
			padding: theme.spacing(0, 1, 0.2),
			color: "#0135b7",
			transform: "scale(1.1)",
		},
	},
	rounded: {
		color: "#fff",
		backgroundColor: "#4caf50",
		maxHeight: "80px",
		maxWidth: "80px",
		marginRight: theme.spacing(2),
	},
	footerLogo: {
		width: 224,
		backgroundColor: "#ffffff",
		padding: "10px",
		borderRadius: "15px",
		[theme.breakpoints.down("sm")]: {
			width: 150,
			marginLeft: theme.spacing(5),
		},
	},
	payUl: {
		background: "#f6f2fc",
		display: "flex",
		alignItems: "stretch",
		justifyContent: "space-between",
		width: "90%",
		marginTop: theme.spacing(2),
		paddingLeft: theme.spacing(),
		paddingRight: theme.spacing(),
		borderRadius: theme.spacing(),
	},

	payLi: {
		display: "block",
		flex: "0 1 auto",
		listStyleType: "none",
	},
	center: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
}));

const social = [
	{ icon: <FaFacebookF />, name: "Facebook", link: "https://www.facebook.com/QualifierOfficial" },
	{ icon: <FaTwitter />, name: "Twitter", link: "https://www.twitter.com/infoqualifier" },
	{ icon: <FaLinkedinIn />, name: "LinkedinIn", link: "https://www.linkedin.com/company/qualifier" },
	{ icon: <FaInstagram />, name: "Instagram", link: "https://www.instagram.com/qualifier.official/" },
	{ icon: <FaYoutube />, name: "Youtube", link: "https://www.youtube.com/channel/UCpZ-V8DN0g-NivLexq8xgXw?sub_confirmation=1" },
	{ icon: <FaWhatsapp />, name: "Whatsapp", link: "https://wa.link/wy5cq8" },
];

const cards = [
	{ icon: paytm, name: "Paytm" },
	{ icon: masterCard, name: "MasterCard" },
	{ icon: visa, name: "VISA" },
	{ icon: cardSvg, name: "Card" },
	{ icon: upi, name: "UPI" },
];

export default function Footer() {
	const classes = useStyles();

	return (
		<div id="footer" className={classes.footer}>
			<Container>
				<Grid container spacing={4}>
					<Grid item xs={12} sm={6} md={3}>
						<img
							className={classes.footerLogo}
							src="https://res.cloudinary.com/qualifier/image/upload/v1585843340/Default/QualifierLogo_epvtl9.svg"
							alt="logo"
						/>
						<br />
						<Typography variant="caption" style={{ marginLeft: 110 }}>
							Powered by Softechinfra
						</Typography>
						<br />
						<List dense>
							<ListItem disableGutters>
								<FcFeedback style={{ fontSize: 20, marginRight: 8, marginLeft: 15 }} />
								<ListItemText primary="info@qualifier.co.in" />
							</ListItem>
							<ListItem disableGutters>
								<FcDepartment style={{ fontSize: 20, marginRight: 8, marginLeft: 15 }} />
								<ListItemText primary="47, Tollygunge, Kolkata - India" />
							</ListItem>
						</List>
						<Divider style={{ backgroundColor: "#fff" }} />
						<center>
							<a target="_blank" rel="noopener noreferrer" href="https://tawk.to/chat/5e270a298e78b86ed8aa5fd2/default">
								<Chip icon={<FaHeadset />} className={classes.chat} label="Start Chat Now" />
							</a>
						</center>
					</Grid>
					<Grid item xs={6} md={3} className={classes.center}>
						<Typography variant="subtitle1">Company</Typography>
						<List dense>
							{list1.map((l) => (
								<ListItem key={l.text} dense disableGutters className={classes.list}>
									<Link to={l.link}>
										<ListItemText className={classes.listText} primary={`↠ ${"\u00A0"}${l.text}`} />
									</Link>
								</ListItem>
							))}
						</List>
					</Grid>
					<Grid item xs={6} md={3} className={classes.center}>
						<Typography variant="subtitle1">Products</Typography>
						<List dense>
							{list2.map((l) => (
								<ListItem key={l.text} dense disableGutters className={classes.list}>
									<Link to={l.link}>
										<ListItemText primary={`»${"\u00A0"} ${l.text}`} className={classes.listText} />
									</Link>
								</ListItem>
							))}
						</List>
					</Grid>
					<Grid item xs={12} sm={6} md={3}>
						<Typography variant="subtitle1">Our Apps</Typography>
						<List>
							<ListItem>
								<Avatar variant="rounded" className={classes.rounded}>
									<FaGooglePlay />
								</Avatar>
								<ListItemText
									primary="Qualifier App"
									secondary={
										<a
											href="https://play.google.com/store/apps/details?id=com.softechinfra.android.qualifier"
											target="_blank"
											rel="noopener noreferrer"
										>
											Download Now →
										</a>
									}
								/>
							</ListItem>
						</List>
						<Typography variant="subtitle1">Keep in Touch</Typography>
						<ul className={classes.socialUl}>
							{social.map((s) => (
								<li key={s.name} className={classes.payLi}>
									<a href={s.link} target="_blank" rel="noopener noreferrer" alt={s.name}>
										{s.icon}
									</a>
								</li>
							))}
						</ul>
						<Divider style={{ backgroundColor: "#fff" }} />

						<ul className={classes.payUl}>
							{cards.map((c) => (
								<li key={c.name} className={classes.payLi}>
									<Link to="/pricing">
										<Avatar variant="rounded" src={c.icon} alt={c.name} />
									</Link>
								</li>
							))}
						</ul>
					</Grid>
				</Grid>
				<Divider />
				<center>
					<Typography gutterBottom variant="caption">
						© 2020 | Qualifier.co.in
					</Typography>
				</center>
			</Container>
		</div>
	);
}

const list1 = [
	{ text: "About Us", link: "/about" },
	{ text: "Carrers", link: "/contact", highlight: "Hiring On" },
	{ text: "Pricing", link: "/pricing" },
	{ text: "Make a Test", link: "/login" },
	{ text: "Make a Practice", link: "/login" },
	{ text: "Refund Policy", link: "/privacypolicy/#refund" },
	{ text: "Privacy Policy", link: "/privacypolicy" },
	{ text: "Sitemap", link: "/sitemap" },
];

const list2 = [
	{ text: "Online Test", link: "/online-test-series" },
	{ text: "Practice Series", link: "/practice" },
	{ text: "Course Wise Series", link: "/courses" },
	{ text: "Learn online", link: "/login" },
	{ text: "Blogs & News", link: "/blog" },
	{ text: "App Privacy", link: "/app-privacy" },
	{ text: "Offline Bootcamp", link: "/" },
	{ text: "Offers & Promo", link: "/pricing" },
];
