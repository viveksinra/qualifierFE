// TODO:Risk Hawk Silent code

import React, { useContext, Suspense, lazy } from "react";
import PropTypes from "prop-types";
import { DRAWER } from "../Context/types";
import { MainContext } from "../Context/MainContext";
import { CssBaseline, Container, useScrollTrigger, 
	useMediaQuery, AppBar, Toolbar, IconButton, Avatar, Slide } from "@mui/material";
import { styled } from '@mui/material/styles';
import { MdMenu, MdExpandMore, MdAccountCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { brandImage } from "../../theme";
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

export function Nav() {
	const { state, dispatch } = useContext(MainContext);
	const isMobile = useMediaQuery(theme => theme.breakpoints.down('md'));
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
							src={brandImage.logo}
							alt="Qualifier-logo"
							border="0"
						/>
					</Link>
					<StyledGrowDiv />

					{!isMobile && (
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
					)}

					{state.isAuthenticated ? (
						<Link to="/dashboard">
							<Avatar alt="User" src={state.userImage} />
						</Link>
					) : (
						!isMobile && (
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
						)
					)}

					{isMobile && !state.isAuthenticated && (
						<Link to="/login">
							<IconButton aria-label="Login Up" aria-haspopup="true" color="secondary">
								<MdAccountCircle />
							</IconButton>
						</Link>
					)}
				</Toolbar>
			</StyledAppBar>
		</StyledRootDiv>
	);
}

export function FullNav(props) {
	const { state, dispatch } = useContext(MainContext);
	const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'));
	const isMediumDown = useMediaQuery(theme => theme.breakpoints.down('md'));
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
									src={brandImage.logo}
									alt="Qualifier-logo"
									border="0"
								/>
							</Link>
							<StyledGrowDiv component="span" />
							{!isMobile && (
								<ul>
									{/* <StyledLi>
										<MegaMenu>
											<span style={{ color: "#0a5494" }}>
												Exam <MdExpandMore />
											</span>
										</MegaMenu>
									</StyledLi> */}
									<StyledLi>
										<Link to="/online-test-series">Test Series</Link>
									</StyledLi>
									<StyledLi>
										<Link to="/practice">Practice</Link>
									</StyledLi>
									{/* <StyledLi>
										<Link to="/blog">Blog & News</Link>
									</StyledLi>
									<StyledLi>
										<Link to="/pricing">Pricing</Link>
									</StyledLi> */}
									<StyledLi>
										<Link to="/contact">Contact</Link>
									</StyledLi>
								</ul>
							)}

							{!isMobile && (
								state.isAuthenticated ? (
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
								)
							)}

							{isMediumDown && (
								<StyledGrowDiv component="span" />
							)}
							{isMediumDown && (
								state.isAuthenticated ? (
									<Link to="/dashboard">
										<Avatar alt="User" src={state.userImage} />
									</Link>
								) : (
									<Link to="/login">
										<IconButton aria-label="Login Up" aria-haspopup="true" color="secondary">
											<MdAccountCircle />
										</IconButton>
									</Link>
								)
							)}
						</Toolbar>
					</Container>
				</AppBar>
				{isMobile && (
					<MyDrawer />
				)}
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
