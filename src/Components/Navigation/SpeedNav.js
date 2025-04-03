import React, { useState } from "react";
import { SpeedDial, SpeedDialAction, SpeedDialIcon, Box } from "@mui/material";
import { styled } from "@mui/material";
import { Link } from "react-router-dom";
import { FcInspection, FcOrgUnit, FcHome, FcBookmark, FcManager } from "react-icons/fc";

const SpeedContainer = styled("div")(({ theme }) => ({
	position: "fixed",
	bottom: 0,
	zIndex: 100,
	right: 0,
}));

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
	position: "absolute",
	"&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
		bottom: theme.spacing(2),
		right: theme.spacing(2),
	},
	"&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
		top: theme.spacing(2),
		left: theme.spacing(2),
	},
	"& span": {
		fontSize: 22,
	},
}));

function SpeedNav() {
	const [open, setOpen] = useState(true);

	const actions = [
		{ icon: <FcInspection />, name: "Test Series", link: "/online-test-series" },
		{ icon: <FcOrgUnit />, name: "Practice", link: "/practice" },
		{ icon: <FcBookmark />, name: "Saved Question", link: "/savequestion" },
		{ icon: <FcManager />, name: "My Profile", link: "/profile" },
		{ icon: <FcHome />, name: "Dashboard", link: "/dashboard" },
	];

	return (
		<Box sx={{ display: { md: "block", xs: "none" } }}>
			<SpeedContainer>
				<StyledSpeedDial
					ariaLabel="SpeedDial"
					icon={<SpeedDialIcon style={{ fontSize: 0 }} />}
					onClose={() => setOpen(false)}
					onOpen={() => setOpen(true)}
					FabProps={{ color: "secondary", size: "medium" }}
					open={open}
				>
					{actions.map((a) => (
						<SpeedDialAction 
							key={a.name} 
							icon={<Link to={a.link}>{a.icon}</Link>} 
							tooltipTitle={a.name} 
							onClick={() => setOpen(false)} 
						/>
					))}
				</StyledSpeedDial>
			</SpeedContainer>
		</Box>
	);
}

export default SpeedNav;
