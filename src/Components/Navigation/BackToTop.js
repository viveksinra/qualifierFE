import React from "react";
import PropTypes from "prop-types";
import { 
	AppBar, 
	Toolbar, 
	Typography, 
	CssBaseline, 
	Box, 
	Container, 
	Fab, 
	Zoom 
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useScrollTrigger } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const ScrollTopRoot = styled('div')(({ theme }) => ({
	position: "fixed",
	bottom: theme.spacing(2),
	right: theme.spacing(2),
}));

function ScrollTop(props) {
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = (event) => {
		const anchor = (event.target.ownerDocument || document).querySelector("#back-to-top-anchor");

		if (anchor) {
			anchor.scrollIntoView({ behavior: "smooth", block: "center" });
		}
	};

	return (
		<Zoom in={trigger}>
			<ScrollTopRoot onClick={handleClick} role="presentation">
				{children}
			</ScrollTopRoot>
		</Zoom>
	);
}

ScrollTop.propTypes = {
	children: PropTypes.element.isRequired,
	window: PropTypes.func,
};

export default function BackToTop(props) {
	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar>
				<Toolbar>
					<Typography variant="h6">Scroll to see button</Typography>
				</Toolbar>
			</AppBar>
			<Toolbar id="back-to-top-anchor" />
			<Container>
				<Box my={2}>
					{[...new Array(12)]
						.map(
							() => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
						)
						.join("\n")}
				</Box>
			</Container>
			<ScrollTop {...props}>
				<Fab color="secondary" size="small" aria-label="scroll back to top">
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</React.Fragment>
	);
}
