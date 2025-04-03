import React, { useContext, Suspense } from "react";
import { DRAWER, LOGOUT_USER } from "../Context/types";
import { MainContext } from "../Context/MainContext";
import { Link } from "react-router-dom";
import { makeStyles, Hidden, SwipeableDrawer, Drawer, Chip, Divider, List, ListItem, ListItemText } from "@material-ui/core";
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
let drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	drawer: {
		[theme.breakpoints.up("sm")]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	icon: {
		fontSize: 22,
		marginRight: 16,
	},
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
		backgroundColor: "#1b1b1b",
		color: "#ffffff",
		"& p": {
			margin: 0,
		},
	},
	drawerLink: {
		color: "white",
		textDecoration: "none",
		"&:hover": {
			backgroundColor: theme.palette.grey[300],
			borderRadius: "10px",
			color: "#2196f3",
		},
	},
}));
const listData = [
	{ text: "Dashboard", link: "/dashboard", icon: <FcHome /> },
	{ text: "Test Series", link: "/online-test-series", icon: <FcInspection /> },
	{ text: "All Categories", link: "/practice", icon: <FcOrgUnit /> },
	{ text: "All Courses", link: "/courses", icon: <FcGraduationCap /> },
	{ text: "Course Enrolled", link: "/mycourses", icon: <FcSurvey /> },
	{ text: "Saved Question", link: "/savequestion", icon: <FcBookmark /> },
];
const listData2 = [
	{ text: "Offers & Pricing", link: "/pricing", icon: <FcRating /> },
	{ text: "My Report", link: "/report", icon: <FcComboChart /> },
	{ text: "Blogs & News", link: "/blog", icon: <FcReading /> },
	{ text: "Contact Us", link: "/contact", icon: <FcFeedback /> },
	{ text: "My Profile", link: "/profile", icon: <FcManager /> },
];
export default function MyDrawer(props) {
	const classes = useStyles();
	const { container } = props;
	const { state, dispatch } = useContext(MainContext);
	const handleDrawerToggle = () => {
		dispatch({ type: DRAWER });
	};
	const handleLogout = () => {
		dispatch({ type: LOGOUT_USER });
	};

	const DrawerData = ({ mobile }) => (
		<div>
			<div className={classes.toolbar} />
			<center>
				<Link to="/profile" style={{ textDecoration: "none" }}>
					<Chip onClick={mobile ? handleDrawerToggle : null} label={`Welcome ${state.isAuthenticated ? state.name : "Guest"}`} color="primary" />
				</Link>
			</center>
			<Divider />
			<List>
				{listData.map((l) => (
					<Link to={l.link} key={l.text} className={classes.drawerLink}>
						<ListItem onClick={mobile ? handleDrawerToggle : null}>
							<span className={classes.icon}>{l.icon} </span>
							<ListItemText primary={l.text} />
						</ListItem>
					</Link>
				))}
			</List>
			<Divider />
			<List>
				{listData2.map((l) => (
					<Link to={l.link} key={l.text} className={classes.drawerLink}>
						<ListItem onClick={mobile ? handleDrawerToggle : null}>
							<span className={classes.icon}>{l.icon} </span>
							<ListItemText primary={l.text} />
						</ListItem>
					</Link>
				))}
				<Divider />
				{state.isAuthenticated ? (
					<ListItem button onClick={handleLogout}>
						<span className={classes.icon}>
							<FcImport />
						</span>

						<ListItemText primary="Log Out" />
					</ListItem>
				) : (
					<Link to="/signup" className={classes.drawerLink}>
						<ListItem onClick={mobile ? handleDrawerToggle : null}>
							<span className={classes.icon}>
								<FcFlashOn />
							</span>

							<ListItemText primary="Let's Start" />
						</ListItem>
					</Link>
				)}
			</List>
			<div className="center" style={{ flexDirection: "column" }}>
				<span className="center">
					<MdCopyright /> &nbsp;
					<p>Copyright | Qualifier.co.in</p>
				</span>
				<p>Version 2.4.3</p>
			</div>
		</div>
	);

	return (
		<Suspense fallback={<nav />}>
			<div className={classes.root}>
				<nav className={classes.drawer} aria-label="mailbox folders">
					{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
					<Hidden smUp implementation="css">
						<SwipeableDrawer
							container={container}
							variant="temporary"
							anchor="left"
							open={state.mobileDrawer}
							onClose={handleDrawerToggle}
							onOpen={handleDrawerToggle}
							classes={{
								paper: classes.drawerPaper,
							}}
							ModalProps={{
								keepMounted: true, // Better open performance on mobile.
							}}
						>
							<DrawerData mobile={true} />
						</SwipeableDrawer>
					</Hidden>
					<Hidden xsDown implementation="css">
						<Drawer
							classes={{
								paper: classes.drawerPaper,
							}}
							variant="permanent"
							onClose={handleDrawerToggle}
							open
						>
							<DrawerData mobile={false} />
						</Drawer>
					</Hidden>
				</nav>
			</div>
		</Suspense>
	);
}
