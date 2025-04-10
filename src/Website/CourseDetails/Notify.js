import React, { Suspense, useEffect, useState } from "react";
import { styled, Dialog, Button, Slide, DialogActions, CircularProgress, DialogContent, Typography } from "@mui/material";
import { FcFlashOn, FcAdvance } from "react-icons/fc";
import { Link } from "react-router-dom";
import axios from "axios";
import { isQualifier } from "../../theme";

const StyledImage = styled('img')({
	maxWidth: "100%",
	maxHeight: "100%",
	display: "block",
});

function Notify({ notify, onClose, params }) {
	const [data, setData] = useState({ image: "", courseTitle: "", description: "Please Wait, The Data is Loading...", title: "Now" });
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		let active = true;
		if (notify.open) {
			axios
				.post(`/api/public/fixcourse/get/detail`, { ...params })
				.then((res) => {
					if (active) {
						setData(res.data);
						setLoading(false);
					}
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		}
		return () => (active = false);
	}, [notify.open, params]);
	return (
		<Suspense fallback={null}>
			<Dialog open={notify.open} onClose={() => onClose({ open: false, link: "" })} TransitionComponent={Slide} TransitionProps={{ direction: "up" }}>
				<DialogContent>
					{loading ? (
						<div style={{ minHeight: 300 }} className="center">
							<CircularProgress />
						</div>
					) : (
						<div className="center">
							<StyledImage src={data.image} alt={data.courseTitle} />
						</div>
					)}

					<Typography paragraph align="center" color="textSecondary">
						{data.description}
					</Typography>

			{isQualifier &&	<center>
						<Link to={notify.link ? notify.link : "/practice"}>
							<Button endIcon={<FcAdvance style={{ fontSize: 20 }} />} disabled={loading} size="small" variant="outlined" color="secondary">
								{`Start ${data.title}`}
							</Button>
						</Link>
					</center>}
				</DialogContent>
				<DialogActions>
					<Link to="/pricing">
						<Button size="small" startIcon={<FcFlashOn style={{ fontSize: 20, float: "right" }} />} color="secondary">
							Upgrade
						</Button>
					</Link>
				</DialogActions>
			</Dialog>
		</Suspense>
	);
}

export default Notify;
