import React, { Fragment, useState, useContext, useEffect, Suspense } from "react";
import "./login.css";
import NewsCard from "./NewsCard";
import { MainContext } from "../Context/MainContext";
import { REFERRAL } from "../Context/types";
import { Alert } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import {
	Grid,
	Button,
	Typography,
	TextField,
	Dialog,
	DialogTitle,
	InputAdornment,
	CircularProgress,
	DialogContent,
	DialogContentText,
	DialogActions,
} from "@mui/material";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signup() {
	const [name, setName] = useState("");
	const [mobileNo, setMobileNo] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPass, setShowPass] = useState(false);
	const [otpBox, setOtpBox] = useState(false);
	const [otp, setOtp] = useState("");
	const [redirect, setRedirect] = useState(false);
	const [err, setErr] = useState({ errIn: "", msg: "" });
	const [referral, setRef] = useState("");
	const [refDialog, setRefDia] = useState(false);
	const { state, dispatch } = useContext(MainContext);
	const [alert, setAlert] = useState({ open: false, message: "", variant: "success" });
	document.title =
		"Sign Up For FREE | Create a New Account - Qualifier : Online Test Series & Practice - Railway, SSC, Banking, Placement & CBSE Exams.";

	const handleErr = (errIn) => {
		switch (errIn) {
			case "mobileNo":
				if (mobileNo.length !== 10) {
					setErr({ errIn: "mobileNo", msg: "Enter 10 Digits Mobile No." });
				} else setErr({ errIn: "", msg: "" });
				break;
			case "password":
				if (password.length < 6) {
					setErr({ errIn: "password", msg: "Atleat 6 Digit Password" });
				} else setErr({ errIn: "", msg: "" });
				break;
			case "otp":
				if (otp.length !== 4) {
					setErr({ errIn: "otp", msg: "Enter 4 Digits O T P" });
				} else setErr({ errIn: "", msg: "" });
				break;

			default:
				break;
		}
	};
	useEffect(() => {
		if (state.referral) {
			setAlert({ open: true, message: `Referal Code : ${state.referral} is successfully applied.`, variant: "success" });
		}
	}, [state.referral]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const newUser = { name, designation: "User", emailId: email, mobileNo, password, referral: state.referral };
		await axios
			.post("/api/auth/verify/", newUser)
			.then((res) => {
				if (res.data.variant === "success") {
					setOtpBox(true);
				} else setAlert({ open: true, ...res.data });
			})
			.catch((err) => console.log(err));
	};

	const handleOTP = () => {
		const withOTP = { name, designation: "User", emailId: email, mobileNo, password, otp, referral: state.referral };
		axios
			.post("/api/auth/verifyotp", withOTP)
			.then((res) => {
				setAlert({ open: true, ...res.data });
				setOtpBox(false);
				setRedirect(true);
			})
			.catch((err) => console.log(err));
	};
	const handleRef = (ref) => {
		axios
			.get(`/api/other/promocode/verify/${ref}`)
			.then((res) => {
				setRefDia(false);
				if (res.data.alert.variant === "success") {
					dispatch({ type: REFERRAL, payload: { ref } });
				}
				setAlert({ open: true, ...res.data.alert });
			})
			.catch((err) => console.log(err));
	};

	if (redirect) {
		return <Navigate to="/login" replace />;
	}
	return (
		<Fragment>
			<Grid container>
				<Grid item md={6} className="hideInMob" id="loginLeft">
					<Suspense fallback={<CircularProgress />}>
						<NewsCard />
					</Suspense>
				</Grid>
				<Grid item md={6} id="loginRight">
					<Link to="/">
						<img src="https://i.ibb.co/Q9DyDpZ/Qualifier-Logo.png" alt="logo" />
					</Link>
					<form onSubmit={(e) => handleSubmit(e)}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<br />
								<Typography variant="h5" align="center" color="primary">
									Create a FREE Account
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									autoFocus
									label="Your Name"
									placeholder="Name..."
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									onBlur={() => handleErr("mobileNo")}
									error={err.errIn === "mobileNo" ? true : false}
									label={err.errIn === "mobileNo" ? err.msg : "Mobile No. (10 Digits)"}
									type="number"
									helperText="OTP will be sent on this Mobile No."
									placeholder="Mobile No."
									InputProps={{
										startAdornment: <InputAdornment position="start">+91 -</InputAdornment>,
									}}
									value={mobileNo}
									onChange={(e) => setMobileNo(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField fullWidth type="email" label="Email Id" placeholder="Email Id" value={email} onChange={(e) => setEmail(e.target.value)} />
							</Grid>
							<Grid item xs={12}>
								<TextField
									fullWidth
									required
									InputProps={{
										endAdornment: (
											<InputAdornment position="end" onClick={() => setShowPass(!showPass)}>
												{showPass ? <FaEye /> : <FaEyeSlash />}
											</InputAdornment>
										),
									}}
									type={showPass ? "text" : "password"}
									onBlur={() => handleErr("password")}
									error={err.errIn === "password" ? true : false}
									label={err.errIn === "password" ? err.msg : "Set your Password"}
									helperText="Min 6 Digits, A-Z, 0-9"
									placeholder="Set a new Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Grid>
							<Grid item xs={12}>
								<Button type="submit" variant="contained" color="primary" fullWidth>
									Create Now
								</Button>
							</Grid>
							<Grid item xs={12}>
								<Typography align="center" gutterBottom variant="subtitle2">
									Already have an account ? {"\u00A0"}
									<Link to="/login">Go to Login</Link>
								</Typography>
								{alert.open ? (
									<Alert severity={alert.variant}>{alert.message}</Alert>
								) : (
									<Typography align="center" onClick={() => setRefDia(!refDialog)} style={{ cursor: "grab" }} variant="subtitle2">
										Apply Referral Code
									</Typography>
								)}
							</Grid>
						</Grid>
					</form>
				</Grid>
			</Grid>

			<Dialog onClose={() => setOtpBox(false)} disableBackdropClick aria-labelledby="OTP-Box" open={otpBox}>
				<DialogTitle id="simple-dialog-title">
					Verify OTP sent on <b>+91 {mobileNo}</b>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>Just one step - toward your carrer, please enter the OTP here. We will send updates occasionally.</DialogContentText>
					<TextField
						autoFocus
						fullWidth
						variant="outlined"
						required
						type="number"
						onBlur={() => handleErr("otp")}
						error={err.errIn === "otp" ? true : false}
						label={err.errIn === "Enter the OTP" ? err.msg : "Enter Correct OTP Only"}
						helperText="Check OTP sent on the Mobile No."
						placeholder="O T P"
						value={otp}
						onChange={(e) => setOtp(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOtpBox(false)}>Cancel</Button>
					<Button onClick={() => handleOTP()} variant="contained" color="primary">
						Verify OTP NOW
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={refDialog}>
				<DialogTitle>Apply Referral Code</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Learn & Earn : Get Extra Discount on your purchase by appling Referral code and continue your study at Qualifier.
					</DialogContentText>
					<TextField
						autoFocus
						fullWidth
						margin="dense"
						label="Enter Referral Code"
						inputProps={{ maxLength: 15 }}
						value={referral}
						onChange={(e) => setRef(e.target.value)}
					/>
					<DialogActions>
						<Button onClick={() => setRefDia(false)} color="primary">
							Cancel
						</Button>
						<Button onClick={() => handleRef(referral)} color="primary">
							Apply
						</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
		</Fragment>
	);
}
