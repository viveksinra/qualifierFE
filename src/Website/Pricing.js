import React, { Fragment, useContext, useState, Suspense, useEffect } from "react";
import {
	styled,
	Paper,
	Container,
	Grid,
	Divider,
	CircularProgress,
	Typography,
	Fab,
	Collapse,
	InputBase,
	IconButton,
	Badge,
	Alert
} from "@mui/material";
import { FullNav, HideOnScroll } from "../Components/Navigation/Nav";
import FAQ from "../Components/FAQ";
import Footer from "../Components/Footer/Footer";
import { MainContext } from "../Components/Context/MainContext";
import right from "../img/right.svg";
import { Navigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import clsx from "clsx";
import { FaRupeeSign, FaArrowCircleRight, FaTrash, FaSketch } from "react-icons/fa";
import axios from "axios";
import { fetchData } from "../Components/Api";
const resource = fetchData("/api/other/price/get");

const StyledPriceTopBg = styled('div')(({ theme }) => ({
	backgroundColor: "#ffffff",
	backgroundImage:
		"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 800'%3E%3Cdefs%3E%3CradialGradient id='a' cx='400' cy='400' r='50%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%230EF'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='400' cy='400' r='70%25' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%230FF'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='800'/%3E%3Cg fill-opacity='.8'%3E%3Cpath fill='url(%23b)' d='M998.7 439.2c1.7-26.5 1.7-52.7 0.1-78.5L401 399.9c0 0 0-0.1 0-0.1l587.6-116.9c-5.1-25.9-11.9-51.2-20.3-75.8L400.9 399.7c0 0 0-0.1-0.1-0.1l537.3-265c-11.6-23.5-24.8-46.2-39.3-67.9L400.8 399.5c0 0 0-0.1-0.1-0.1l450.4-395c-17.3-19.7-35.8-38.2-55.5-55.5l-395 450.4c0 0-0.1 0-0.1-0.1L733.4-99c-21.7-14.5-44.4-27.6-68-39.3l-265 537.4c0 0-0.1 0-0.1 0l192.6-567.4c-24.6-8.3-49.9-15.1-75.8-20.2L400.2 399c0 0-0.1 0-0.1 0l39.2-597.7c-26.5-1.7-52.7-1.7-78.5-0.1L399.9 399c0 0-0.1 0-0.1 0L282.9-188.6c-25.9 5.1-51.2 11.9-75.8 20.3l192.6 567.4c0 0-0.1 0-0.1 0l-265-537.3c-23.5 11.6-46.2 24.8-67.9 39.3l332.8 498.1c0 0-0.1 0-0.1 0.1L4.4-51.1C-15.3-33.9-33.8-15.3-51.1 4.4l450.4 395c0 0 0 0.1-0.1 0.1L-99 66.6c-14.5 21.7-27.6 44.4-39.3 68l537.4 265c0 0 0 0.1 0 0.1l-567.4-192.6c-8.3 24.6-15.1 49.9-20.2 75.8L399 399.8c0 0 0 0.1 0 0.1l-597.7-39.2c-1.7 26.5-1.7 52.7-0.1 78.5L399 400.1c0 0 0 0.1 0 0.1l-587.6 116.9c5.1 25.9 11.9 51.2 20.3 75.8l567.4-192.6c0 0 0 0.1 0 0.1l-537.3 265c11.6 23.5 24.8 46.2 39.3 67.9l498.1-332.8c0 0 0 0.1 0.1 0.1l-450.4 395c17.3 19.7 35.8 38.2 55.5 55.5l395-450.4c0 0 0.1 0 0.1 0.1L66.6 899c21.7 14.5 44.4 27.6 68 39.3l265-537.4c0 0 0.1 0 0.1 0L207.1 968.3c24.6 8.3 49.9 15.1 75.8 20.2L399.8 401c0 0 0.1 0 0.1 0l-39.2 597.7c26.5 1.7 52.7 1.7 78.5 0.1L400.1 401c0 0 0.1 0 0.1 0l116.9 587.6c25.9-5.1 51.2-11.9 75.8-20.3L400.3 400.9c0 0 0.1 0 0.1 0l265 537.3c23.5-11.6 46.2-24.8 67.9-39.3L400.5 400.8c0 0 0.1 0 0.1-0.1l395 450.4c19.7-17.3 38.2-35.8 55.5-55.5l-450.4-395c0 0 0-0.1 0.1-0.1L899 733.4c14.5-21.7 27.6-44.4 39.3-68l-537.4-265c0 0 0-0.1 0-0.1l567.4 192.6c8.3-24.6 15.1-49.9 20.2-75.8L401 400.2c0 0 0-0.1 0-0.1L998.7 439.2z'/%3E%3C/g%3E%3C/svg%3E\")",
	backgroundAttachment: "fixed",
	backgroundSize: "cover",
	textAlign: "center",
	height: "30vh",
}));

const StyledPracticsTop = styled(Paper)(({ theme }) => ({
	marginTop: "-11vh",
	zIndex: 2,
	marginBottom: "30px",
}));

const StyledCross = styled(Divider)(({ theme }) => ({
	marginLeft: "auto",
	marginRight: "auto",
	transform: "rotate(35deg)",
}));

const StyledUl = styled('ul')(({ theme }) => ({
	lineHeight: 1.6,
	listStyleType: "none",
	listStyleImage: `url(${right})`,
	"& li": {
		lineHeight: 1.5,
		paddingLeft: 8,
		color: "#0a5494",
	},
}));

export default function Pricing() {
	document.title = "Pricing : Qualifier - Online Test Series & Practice - Railway, SSC, Banking, Placement Papers & CBSE Exams For FREE";
	return (
		<Fragment>
			<FullNav />
			<HideOnScroll>
				<FullNav />
			</HideOnScroll>
			<StyledPriceTopBg />

			<Container maxWidth="md">
				<StyledPracticsTop>
					<Grid container spacing={2}>
						<Grid item xs={12} md={5} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
							<Typewriter
								options={{
									strings: ["Trusted by 154820+ Student", "Accelerate your Performance", "Study Smart - Be Smart"],
									autoStart: true,
									loop: true,
									wrapperClassName: "typewriter2",
									cursorClassName: "typewriter2",
								}}
							/>
						</Grid>
						<Grid item xs={12} className="hideInMob" md={2}>
							<StyledCross orientation="vertical" />
						</Grid>
						<Grid item xs={12} md={5} className="center">
							<StyledUl>
								<li>Get Quality Questions</li>
								<li>Report in Depth</li>
								<li>No Hidden Charge</li>
								<li>No Advertisement</li>
							</StyledUl>
						</Grid>
					</Grid>
				</StyledPracticsTop>
			</Container>

			<Suspense
				fallback={
					<center>
						<CircularProgress />
					</center>
				}
			>
				<PriceCard />
			</Suspense>
			<br />
			<br />
			<Suspense>
				<FAQ />
				<Footer />
			</Suspense>
		</Fragment>
	);
}

export const PriceCard = () => {
	const { pricingBg, priceCard, plan, firstCard, secondCard, thirdCard, cross, vilidityText, priceText, fab, promoPaper } = usePriceCardStyles();
	const [priceData, setPriceData] = useState(resource.data.read());
	const [redirect, setRedirect] = useState(false);
	const [alert, setAlert] = useState({ open: false, variant: "success", message: "Promo Code Applied, Successfully !" });
	const [promo, setPromo] = useState("");
	const [showPromo, setShowPromo] = useState(false);
	const { state } = useContext(MainContext);

	const handlePromo = (ref) => {
		if (ref) {
			axios
				.get(`/api/other/promocode/check/${ref}`)
				.then((res) => {
					setAlert({ open: true, ...res.data.alert });
					if (res.data.alert.variant === "success") {
						setPriceData({ finalArray: res.data.finalArray });
					}
				})
				.catch((err) => console.log(err));
		} else {
			setAlert({ open: true, variant: "warning", message: "Please Enter the promo code to get discount." });
		}
	};
	useEffect(() => {
		if (state.referral) {
			setPromo(state.referral);
			handlePromo(state.referral);
		}
	}, [state.referral]);
	const handlePay = (p) => {
		if (state.isAuthenticated) {
			if (p) {
				axios
					.post("/api/paytm/pay", { priceId: p.id, fullPass: true, referalCode: promo })
					.then((res) => {
						window.location.href = res.data;
					})
					.catch((err) => console.log(err));
			}
		} else {
			setRedirect(true);
		}
	};

	if (redirect) {
		return <Navigate to="/login" />;
	}
	return (
		<div className={pricingBg}>
			<Collapse in={!alert.open}>
				<Container>
					<Alert color="info" icon={<FaSketch />}>
						Grab the Best Discount & Enjoy the Full Study. | Apply Promo code TEST15 and Grab additional 15 % OFF, valid till 31 Dec 2020.
					</Alert>
				</Container>
			</Collapse>
			<Collapse in={alert.open}>
				<Container>
					<Alert severity={alert.variant}>{alert.message}</Alert>
				</Container>
			</Collapse>
			<br />
			<Container>
				<Grid container id="pc" spacing={4}>
					{priceData &&
						priceData.finalArray.map((p, i) => (
							<Grid item xs={12} key={i} md={4}>
								<div
									onClick={() => handlePay(p)}
									className={clsx(priceCard, i === 0 ? firstCard : i === 1 ? secondCard : thirdCard)}
								>
									<Typography align="center" className={plan} variant="h6">
										{p.plan}
									</Typography>
									<Grid container spacing={2}>
										<Grid item xs={5}>
											<Typography align="center" color="primary" className={vilidityText} variant="h5">
												<b>{p.period}</b> Days
											</Typography>

											<Typography style={{ paddingLeft: "80px" }} variant="body2" color="textSecondary">
												All Access
											</Typography>
										</Grid>
										<Grid item xs={2}>
											<Divider orientation="vertical" style={{ height: "6rem" }} className={cross} />
										</Grid>
										<Grid item xs={5}>
											<Typography variant="body2" color="textSecondary">
												<br />
												Just At {"\u00A0"}
												<strike>
													<FaRupeeSign /> {p.oldPrice} /-
												</strike>
											</Typography>
											<Typography align="center" color="primary" className={priceText} variant="h5">
												{"\u00A0"} {"\u00A0"} <FaRupeeSign /> {p.price} /-
											</Typography>
										</Grid>
									</Grid>

									<center>
										<Badge color="secondary" badgeContent={`${p.off}`}>
											<Fab variant="extended" size="medium" color="primary" className={fab} aria-label="add">
												Buy Now
												<FaArrowCircleRight style={{ fontSize: "1.5rem", paddingLeft: "10px" }} />
											</Fab>
										</Badge>
									</center>
								</div>
							</Grid>
						))}
				</Grid>
				<Grid item xs={12} style={{ marginTop: "50px" }}>
					<Collapse in={!showPromo}>
						<Typography onClick={() => setShowPromo(true)} align="center" variant="subtitle2" color="textSecondary" style={{ cursor: "grab" }}>
							Have a Promo Code ?
						</Typography>
					</Collapse>

					<Collapse in={showPromo}>
						<Paper component="form" className={promoPaper}>
							<InputBase
								style={{ marginLeft: 10, flex: 1 }}
								autoFocus
								value={promo}
								onChange={(e) => setPromo(e.target.value)}
								placeholder="Enter Promo Code..."
							/>
							<IconButton
								size="small"
								style={{ padding: 10 }}
								aria-label="hide-Promo"
								onClick={() => {
									setShowPromo(false);
									setPromo("");
									setAlert({ open: false, variant: "success", message: "" });
								}}
							>
								<FaTrash />
							</IconButton>
							<Divider style={{ height: 28, margin: 4 }} orientation="vertical" />
							<IconButton color="primary" style={{ padding: 10 }} onClick={() => handlePromo(promo)} aria-label="applyPromo">
								<svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
									<path d="M21.71 11.29l-9-9a.9959.9959 0 00-1.41 0l-9 9c-.39.39-.39 1.02 0 1.41l9 9c.39.39 1.02.39 1.41 0l9-9c.39-.38.39-1.01 0-1.41zM14 14.5V12h-4v3H8v-4c0-.55.45-1 1-1h5V7.5l3.5 3.5-3.5 3.5z"></path>
								</svg>
							</IconButton>
						</Paper>
					</Collapse>
				</Grid>
			</Container>
		</div>
	);
};

const usePriceCardStyles = () => {
	return {
		pricingBg: {
			paddingTop: "30px",
			paddingBottom: "30px",
			backgroundPosition: `50% 97%`,
			backgroundRepeat: "no-repeat",
			backgroundImage:
				"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' width='1600' height='424'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='%23FFF' d='M0 381.894c32.7 22.218 71.305 39.823 132.333 39.823 166.667 0 166.667-58.568 333.334-58.568C632.333 363.149 632.333 423 799 423c166.667 0 166.667-105.465 333.333-105.465 166.667 0 166.667 101.759 333.334 101.759 62.748 0 101.031-5.25 134.333-11.795v15.58L0 423v-41.106z'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 369.514c32.688 28.926 71.342 51.814 132.333 51.814 166.667 0 166.667-76.316 333.334-76.316C632.333 345.012 632.333 423 799 423c166.667 0 166.667-137.424 333.333-137.424C1299 285.576 1299 418.17 1465.667 418.17c62.692 0 101.05-6.828 134.333-15.347' opacity='.5'/%3E%3Cpath stroke='%235468FF' vector-effect='non-scaling-stroke' d='M0 368.476c32.684 28.662 71.352 51.34 132.333 51.34 166.667 0 166.667-84.785 333.334-84.785C632.333 335.03 632.333 422 799 422c166.667 0 166.667-147.86 333.333-147.86 166.667 0 166.667 137.753 333.334 137.753 62.399 0 101.151-9.534 134.333-21.463'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 367.41c32.688 28.412 71.343 50.896 132.333 50.896 166.667 0 166.667-93.214 333.334-93.214C632.333 325.092 632.333 421 799 421c166.667 0 166.667-158.246 333.333-158.246C1299 262.754 1299 405.64 1465.667 405.64c62.705 0 101.046-12.412 134.333-27.897' opacity='.5'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 367.044c32.688 28.322 71.343 50.734 132.333 50.734C299 417.778 299 315.575 465.667 315.575 632.333 315.575 632.333 421 799 421c166.667 0 166.667-169.577 333.333-169.577 166.667 0 166.667 148.864 333.334 148.864 62.356 0 101.166-15.103 134.333-34.009' stroke-dasharray='10'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 365.962c32.69 28.081 71.336 50.305 132.333 50.305C299 416.267 299 305.62 465.667 305.62 632.333 305.62 632.333 420 799 420c166.667 0 166.667-180 333.333-180C1299 240 1299 394.038 1465.667 394.038c62.572 0 101.092-17.98 134.333-40.437' opacity='.5'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 365.718c32.689 27.926 71.339 50.027 132.333 50.027C299 415.745 299 296.297 465.667 296.297 632.333 296.297 632.333 420 799 420c166.667 0 166.667-191 333.333-191C1299 229 1299 388.709 1465.667 388.709c62.132 0 101.243-20.515 134.333-46.25' opacity='.5'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 364.581c32.686 27.716 71.348 49.649 132.333 49.649C299 414.23 299 286.19 465.667 286.19 632.333 286.19 632.333 419 799 419c166.667 0 166.667-201.667 333.333-201.667 166.667 0 166.667 165.098 333.334 165.098 62.628 0 101.072-23.642 134.333-53.158' opacity='.5'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 364.438c32.688 27.508 71.34 49.28 132.333 49.28C299 413.718 299 277.133 465.667 277.133 632.333 277.133 632.333 419 799 419c166.667 0 166.667-212.26 333.333-212.26 166.667 0 166.667 170.43 333.334 170.43 62.294 0 101.187-26.149 134.333-58.898' opacity='.5'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 363.289c32.69 27.304 71.334 48.915 132.333 48.915C299 412.204 299 267.069 465.667 267.069 632.333 267.069 632.333 418 799 418c166.667 0 166.667-222.87 333.333-222.87 166.667 0 166.667 175.78 333.334 175.78 62.501 0 101.116-29.098 134.333-65.47' opacity='.5'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 362.126c32.695 27.107 71.321 48.566 132.333 48.566C299 410.692 299 256.998 465.667 256.998 632.333 256.998 632.333 417 799 417c166.667 0 166.667-233.49 333.333-233.49 166.667 0 166.667 181.14 333.334 181.14 62.376 0 101.159-31.747 134.333-71.477' opacity='.5'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 360.997c32.69 26.894 71.337 48.182 132.333 48.182C299 409.179 299 246.922 465.667 246.922 632.333 246.922 632.333 416 799 416c166.667 0 166.667-244.12 333.333-244.12 166.667 0 166.667 186.513 333.334 186.513 62.214 0 101.215-36.005 134.333-81.135' opacity='.5'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 361.183c32.688 26.77 71.342 47.96 132.333 47.96 166.667 0 166.5-188.393 333.167-188.393 166.667 0 166.833 195.75 333.5 195.75s166.833-286 333.5-286 166.5 222.943 333.167 222.943c62.192 0 101.222-45.734 134.333-103.07' opacity='.5'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 327c32.693 43.58 71.327 78.029 132.333 78.029C299 405.029 299 126.208 465.667 126.208 632.333 126.208 632.333 417 799 417 965.667 417 965.667 1.177 1132.333 1.177 1299 1.177 1299 314.39 1465.667 314.39c62.366 0 101.163-60.824 134.333-136.952' opacity='.5'/%3E%3C/g%3E%3C/svg%3E\")",
		},
		plan: {
			height: "5px",
			background: "radial-gradient(circle, rgba(199,231,246,0.23) 0%, rgba(72,252,255,0.28) 100%)",
			color: "#1c93cb",
			borderTopLeftRadius: "20px",
			borderTopRightRadius: "20px",
			paddingBottom: "40px",
		},
		priceCard: {
			height: "190px",
			marginTop: "10px",
			cursor: "grab",
			transition: "all .4s ease",
			maxWidth: "400px",
			borderRadius: "20px",
			"&:hover": {
				boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.4)",
				transform: "scale(1.05)",
			},
		},
		priceText: {
			color: "#1b8f12",
			marginTop: "10px",
			marginLeft: "-15px",
		},
		cross: {
			marginLeft: "auto",
			marginRight: "auto",
			transform: "rotate(35deg)",
		},
		vilidityText: {
			marginLeft: "20px",
			marginTop: "10px",
			color: "#fff",
		},
		fab: {
			position: "relative",
			bottom: "-2px",
			marginTop: "8px",
			background: "linear-gradient(to left, #a55eea, #45aaf2)",
		},
		firstCard: {
			background: "linear-gradient(0deg, rgba(75,123,236,0.9) 0%, rgba(45,253,163,0.9) 100%)",
		},
		secondCard: {
			background: "linear-gradient(0deg, rgba(38,222,129,0.9) 0%, rgba(45,253,163,0.9) 100%)",
		},
		thirdCard: {
			background: "linear-gradient(0deg, rgba(165,94,234,0.9) 0%, rgba(45,253,163,0.9) 100%)",
		},
		promoPaper: {
			padding: "2px 4px",
			margin: "0 auto",
			display: "flex",
			alignItems: "center",
			width: 300,
		},
	};
};
