import React, { Fragment, useState, useRef, useContext, useEffect, Suspense } from "react";
import "./login.css";
import { MainContext } from "../Context/MainContext";
import { LOGIN_USER } from "../Context/types";
import MySnackbar from "../MySnackbar";
import { Link, Navigate, useParams } from "react-router-dom";
import NewsCard from "./NewsCard";
import { MdSend, MdRemoveRedEye, MdVisibilityOff } from "react-icons/md";
import {
	Grid,
	Divider,
	Button,
	Typography,
	Collapse,
	InputAdornment,
	CircularProgress,
	Chip,
	Avatar,
	TextField,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material";
import axios from "axios";
export default function Login() {
	const [loginId, setLoginId] = useState("");
	const [password, setPassword] = useState("");
	const [showPass, setShowPass] = useState(false);
	const [forgot, forgotBox] = useState(false);
	const [forgotData, setForgotData] = useState("");
	const [showOTP, setShowOTP] = useState(false);
	const [otp, setOTP] = useState("");
	const [allowPass, setPass] = useState(false);
	const [newPass, setNewPass] = useState("");
	const { state, dispatch } = useContext(MainContext);
	const snackRef = useRef();
	const params = useParams();
	document.title = "Login | Qualifier : Online Test Series & Practice - Railway, SSC, Banking, Placement Exams & CBSE Exams For FREE";

	// Don't redirect immediately when authenticated
	const shouldRedirect = true;

	const handleSubmit = async (e) => {
		e.preventDefault();
		const user = { emu: loginId, password };
		await axios
			.post("/api/auth/login", user)
			.then((res) => {
				if (res.data.success) {
					dispatch({ type: LOGIN_USER, payload: res.data });
				} else {
					snackRef.current.handleSnack(res.data);
				}
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		if (params.token) {
			if (state.referral){
				dispatch({ type: LOGIN_USER, payload: { token: params.token } });
				axios
					.get(`/api/auth/google/getdata/${state.referral}`)
					.then((res) => {
						dispatch({ type: LOGIN_USER, payload: res.data });
					})
					.catch((err) => console.log(err));
		
			} else {
				dispatch({ type: LOGIN_USER, payload: { token: params.token } });
				axios
					.get(`/api/auth/google/getdata/`)
					.then((res) => {
						dispatch({ type: LOGIN_USER, payload: res.data });
					})
					.catch((err) => console.log(err));
			}
		}
	}, [params.token, dispatch, state.referral]);
	const sendOTP = () => {
		axios.post(`api/auth/getfotp/${forgotData}`).then((res) => {
			if (res.data.variant === "success") {
				setShowOTP(true);
			}
			snackRef.current.handleSnack(res.data);
		});
	};

	const handleVerify = () => {
		axios.post(`api/auth/verifyfotp/${forgotData}/${otp}`).then((res) => {
			if (res.data.variant === "success") {
				setPass(true);
			}
			snackRef.current.handleSnack(res.data);
		});
	};
	const handleforgot = () => {
		if (!showOTP) {
			sendOTP();
		} else {
			if (newPass.length > 5) {
				axios.post(`api/auth/changepassword/${forgotData}/${otp}/${newPass}`).then((res) => {
					if (res.data.variant === "success") {
						forgotBox(false);
						setShowOTP(false);
						setPass(false);
					}
					snackRef.current.handleSnack(res.data);
				});
			} else snackRef.current.handleSnack({ message: "Enter Strong Password", variant: "error" });
		}
	};

	const googleLogin = () => {
		axios
			.get("/api/auth/google")
			.then((res) => {
				window.location.href = res.data;
			})
			.catch((err) => {
				console.log(err);
			});
	};

	if (state.isAuthenticated && shouldRedirect) {
		switch (state.designation) {
			case "User":
				return <Navigate to="/dashboard" replace />;
			case "Admin":
				return <Navigate to="/admin/dashboard" replace />;
			case "Manager":
				return <Navigate to="/admin/dashboard" replace />;

			default:
				return <Navigate to="/login" replace />;
		}
	}
	
	return (
		<Fragment>
			<Grid container>
				<Grid item md={6} className="hideInMob" id="loginLeft">
					<Suspense fallback={<CircularProgress style={{ marginLeft: "50%", marginTop: 50 }} />}>
						<NewsCard />
					</Suspense>
				</Grid>
				<Grid item md={6} id="loginRight">
					<form onSubmit={(e) => handleSubmit(e)}>
						<Grid container spacing={4}>
							<Grid item size={{xs: 12}} >
								<Typography variant="h4" color="primary">
									Login to
								</Typography>
								<Link to="/">
									<img src="https://i.ibb.co/Q9DyDpZ/Qualifier-Logo.png" alt="logo" />
								</Link>
							</Grid>
							<Grid item size={{xs: 12}} >
								<center>
									<Chip
										onClick={() => googleLogin()}
										avatar={<Avatar alt="Google" src="https://i.ibb.co/3NTc9MD/Gicon.png" />}
										label="Login With Google"
										variant="outlined"
									/>
								</center>
							</Grid>
							<Grid item size={{xs: 12}} >
								<Divider />
							</Grid>
							<Grid item size={{xs: 12}} >
								<TextField
									variant="outlined"
									required
									fullWidth
									autoFocus
									label="Login Id"
									placeholder="Email / Mobile No."
									value={loginId}
									onChange={(e) => setLoginId(e.target.value)}
								/>
							</Grid>
							<Grid item size={{xs: 12}} >
								<TextField
									fullWidth
									variant="outlined"
									required
									InputProps={{
										endAdornment: (
											<InputAdornment position="end" onClick={() => setShowPass(!showPass)}>
												{showPass ? <MdRemoveRedEye /> : <MdVisibilityOff />}
											</InputAdornment>
										),
									}}
									type={showPass ? "text" : "password"}
									label="Password"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Grid>
							<Grid item size={{xs: 12}} >
								<Button type="submit" variant="contained" color="primary" fullWidth>
									Sign In
								</Button>
							</Grid>

							<Grid item size={{xs: 12}} >
								<Typography style={{ cursor: "grab" }} onClick={() => forgotBox(true)} gutterBottom align="center">
									Forgot Password ?
								</Typography>
								<Typography align="center" variant="subtitle2">
									Don't have an account ? {"\u00A0"}
									<Link to="/signup">Create Free Account</Link>
								</Typography>
							</Grid>
						</Grid>
					</form>
				</Grid>
			</Grid>
			<Dialog onClose={() => forgotBox(false)} disableBackdropClick aria-labelledby="Forgot-Box" open={forgot}>
				<DialogTitle>Reset your Password</DialogTitle>
				<DialogContent>
					<Grid container spacing={1}>
						<Grid item size={{xs: 12}} >
							<TextField
								autoFocus
								fullWidth
								variant="outlined"
								required
								InputProps={{
									endAdornment: (
										<InputAdornment position="end" onClick={() => sendOTP()}>
											<MdSend />
										</InputAdornment>
									),
								}}
								label="Enter Mobile No. / Email Id"
								placeholder="10 Digit Mobile No. / Email id"
								value={forgotData}
								onChange={(e) => setForgotData(e.target.value)}
							/>
						</Grid>
						<Grid item size={{xs: 12}} >
							<center>
								<Collapse in={showOTP}>
									<TextField
										variant="filled"
										required
										type="number"
										label="Enter OTP"
										placeholder="O T P"
										value={otp}
										onChange={(e) => setOTP(e.target.value)}
									/>
									<Button style={{ marginTop: 10, marginLeft: 10 }} onClick={() => handleVerify()} variant="outlined" color="primary">
										Verify OTP
									</Button>
								</Collapse>
							</center>
						</Grid>

						<Grid item size={{xs: 12}} >
							<Collapse in={allowPass}>
								<TextField
									variant="outlined"
									required
									fullWidth
									label="Enter New Password"
									helperText="Minimum length 6, A-Z | 0-9"
									placeholder="Abcde@2020"
									value={newPass}
									onChange={(e) => setNewPass(e.target.value)}
								/>
							</Collapse>
						</Grid>
					</Grid>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => forgotBox(false)}>Cancel</Button>
					<Button onClick={() => handleforgot()} variant="contained" color="primary">
						{showOTP ? "Reset Now" : "Send OTP"}
					</Button>
				</DialogActions>
			</Dialog>
			<MySnackbar ref={snackRef} />
		</Fragment>
	);
}
