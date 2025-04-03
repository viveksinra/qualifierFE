import React, { useContext, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { DRAWER } from "../Context/types";
import { MainContext } from "../Context/MainContext";
import { CssBaseline, Container, useScrollTrigger, Hidden, AppBar, Toolbar, IconButton, Avatar, Slide } from "@mui/material";
import { styled } from '@mui/material/styles';
import { MdMenu, MdExpandMore, MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
const MegaMenu = lazy(() => import("./MegaMenu"));
const MyDrawer = lazy(() => import("./MyDrawer"));

let drawerWidth = 240;

const StyledRootDiv = styled('div')(({ theme }) => ({
	display: "flex",
	"& a": {
		textDecoration: "none",
		display: "inline",
		color: "#0a5494",
	},
}));

const StyledGrowDiv = styled('div')(({ theme }) => ({
	flexGrow: 1,
}));

const StyledLogoImg = styled('img')(({ theme }) => ({
	maxHeight: "50px",
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
	[`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
	},
}));

const StyledMenuButtonNav = styled(IconButton)(({ theme }) => ({
	[`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
		display: "none",
	},
}));

const StyledLi = styled('li')(({ theme }) => ({
	display: "inline",
	fontSize: "medium",
	padding: "1rem",
}));

const StyledDrawerContainerDiv = styled('div')(({ theme }) => ({
	[`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
		display: "none",
	},
}));

export function Nav() {
	const { state, dispatch } = useContext(MainContext);
	const handleDrawerToggle = () => {
		dispatch({ type: DRAWER });
	};
	return (
		<StyledRootDiv>
			<CssBaseline />
			<StyledAppBar id="nav" color="default">
				<Toolbar>
					<StyledMenuButtonNav edge="start" onClick={handleDrawerToggle} color="inherit" aria-label="menu">
						<MdMenu />
					</StyledMenuButtonNav>
					<Link to="/">
						<StyledLogoImg
							src="https://res.cloudinary.com/qualifier/image/upload/v1585843340/Default/QualifierLogo_epvtl9.svg"
							alt="Qualifier-logo"
							border="0"
						/>
					</Link>
					<StyledGrowDiv />

					<Hidden mdDown>
						<ul>
							<StyledLi>
								<MegaMenu>
									<span style={{ color: "#0a5494" }}>
										Exam <MdExpandMore />
									</span>
								</MegaMenu>
							</StyledLi>
							<StyledLi>
								<Link to="/online-test-series">Test Series</Link>
							</StyledLi>
							<StyledLi>
								<Link to="/courses">Courses</Link>
							</StyledLi>
							<StyledLi>
								<Link to="/practice">Practice</Link>
							</StyledLi>
						</ul>

						{state.isAuthenticated ? (
							<Link to="/dashboard">
								<Avatar alt="User" src={state.userImage} />
							</Link>
						) : (
							<span id="loginBtn">
								<ul>
									<StyledLi>
										<Link to="/login">Login</Link>
									</StyledLi>
									<StyledLi>
										<Link to="/signup">Sign Up</Link>
									</StyledLi>
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
			</StyledAppBar>
		</StyledRootDiv>
	);
}

export function FullNav(props) {
	const { state, dispatch } = useContext(MainContext);
	const handleDrawerToggle = () => {
		dispatch({ type: DRAWER });
	};

	return (
		<Suspense fallback={<div />}>
			<StyledRootDiv>
				<AppBar position="static" style={{ backgroundColor: "rgb(255,255,255)" }}>
					<Container>
						<Toolbar disableGutters variant="dense">
							<StyledMenuButtonNav edge="start" onClick={handleDrawerToggle} color="primary" aria-label="menu">
								<MdMenu />
							</StyledMenuButtonNav>
							<Link to="/">
								<StyledLogoImg
									src="https://res.cloudinary.com/qualifier/image/upload/v1585843340/Default/QualifierLogo_epvtl9.svg"
									alt="Qualifier-logo"
									border="0"
								/>
							</Link>
							<StyledGrowDiv component="span" />
							<Hidden smDown>
								<ul>
									<StyledLi>
										<MegaMenu>
											<span style={{ color: "#0a5494" }}>
												Exam <MdExpandMore />
											</span>
										</MegaMenu>
									</StyledLi>
									<StyledLi>
										<Link to="/online-test-series">Test Series</Link>
									</StyledLi>
									<StyledLi>
										<Link to="/practice">Practice</Link>
									</StyledLi>
									<StyledLi>
										<Link to="/blog">Blog & News</Link>
									</StyledLi>
									<StyledLi>
										<Link to="/pricing">Pricing</Link>
									</StyledLi>
									<StyledLi>
										<Link to="/contact">Contact</Link>
									</StyledLi>
								</ul>

								{state.isAuthenticated ? (
									<Link to="/dashboard">
										<Avatar alt="User" src={state.userImage} />
									</Link>
								) : (
									<span id="loginBtn">
										<ul>
											<StyledLi>
												<Link to="/login">Login</Link>
											</StyledLi>
											<StyledLi>
												<Link to="/signup">Sign Up</Link>
											</StyledLi>
										</ul>
									</span>
								)}
							</Hidden>

							<Hidden mdUp>
								<StyledGrowDiv component="span" />
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
				<StyledDrawerContainerDiv>
					<MyDrawer />
				</StyledDrawerContainerDiv>
			</StyledRootDiv>
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
