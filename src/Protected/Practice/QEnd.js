import React from "react";
import { FullNav } from "../../Components/Navigation/Nav";
import { AppBar, Container } from "@mui/material";

function QEnd() {
	return (
		<div>
			<AppBar>
				<FullNav />
			</AppBar>
			<Container>
				<img src="https://res.cloudinary.com/qualifier/image/upload/v1577619570/Important/rat_fynigu.jpg" alt="End" />
			</Container>
		</div>
	);
}

export default QEnd;
