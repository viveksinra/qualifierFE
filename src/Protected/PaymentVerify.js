import React, { Fragment, useState, useEffect } from "react";
import { FullNav } from "../Components/Navigation/Nav";
import Footer from "../Components/Footer/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Typography, makeStyles, Paper, Grid, Table, Fab, TableRow, TableCell, TableBody } from "@mui/material";

const useStyles = makeStyles((theme) => ({
	topBg: {
		height: "30vh",
		paddingTop: theme.spacing(8),
		backgroundColor: "#00b7ff",
		backgroundImage:
			"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='540' height='450' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='.1'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/svg%3E\")",
	},
	container: {
		marginTop: theme.spacing(-15),
	},
	paper: { padding: theme.spacing(3), borderTopLeftRadius: "20px", borderTopRightRadius: "20px" },
	success: {
		backgroundColor: "#dbf0fd",
		borderRadius: "20px",
		minHeight: "400px",
	},
	successTag: {
		borderTopLeftRadius: "20px",
		borderTopRightRadius: "20px",
		backgroundColor: "#c8f9c5",
		height: "40px",
		color: "#1b8f12",
		textAlign: "center",
		fontSize: "1.6rem",
	},
	img: {
		maxWidth: "400px",
	},
	transac: {
		display: "flex",
		alignContent: "right",
		alignItems: "right",
		textAlign: "center",
		backgroundColor: "#1b8f12",
		borderTopLeftRadius: "20px",
		borderBottomLeftRadius: "20px",
		color: "#fff",
		padding: theme.spacing(),
		paddingLeft: theme.spacing(5),
		fontSize: "1.3rem",
	},
	fail: {
		backgroundColor: "#f7d7c8",
		borderRadius: "20px",
		minHeight: "400px",
	},
	failTag: {
		borderTopLeftRadius: "20px",
		borderTopRightRadius: "20px",
		backgroundColor: "#efc9e8",
		height: "40px",
		color: "#f72a2a",
		textAlign: "center",
		fontSize: "1.6rem",
	},
	transacFail: {
		display: "flex",
		alignContent: "right",
		alignItems: "right",
		textAlign: "center",
		backgroundColor: "#ff6666",
		borderTopLeftRadius: "20px",
		borderBottomLeftRadius: "20px",
		color: "#fff",
		padding: theme.spacing(),
		paddingLeft: theme.spacing(5),
		fontSize: "1.3rem",
	},
}));

export default function PaymentVerify(props) {
	const [success, setSuccess] = useState(null);
	const [data, setData] = useState({});
	useEffect(() => {
		let status = props.match.params.status;
		let paymentId = props.match.params.paymentId;
		axios
			.get(`/api/other/pstatus/${status}/${paymentId}`)
			.then((res) => setData(res.data))
			.then(() => {
				if (status === "success") {
					setSuccess(true);
				} else setSuccess(false);
			})
			.catch((err) => console.log(err));
	}, [props.match.params]);

	const classes = useStyles();
	return (
		<Fragment>
			<FullNav />
			<div className={classes.topBg}>
				<Typography variant="h5" style={{ color: "#fff" }} align="center">
					Payment Verification
				</Typography>
			</div>
			<Container className={classes.container} maxWidth="md">
				<Paper className={classes.paper}>
					{success ? (
						<div className={classes.success}>
							<p className={classes.successTag}>Congratulations ! Transaction Successful. </p>
							<Grid container spacing={4}>
								<Grid item xs={12} md={6}>
									<center>
										<img className={classes.img} src="https://i.ibb.co/HY5XT9n/happypeople.png" alt="happy" />
									</center>
								</Grid>
								<Grid item xs={12} md={6}>
									<Typography variant="subtitle1" align="right" gutterBottom color="textSecondary">
										Thanks for the purchasing the course.
									</Typography>
									<br />
									<span className={classes.transac}>TRANSACTION DETAILS</span>
									<Table size="small" aria-label="Transaction-Data">
										<TableBody>
											{data.map((d) => (
												<TableRow key={d.name}>
													<TableCell align="right">{d.name}</TableCell>
													<TableCell> {d.value} </TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
									<br />
									<center>
										<Link to="/dashboard">
											<Fab size="small" variant="extended" color="primary">
												Go to Dashboard
											</Fab>
										</Link>
									</center>
								</Grid>
							</Grid>
						</div>
					) : success === false ? (
						<div className={classes.fail}>
							<p className={classes.failTag}>It seeems, something went wrong. </p>
							<Grid container spacing={4}>
								<Grid item xs={12} md={6}>
									<center>
										<img className={classes.img} src="https://i.ibb.co/nLsY5nN/fail.png" alt="sad" />
									</center>
								</Grid>
								<Grid item xs={12} md={6}>
									<Typography variant="subtitle1" align="right" gutterBottom color="textSecondary">
										Thanks for your patience.
									</Typography>
									<br />
									<span className={classes.transacFail}>Fail Payment Details</span>
									<Table size="small" aria-label="Transaction-Data">
										<TableBody>
											{data.map((d) => (
												<TableRow key={d.name}>
													<TableCell align="right">{d.name}</TableCell>
													<TableCell> {d.value} </TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
									<br />
									<center>
										<Link to="/pricing">
											<Fab size="small" variant="extended" color="primary">
												Try Again
											</Fab>
										</Link>
									</center>
								</Grid>
							</Grid>
						</div>
					) : (
						<div>
							<center>
								<Typography variant="h5" color="primary" align="center">
									Loading... <br />
									Please Wait a second
								</Typography>
							</center>
						</div>
					)}
				</Paper>
			</Container>
			<Footer />
		</Fragment>
	);
}
