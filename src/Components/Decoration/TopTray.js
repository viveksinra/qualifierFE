import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import { riskHawkBrandText } from "../../riskHawkTheme";
import { brandText } from "../../theme";

export default function TopTray() {
	return (
		<div style={{ height: 22, backgroundColor: "#0d1e30", color: "#fff", padding: "5px" }}>
			<Container maxWidth="md">
				<Grid container>
					<Grid item>
						{/* <a
							href="https://play.google.com/store/apps/details?id=com.softechinfra.android.qualifier"
							target="_blank"
							rel="noopener noreferrer"
							style={{ textDecoration: "none", display: "flex" }}
						>
							<img src="https://res.cloudinary.com/qualifier/image/upload/v1585585972/Default/google-play_bitak3.svg" alt="playstore" />
							<Typography variant="body2" style={{ color: "#fff", paddingLeft: 5 }}>
								Download APP
							</Typography>
						</a> */}
					</Grid>
					<span style={{ flexGrow: 1 }} />
					<Grid item>
						<a href="mailto:info@dynamatix.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "flex" }}>
							<img src="https://res.cloudinary.com/qualifier/image/upload/v1585590590/Default/mail_qr4l1o.svg" alt="playstore" />
							<Typography variant="body2" style={{ color: "#fff", paddingLeft: 5 }}>
								{brandText.contactEmail}
							</Typography>
						</a>
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}
