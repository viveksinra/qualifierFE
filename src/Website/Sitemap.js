import React from "react";
import Footer from "../Components/Footer/Footer";
import { Container, makeStyles, Typography } from "@material-ui/core";
import { TreeView, TreeItem } from "@material-ui/lab";
import { Link } from "react-router-dom";
import { HideOnScroll, FullNav } from "../Components/Navigation/Nav";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";
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
		height: 800,
		borderTopLeftRadius: "20px",
		borderTopRightRadius: "20px",
	},

	tree: {
		height: 216,
		flexGrow: 1,
		color: "rgb(0, 110, 255)",
		marginLeft: "auto",
		marginRight: "auto",
		maxWidth: 400,
	},
}));

export default function Sitemap(props) {
	const classes = useStyles();

	return (
		<div>
			<FullNav />
			<div className={classes.topBanner}></div>
			<HideOnScroll {...props}>
				<FullNav />
			</HideOnScroll>
			<Container className={classes.conatiner}>
				<Typography variant="h5" align="center" color="primary">
					Go where you like <strong>- Just in One Click</strong>
				</Typography>
				<Typography paragraph align="center" color="textSecondary">
					Qualifier is India's leading online practice, test and Study plateform for Indian students & exam aspirants. We have a huge question bank of
					several courses in different categories, like Government Exams, Bank Practices, C.B.S.E, State Board Exams and much more. We offer mobile
					application and cross platform accessibility so that study can be smooth & stress-free. After a large exprense in education sector we
					understand the student need and convey them the best study content so that they can crack the examination as playing a game. Enjoy Studing !
				</Typography>
				<TreeView className={classes.tree} defaultCollapseIcon={<FaAngleDown />} defaultExpandIcon={<FaAngleRight />}>
					{treeData.map((t, i) => (
						<TreeItem key={i} nodeId={(i + 1).toString()} label={t.link ? <Link to={`/${t.link}`}>{t.name}</Link> : t.name}>
							{t.children &&
								t.children.map((c, j) => <TreeItem key={j} nodeId={(j + 1).toString()} label={<Link to={`/${c.link}`}>{c.name}</Link>}></TreeItem>)}
						</TreeItem>
					))}
				</TreeView>
			</Container>

			<Footer />
		</div>
	);
}

const treeData = [
	{ name: "Home", link: "" },
	{ name: "About - Us", link: "about" },
	{ name: "Categories of Course", link: "practice" },
	{ name: "All Courses", link: "courses" },
	{ name: "Pricing", link: "pricing" },
	{ name: "Best Offers", link: "pricing" },
	{ name: "Blogs & News", link: "blog" },
	{ name: "Contact - Us", link: "contact" },
	{ name: "Live Chat", link: "contact" },
	{ name: "Privacy Policy", link: "privacypolicy" },
	{ name: "Login to Qualifier", link: "login" },
	{ name: "Create a New Account / Signup", link: "signup" },
	{
		name: "Registered User",
		children: [
			{ name: "Dashboard", link: "dashboard" },
			{ name: "Practice The courses", link: "practice" },
			{ name: "Reports & Analysis", link: "practice" },
			{ name: "View Save Questions", link: "savequestion" },
			{ name: "View Attempted Questions", link: "attemptedquestion" },
		],
	},
];
