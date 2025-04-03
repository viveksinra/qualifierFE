import React, { useState } from "react";
import Footer from "../Components/Footer/Footer";
import { Container, Typography, List, ListItem, ListItemText, Collapse } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { HideOnScroll, FullNav } from "../Components/Navigation/Nav";
import { FaAngleRight, FaAngleDown } from "react-icons/fa";

const TopBanner = styled("div")(({ theme }) => ({
	background: "url(https://i.ibb.co/CWnH4H4/bg.jpg)",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "center",
	backgroundSize: "cover",
	height: "40vh",
	zIndex: -1,
}));

const StyledContainer = styled(Container)(({ theme }) => ({
	background: "#fff",
	zIndex: 2,
	padding: "20px",
	position: "relative",
	marginTop: "-10%",
	minHeight: 800,
	borderTopLeftRadius: "20px",
	borderTopRightRadius: "20px",
}));

export default function Sitemap(props) {
	const [openSections, setOpenSections] = useState({});

	// Toggle open state for collapsible items
	const handleToggle = (index) => {
		setOpenSections((prev) => ({
			...prev,
			[index]: !prev[index],
		}));
	};

	return (
		<>
			<FullNav />
			<TopBanner />
			<HideOnScroll {...props}>
				<FullNav />
			</HideOnScroll>
			<StyledContainer>
				<Typography variant="h5" align="center" color="primary">
					Go where you like <strong>- Just in One Click</strong>
				</Typography>
				<Typography paragraph align="center" color="textSecondary">
					Qualifier is India's leading online practice, test, and study platform for Indian students & exam aspirants. We have a huge question bank
					of several courses in different categories, like Government Exams, Bank Practices, CBSE, State Board Exams, and much more. We offer mobile
					applications and cross-platform accessibility so that studying can be smooth & stress-free. After a large experience in the education sector,
					we understand student needs and provide the best study content so that they can crack exams as easily as playing a game. Enjoy Studying!
				</Typography>

				<List sx={{ maxWidth: 400, margin: "0 auto", color: "rgb(0, 110, 255)" }}>
					{treeData.map((t, i) => (
						<React.Fragment key={i}>
							<ListItem button onClick={() => t.children && handleToggle(i)}>
								<ListItemText primary={t.link ? <Link to={`/${t.link}`}>{t.name}</Link> : t.name} />
								{t.children && (openSections[i] ? <FaAngleDown /> : <FaAngleRight />)}
							</ListItem>

							{t.children && (
								<Collapse in={openSections[i]} timeout="auto" unmountOnExit>
									<List component="div" disablePadding>
										{t.children.map((c, j) => (
											<ListItem key={j} sx={{ pl: 4 }}>
												<ListItemText primary={<Link to={`/${c.link}`}>{c.name}</Link>} />
											</ListItem>
										))}
									</List>
								</Collapse>
							)}
						</React.Fragment>
					))}
				</List>
			</StyledContainer>
			<Footer />
		</>
	);
}

const treeData = [
	{ name: "Home", link: "" },
	{ name: "About Us", link: "about" },
	{ name: "Categories of Course", link: "practice" },
	{ name: "All Courses", link: "courses" },
	{ name: "Pricing", link: "pricing" },
	{ name: "Best Offers", link: "pricing" },
	{ name: "Blogs & News", link: "blog" },
	{ name: "Contact Us", link: "contact" },
	{ name: "Live Chat", link: "contact" },
	{ name: "Privacy Policy", link: "privacypolicy" },
	{ name: "Login to Qualifier", link: "login" },
	{ name: "Create a New Account / Signup", link: "signup" },
	{
		name: "Registered User",
		children: [
			{ name: "Dashboard", link: "dashboard" },
			{ name: "Practice The Courses", link: "practice" },
			{ name: "Reports & Analysis", link: "practice" },
			{ name: "View Saved Questions", link: "savequestion" },
			{ name: "View Attempted Questions", link: "attemptedquestion" },
		],
	},
];
