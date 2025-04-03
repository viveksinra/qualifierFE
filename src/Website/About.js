import React from "react";
import Footer from "../Components/Footer/Footer";
import { Container, makeStyles, Typography, Grid, Card, Avatar } from "@mui/material";
import { HideOnScroll, FullNav } from "../Components/Navigation/Nav";
const useStyles = makeStyles((theme) => ({
	topBanner: {
		background: "url(https://i.ibb.co/CWnH4H4/bg.jpg)",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "cover",
		height: "40vh",
		zIndex: -1,
	},
	conatiner: {
		background: "#fff",
		zIndex: 2,
		padding: "20px",
		position: "relative",
		marginTop: "-10%",
		overflow: "hidden",
		borderTopLeftRadius: "20px",
		borderTopRightRadius: "20px",
	},
	charity: {
		[theme.breakpoints.down("md")]: {
			backgroundPosition: "0 0",
		},
		background: "url(https://i.ibb.co/KjXnWKy/csr-qualifier.jpg)",
		backgroundRepeat: "no-repeat",
		backgroundPosition: "center",
		backgroundSize: "cover",
		height: "400px",
	},
	charText: {
		textAlign: "center",
		paddingTop: 130,
		[theme.breakpoints.up("md")]: {
			marginLeft: "50vh",
			fontSize: "1.5rem",
		},
		color: "#fff",
	},
	joyImg: {
		width: "80%",
		display: "block",
		marginLeft: "auto",
		marginRight: "auto",
	},
	card: {
		width: 100,
		height: 150,
		borderRadius: 10,
		padding: theme.spacing(2),
		"&:hover": {
			background: "linear-gradient(0deg, rgba(34,195,120,0.5889706224286589) 0%, rgba(45,168,253,0.6786064767703957) 100%)",
			border: "1px dashed blue",
		},
	},
	avatar: {
		width: theme.spacing(8),
		height: theme.spacing(8),
		marginLeft: "auto",
		marginRight: "auto",
	},
}));

export default function About(props) {
	const classes = useStyles();
	document.title = "About - Qualifier : FREE Online Test Series & Practice - Railway, SSC, Banking, Placement Papers & CBSE Exams For FREE";

	return (
		<div>
			<FullNav />
			<div className={classes.topBanner}></div>
			<Container className={classes.conatiner}>
				<Typography variant="h5" align="center" color="primary">
					About <strong>Qualifier</strong> | An Online Practice Portal
				</Typography>
				<Typography paragraph align="center" color="textSecondary">
					Qualifier is India's leading online practice, test and Study platform for Indian students & exam aspirants. We have a huge question bank of
					several courses in different categories, like Government Exams, Bank Practices, C.B.S.E, State Board Exams and much more. We offer mobile
					application and cross platform accessibility so that study can be smooth & stress-free. After a large exprense in education sector we
					understand the student need and convey them the best study content so that they can crack the examination as playing a game. Enjoy Studing !
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<img className={classes.joyImg} src="https://i.ibb.co/zx5wzvF/happy.jpg" alt="happy" border="0" />
					</Grid>
					<Grid item xs={12} sm={6}>
						<br />
						<Typography align="center" variant="h6" color="secondary">
							Study By Practice & Chess the success
						</Typography>
						<Typography align="center" paragraph color="textSecondary">
							Exam is now full of fun! With Qualifier improve your skill & knowledge.
						</Typography>
						<br />
						<Grid container justify="center" spacing={2}>
							{cardData.map((d, i) => (
								<Grid item key={i}>
									<Card elevation={3} className={classes.card}>
										<Avatar variant="rounded" alt={d.text} src={d.img} className={classes.avatar} />
										<Typography align="center" color="secondary">
											{d.text}
										</Typography>
										<Typography align="center" color="textSecondary">
											{d.des}
										</Typography>
									</Card>
								</Grid>
							))}
						</Grid>
					</Grid>
				</Grid>
			</Container>
			<div className={classes.charity} alt="charity-water">
				<div className={classes.charText}>
					<h4>Let's make the Nation a better place</h4>
					<p>
						At <strong>Qualifier</strong>, We strongly believe in supporting the needy youth.
					</p>
				</div>
			</div>
			<HideOnScroll {...props}>
				<FullNav />
			</HideOnScroll>
			<Footer />
		</div>
	);
}

const cardData = [
	{
		img: "https://paytm.com/about-us/wp-content/uploads/sites/3/2015/03/trophy.png",
		text: "Join Intership",
		des: "Hit the nation and smit the space",
	},
	{ img: "https://i.ibb.co/rcM9KMG/intern.png", text: "Join Intership", des: "Hit the nation and smit the space" },
	{ img: "https://material-ui.com/static/images/avatar/1.jpg", text: "Join Intership", des: "Hit the nation and smit the space" },
	{ img: "https://material-ui.com/static/images/avatar/1.jpg", text: "Join Intership", des: "Hit the nation and smit the space" },
];
