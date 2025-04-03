import React from "react";
import { Typography } from "@material-ui/core";

export default function NoContent({ msg }) {
	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
			<img src="https://res.cloudinary.com/qualifier/image/upload/v1585205058/no_results_found_obljgz.png" alt="No Content" />
			<br />
			<Typography align="center" color="textSecondary">
				{msg}
			</Typography>
		</div>
	);
}
