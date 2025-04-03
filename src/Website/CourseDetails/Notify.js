import React, { Suspense, useEffect, useState } from "react";
import { makeStyles, Dialog, Button, Slide, DialogActions, CircularProgress, DialogContent, Typography } from "@material-ui/core";
import { FcFlashOn, FcAdvance } from "react-icons/fc";
import { Link } from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
	img: {
		maxWidth: "100%",
		maxHeight: "100%",
		display: "block",
	},
}));

function Notify({ notify, onClose, match }) {
	const classes = useStyles();
	const [data, setData] = useState({ image: "", courseTitle: "", description: "Please Wait, The Data is Loading...", title: "Now" });
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		let active = true;
		if (notify.open) {
			axios
				.post(`/api/public/fixcourse/get/detail`, { ...match.params })
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
	}, [notify.open, match.params]);
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
							<img src={data.image} className={classes.img} alt={data.courseTitle} />
						</div>
					)}

					<Typography paragraph align="center" color="textSecondary">
						{data.description}
					</Typography>

					<center>
						<Link to={notify.link ? notify.link : "/practice"}>
							<Button endIcon={<FcAdvance style={{ fontSize: 20 }} />} disabled={loading} size="small" variant="outlined" color="secondary">
								{`Start ${data.title}`}
							</Button>
						</Link>
					</center>
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
