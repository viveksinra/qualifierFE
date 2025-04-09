import React from "react";
import paytm from "./paytm.svg";
import visa from "./visa.svg";
import masterCard from "./mastercard.svg";
import cardSvg from "./card-payment.svg";
import upi from "./upi.svg";
import { Grid, Container, Divider, Typography, List, ListItem, ListItemText, Avatar, Chip } from "@mui/material";
import { styled } from '@mui/material/styles';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube, FaWhatsapp, FaGooglePlay, FaHeadset } from "react-icons/fa";
import { FcFeedback, FcDepartment } from "react-icons/fc";
import { Link } from "react-router-dom";
import { brandImage, brandText } from "../../theme";

const StyledFooterDiv = styled('div')(({ theme }) => ({
	paddingTop: theme.spacing(3),
	backgroundAttachment: "fixed",
	color: "#ffffff",
	backgroundSize: "cover",
	backgroundColor: "#330000",
	backgroundImage:
		"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Cdefs%3E%3CradialGradient id='a' cx='396' cy='281' r='514' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%230c0215'/%3E%3Cstop offset='1' stop-color='%23330000'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='400' y1='148' x2='400' y2='333'%3E%3Cstop offset='0' stop-color='%232151ff' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%232151ff' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='400'/%3E%3Cg fill-opacity='0.4'%3E%3Ccircle fill='url(%23b)' cx='267.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='532.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='400' cy='30' r='300'/%3E%3C/g%3E%3C/svg%3E\")",
	backgroundPosition: "center",
}));

const StyledChatChip = styled(Chip)(({ theme }) => ({
	background: "#fff",
	color: "#0a5494",
	cursor: "grab",
	marginTop: theme.spacing(2),
}));

const StyledSocialUl = styled('ul')(({ theme }) => ({
	display: "flex",
	alignItems: "stretch",
	justifyContent: "space-between",
	width: "70%",
}));

const StyledList = styled(ListItem)(({ theme }) => ({
	padding: 0,
	lineHeight: 0.6,
}));

const StyledListText = styled(ListItemText)(({ theme }) => ({
	color: "#40ddb6",
	transition: "all 0.3s ease-in-out",
	"&:hover, &:focus": {
		backgroundColor: theme.palette.grey[300],
		borderRadius: "10px",
		padding: theme.spacing(0, 1, 0.2),
		color: "#0135b7",
		transform: "scale(1.1)",
	},
}));

const StyledRoundedAvatar = styled(Avatar)(({ theme }) => ({
	color: "#fff",
	backgroundColor: "#4caf50",
	maxHeight: "80px",
	maxWidth: "80px",
	marginRight: theme.spacing(2),
}));

const StyledFooterLogoImg = styled('img')(({ theme }) => ({
	width: 224,
	backgroundColor: "#ffffff",
	padding: "10px",
	borderRadius: "15px",
	[`@media (max-width:${theme.breakpoints.values.sm}px)`]: {
		width: 150,
		marginLeft: theme.spacing(5),
	},
}));

const StyledPayUl = styled('ul')(({ theme }) => ({
	background: "#f6f2fc",
	display: "flex",
	alignItems: "stretch",
	justifyContent: "space-between",
	width: "90%",
	marginTop: theme.spacing(2),
	paddingLeft: theme.spacing(),
	paddingRight: theme.spacing(),
	borderRadius: theme.spacing(),
}));

const StyledPayLi = styled('li')(({ theme }) => ({
	display: "block",
	flex: "0 1 auto",
	listStyleType: "none",
}));

const StyledCenterGrid = styled(Grid)(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
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
	return (
		<StyledFooterDiv id="footer">
			<Container>
				<Grid container spacing={4}>
					<Grid item size={{xs: 12,sm:6, md:3 }} >
						<StyledFooterLogoImg
							src={brandImage.logo}
							alt="logo"
						/>
						<br />
						<Typography variant="caption" style={{ marginLeft: 110 }}>
							{brandText.poweredBy}
						</Typography>
						<br />
						<List dense>
							<ListItem disableGutters>
								<FcFeedback style={{ fontSize: 20, marginRight: 8, marginLeft: 15 }} />
								<ListItemText primary={brandText.contactEmail} />
							</ListItem>
							{/* <ListItem disableGutters>
								<FcDepartment style={{ fontSize: 20, marginRight: 8, marginLeft: 15 }} />
								<ListItemText primary={brandText.contactPhone} />
							</ListItem> */}
						</List>
						<Divider style={{ backgroundColor: "#fff" }} />
						{/* <center>
							<a target="_blank" rel="noopener noreferrer" href="https://tawk.to/chat/5e270a298e78b86ed8aa5fd2/default">
								<StyledChatChip icon={<FaHeadset />} label="Start Chat Now" />
							</a>
						</center> */}
					</Grid>
					<StyledCenterGrid item size={{xs:6, md:3 }}>
						<Typography variant="subtitle1">Company</Typography>
						<List dense>
							{list1.map((l) => (
								<StyledList key={l.text} dense disableGutters>
									<Link to={l.link}>
										<StyledListText primary={`↠ ${"\u00A0"}${l.text}`} />
									</Link>
								</StyledList>
							))}
						</List>
					</StyledCenterGrid>
					<StyledCenterGrid item size={{xs:6, md:3 }}>
						<Typography variant="subtitle1">Products</Typography>
						<List dense>
							{list2.map((l) => (
								<StyledList key={l.text} dense disableGutters>
									<Link to={l.link}>
										<StyledListText primary={`»${"\u00A0"} ${l.text}`} />
									</Link>
								</StyledList>
							))}
						</List>
					</StyledCenterGrid>
					<Grid item size={{xs: 12,sm:6, md:3 }} >
						{/* <Typography variant="subtitle1">Our Apps</Typography> */}
						{/* <List>
							<ListItem>
								<StyledRoundedAvatar variant="rounded">
									<FaGooglePlay />
								</StyledRoundedAvatar>
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
						</List> */}
						<Typography variant="subtitle1">Keep in Touch</Typography>
						<StyledSocialUl>
							{social.map((s) => (
								<StyledPayLi key={s.name}>
									<a href={s.link} target="_blank" rel="noopener noreferrer" alt={s.name}>
										{s.icon}
									</a>
								</StyledPayLi>
							))}
						</StyledSocialUl>
						<Divider style={{ backgroundColor: "#fff" }} />

						<StyledPayUl>
							{cards.map((c) => (
								<StyledPayLi key={c.name}>
									<Link to="/pricing">
										<Avatar variant="rounded" src={c.icon} alt={c.name} />
									</Link>
								</StyledPayLi>
							))}
						</StyledPayUl>
					</Grid>
				</Grid>
				<Divider />
				<center>
					<Typography gutterBottom variant="caption">
						© 2025 | {brandText.brandName}
					</Typography>
				</center>
			</Container>
		</StyledFooterDiv>
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
