import React, { useContext, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { DRAWER } from "../Context/types";
import { MainContext } from "../Context/MainContext";
import { makeStyles, CssBaseline, Container, useScrollTrigger, Hidden, AppBar, Toolbar, IconButton, Avatar, Slide } from "@material-ui/core";
import { MdMenu, MdExpandMore, MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
const MegaMenu = lazy(() => import("./MegaMenu"));
const MyDrawer = lazy(() => import("./MyDrawer"));

let drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		"& a": {
			textDecoration: "none",
			display: "inline",
			color: "#0a5494",
		},
	},
	grow: {
		flexGrow: 1,
	},
	logo: {
		maxHeight: "50px",
	},
	appBar: {
		[theme.breakpoints.up("sm")]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButtonNav: {
		[theme.breakpoints.up("sm")]: {
			display: "none",
		},
	},

	li: {
		display: "inline",
		fontSize: "medium",
		padding: "1rem",
	},
}));

export function Nav() {
	const classes = useStyles();
	const { state, dispatch } = useContext(MainContext);
	const handleDrawerToggle = () => {
		dispatch({ type: DRAWER });
	};
	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar id="nav" color="default" className={classes.appBar}>
				<Toolbar>
					<IconButton edge="start" onClick={handleDrawerToggle} className={classes.menuButtonNav} color="inherit" aria-label="menu">
						<MdMenu />
					</IconButton>
					<Link to="/">
						<img
							className={classes.logo}
							src="https://res.cloudinary.com/qualifier/image/upload/v1585843340/Default/QualifierLogo_epvtl9.svg"
							alt="Qualifier-logo"
							border="0"
						/>
					</Link>
					<div className={classes.grow} />

					<Hidden mdDown>
						<ul>
							<li className={classes.li}>
								<MegaMenu>
									<span style={{ color: "#0a5494" }}>
										Exam <MdExpandMore />
									</span>
								</MegaMenu>
							</li>
							<li className={classes.li}>
								<Link to="/online-test-series">Test Series</Link>
							</li>
							<li className={classes.li}>
								<Link to="/courses">Courses</Link>
							</li>
							<li className={classes.li}>
								<Link to="/practice">Practice</Link>
							</li>
						</ul>

						{state.isAuthenticated ? (
							<Link to="/dashboard">
								<Avatar alt="User" src={state.userImage} />
							</Link>
						) : (
							<span id="loginBtn">
								<ul>
									<li className={classes.li}>
										<Link to="/login">Login</Link>
									</li>
									<li className={classes.li}>
										<Link to="/signup">Sign Up</Link>
									</li>
								</ul>
							</span>
						)}
					</Hidden>
					<Hidden lgUp>
						{state.isAuthenticated ? (
							<Link to="/dashboard">
								<Avatar alt="User" src={state.userImage} />
							</Link>
						) : (
							<Link to="/login">
								<IconButton aria-label="Login Up" aria-haspopup="true" color="secondary">
									<MdAccountCircle />
								</IconButton>
							</Link>
						)}
					</Hidden>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export function FullNav(props) {
	const classes = useStyles();
	const { state, dispatch } = useContext(MainContext);
	const handleDrawerToggle = () => {
		dispatch({ type: DRAWER });
	};

	return (
		<Suspense fallback={<div />}>
			<div className={classes.root}>
				<AppBar position="static" style={{ backgroundColor: "rgb(255,255,255)" }}>
					<Container>
						<Toolbar disableGutters variant="dense">
							<IconButton edge="start" onClick={handleDrawerToggle} className={classes.menuButtonNav} color="primary" aria-label="menu">
								<MdMenu />
							</IconButton>
							<Link to="/">
								<img
									className={classes.logo}
									src="https://res.cloudinary.com/qualifier/image/upload/v1585843340/Default/QualifierLogo_epvtl9.svg"
									alt="Qualifier-logo"
									border="0"
								/>
							</Link>
							<span className={classes.grow} />
							<Hidden smDown>
								<ul>
									<li className={classes.li}>
										<MegaMenu>
											<span style={{ color: "#0a5494" }}>
												Exam <MdExpandMore />
											</span>
										</MegaMenu>
									</li>
									<li className={classes.li}>
										<Link to="/online-test-series">Test Series</Link>
									</li>
									<li className={classes.li}>
										<Link to="/practice">Practice</Link>
									</li>
									<li className={classes.li}>
										<Link to="/blog">Blog & News</Link>
									</li>
									<li className={classes.li}>
										<Link to="/pricing">Pricing</Link>
									</li>
									<li className={classes.li}>
										<Link to="/contact">Contact</Link>
									</li>
								</ul>

								{state.isAuthenticated ? (
									<Link to="/dashboard">
										<Avatar alt="User" src={state.userImage} />
									</Link>
								) : (
									<span id="loginBtn">
										<ul>
											<li className={classes.li}>
												<Link to="/login">Login</Link>
											</li>
											<li className={classes.li}>
												<Link to="/signup">Sign Up</Link>
											</li>
										</ul>
									</span>
								)}
							</Hidden>

							<Hidden mdUp>
								<span className={classes.grow} />
								{state.isAuthenticated ? (
									<Link to="/dashboard">
										<Avatar alt="User" src={state.userImage} />
									</Link>
								) : (
									<Link to="/login">
										<IconButton aria-label="Login Up" aria-haspopup="true" color="secondary">
											<MdAccountCircle />
										</IconButton>
									</Link>
								)}
							</Hidden>
						</Toolbar>
					</Container>
				</AppBar>
				<div className={classes.menuButtonNav}>
					<MyDrawer />
				</div>
			</div>
		</Suspense>
	);
}

export function HideOnScroll(props) {
	const { children, window } = props;

	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		threshold: 300,
	});
	return (
		<Suspense fallback={<div />}>
			<Slide in={trigger}>
				<AppBar>{children}</AppBar>
			</Slide>
		</Suspense>
	);
}

HideOnScroll.propTypes = {
	children: PropTypes.element.isRequired,
	window: PropTypes.func,
};
