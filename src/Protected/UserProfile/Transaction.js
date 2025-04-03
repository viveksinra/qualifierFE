import React, { useState, useEffect, Fragment } from "react";
import { Button, Typography, Grid, Table, TableBody,
	 TableRow, TableCell, Chip, Card } from "@mui/material";
import { styled } from '@mui/material/styles';
import axios from "axios";
import NoContent from "../../Components/NoContent";
import { Link } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";

const PREFIX = 'Transaction';
const classes = {
	tansTop: `${PREFIX}-tansTop`,
	transCard: `${PREFIX}-transCard`,
	statusRibbon: `${PREFIX}-statusRibbon`
};

const StyledFragment = styled(Fragment)(({ theme }) => ({
	[`& .${classes.tansTop}`]: {
		height: "160px",
		backgroundRepeat: "repeat",
		backgroundImage:
			`url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%2361adbd' fill-opacity='0.36' fill-rule='evenodd'/%3E%3C/svg%3E")`,
	},
	[`& .${classes.transCard}`]: {
		height: 375,
		marginLeft: "auto",
		marginRight: "auto",
		width: 290,
	},
	[`& .${classes.statusRibbon}`]: {
		fontSize: "14px",
		fontWeight: 700,
		lineHeight: "2.6em",
		textAlign: "center",
		width: "10em",
		position: "relative",
		top: "1.4285em",
		left: "-2.8571em",
		zIndex: 20,
		transform: "rotate(-45deg)",
		color: "#fff",
		textTransform: "capitalize",
	},
}));

export default function Transaction() {
	const [transData, setTransData] = useState([]);
	useEffect(() => {
		axios
			.get("/api/other/setting/transaction")
			.then((res) => setTransData(res.data))
			.catch((err) => console.log(err));
	}, []);

	return (
		<StyledFragment>
			<div className={classes.tansTop}>
				<Typography align="center" gutterBottom variant="h5" color="primary">
					Transaction Details
				</Typography>
			</div>
			{transData.length === 0 ? (
				<NoContent msg="No Transaction History" />
			) : (
				<Grid container spacing={2}>
					{transData.map((d) => (
						<Grid item key={d.refNo} xs={12} md={4}>
							<Card elevation={3} className={classes.transCard}>
								<div className={classes.statusRibbon} style={{ background: d.success ? "#2ec948" : "#f96868" }}>
									{d.success ? "Success" : "Failure"}
								</div>

								<center>
									<Chip label={d.plan} variant="outlined" color="primary" />
								</center>
								<br />
								<Typography align="center" color="textSecondary">{`Payment Date : ${d.payDate}`}</Typography>
								<br />
								<Table size="small" aria-label="Transaction-Data">
									<TableBody>
										<TableRow hover>
											<TableCell size="small" align="right" style={{ width: "50%" }}>
												<Typography variant="body1" color="secondary">
													Amount
												</Typography>
											</TableCell>
											<TableCell size="small">
												<Typography variant="body1" color="secondary">
													{d.amount}
												</Typography>
											</TableCell>
										</TableRow>

										<TableRow hover>
											<TableCell size="small" align="right" style={{ width: "50%" }}>
												Validity
											</TableCell>
											<TableCell size="small">{d.validity}</TableCell>
										</TableRow>
										<TableRow hover>
											<TableCell size="small" align="right" style={{ width: "50%" }}>
												Bank
											</TableCell>
											<TableCell size="small">{d.bank}</TableCell>
										</TableRow>
										<TableRow hover>
											<TableCell size="small" align="right" style={{ width: "50%" }}>
												Mode
											</TableCell>
											<TableCell size="small">{d.mode}</TableCell>
										</TableRow>
										<TableRow hover>
											<TableCell size="small" align="right" style={{ width: "50%" }}>
												Access
											</TableCell>
											<TableCell size="small">{d.accessType}</TableCell>
										</TableRow>
									</TableBody>
								</Table>
								<br />
								<Typography align="center" color="textSecondary">{`Ref  : ${d.refNo}`}</Typography>
							</Card>
						</Grid>
					))}
				</Grid>
			)}
			<br />
			<center>
				<Link to="/pricing">
					<Button variant="outlined" size="small" color="primary">
						<FaCloudUploadAlt style={{ marginRight: 10 }} />
						Upgrade Now
					</Button>
				</Link>
			</center>
			<br />
		</StyledFragment>
	);
}
