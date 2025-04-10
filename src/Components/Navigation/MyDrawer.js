// TODO:Risk Hawk Silent code
import React, { useContext, Suspense } from "react";
import { DRAWER, LOGOUT_USER } from "../Context/types";
import { MainContext } from "../Context/MainContext";
import { Link } from "react-router-dom";
import { useMediaQuery, SwipeableDrawer, Drawer, Chip, Divider, List, ListItem, ListItemText } from "@mui/material";
import { styled } from '@mui/material/styles';
import { MdCopyright } from "react-icons/md";
import {
	FcHome,
	FcInspection,
	FcBookmark,
	FcFlashOn,
	FcOrgUnit,
	FcImport,
	FcGraduationCap,
	FcSurvey,
	FcManager,
	FcRating,
	FcComboChart,
	FcReading,
	FcFeedback,
} from "react-icons/fc";
import { brandText, isQualifier } from "../../theme";
let drawerWidth = 240;

const StyledRootDiv = styled('div')(({ theme }) => ({
	display: "flex",
}));

const StyledNav = styled('nav')(({ theme }) => ({
	[`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
		width: drawerWidth,
		flexShrink: 0,
	},
}));

const StyledIconSpan = styled('span')(({ theme }) => ({
	fontSize: 22,
	marginRight: 16,
}));

const StyledDrawerLink = styled(Link)(({ theme }) => ({
	color: "white",
	textDecoration: "none",
	"&:hover": {
		backgroundColor: theme.palette.grey[300],
		borderRadius: "10px",
		color: "#2196f3",
	},
}));

const toolbarMixins = (theme) => theme.mixins.toolbar;

const drawerPaperStyles = {
	width: drawerWidth,
	backgroundColor: "#1b1b1b",
	color: "#ffffff",
	"& p": {
		margin: 0,
	},
};

const listData = [
	{ text: "Dashboard", link: "/dashboard", icon: <FcHome /> },
	{ text: "Test Series", link: "/online-test-series", icon: <FcInspection /> },
	// { text: "All Categories", link: "/practice", icon: <FcOrgUnit /> },
	// { text: "All Courses", link: "/courses", icon: <FcGraduationCap /> },
	// { text: "Course Enrolled", link: "/mycourses", icon: <FcSurvey /> },
	{ text: "Saved Question", link: "/savequestion", icon: <FcBookmark /> },
];
const listData2 = [
	// { text: "Offers & Pricing", link: "/pricing", icon: <FcRating /> },
	{ text: "My Report", link: "/report", icon: <FcComboChart /> },
	// { text: "Blogs & News", link: "/blog", icon: <FcReading /> },
	// { text: "Contact Us", link: "/contact", icon: <FcFeedback /> },
	{ text: "My Profile", link: "/profile", icon: <FcManager /> },
];
export default function MyDrawer(props) {
	const { container } = props;
	const { state, dispatch } = useContext(MainContext);
	const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));
	
	const handleDrawerToggle = () => {
		dispatch({ type: DRAWER });
	};
	const handleLogout = () => {
		dispatch({ type: LOGOUT_USER });
	};

	const DrawerData = ({ mobile }) => (
		<div sx={toolbarMixins}>
			<center>
				<Link to="/profile" style={{ textDecoration: "none" }}>
					<Chip onClick={mobile ? handleDrawerToggle : null} label={`Welcome ${state.isAuthenticated ? state.name : "Guest"}`} color="primary" />
				</Link>
			</center>
			<Divider />
			<List>
				{listData.map((l) => (
					<StyledDrawerLink to={l.link} key={l.text}>
						<ListItem onClick={mobile ? handleDrawerToggle : null}>
							<StyledIconSpan>{l.icon}</StyledIconSpan>
							<ListItemText primary={l.text} />
						</ListItem>
					</StyledDrawerLink>
				))}
			</List>
			<Divider />
			<List>
				{listData2.map((l) => (
					<StyledDrawerLink to={l.link} key={l.text}>
						<ListItem onClick={mobile ? handleDrawerToggle : null}>
							<StyledIconSpan>{l.icon}</StyledIconSpan>
							<ListItemText primary={l.text} />
						</ListItem>
					</StyledDrawerLink>
				))}
				<Divider />
				{state.isAuthenticated ? (
					<ListItem button onClick={handleLogout}>
						<StyledIconSpan>
							<FcImport />
						</StyledIconSpan>

						<ListItemText primary="Log Out" />
					</ListItem>
				) : (
					<StyledDrawerLink to="/signup">
						<ListItem onClick={mobile ? handleDrawerToggle : null}>
							<StyledIconSpan>
								<FcFlashOn />
							</StyledIconSpan>

							<ListItemText primary="Let's Start" />
						</ListItem>
					</StyledDrawerLink>
				)}
			</List>
			<div className="center" style={{ flexDirection: "column" }}>
				<span className="center">
					<MdCopyright /> &nbsp;
					<p>Copyright | {brandText.brandName}</p>
				</span>
				<p>Version 2.4.3</p>
			</div>
		</div>
	);

	return (
		<Suspense fallback={<nav />}>
			<StyledRootDiv>
				<StyledNav aria-label="mailbox folders">
					{isMobile ? (
						<SwipeableDrawer
							container={container}
							variant="temporary"
							anchor="left"
							open={state.mobileDrawer}
							onClose={handleDrawerToggle}
							onOpen={handleDrawerToggle}
							sx={{ "& .MuiDrawer-paper": drawerPaperStyles }}
							ModalProps={{
								keepMounted: true, // Better open performance on mobile.
							}}
						>
							<DrawerData mobile={true} />
						</SwipeableDrawer>
					) : (
						<Drawer
							sx={{ "& .MuiDrawer-paper": drawerPaperStyles }}
							variant="permanent"
							onClose={handleDrawerToggle}
							open
						>
							<DrawerData mobile={false} />
						</Drawer>
					)}
				</StyledNav>
			</StyledRootDiv>
		</Suspense>
	);
}
