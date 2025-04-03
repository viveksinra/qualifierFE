import React, { useState, Fragment, useEffect, useRef, lazy } from "react";
import { Nav } from "../../Components/Navigation/Nav";
import MySnackbar from "../../Components/MySnackbar";
import Account from "./Account";
import Transaction from "./Transaction";
import {
	makeStyles,
	Input,
	Paper,
	Tabs,
	Button,
	Tab,
	Typography,
	Avatar,
	Tooltip,
	RadioGroup,
	Radio,
	FormControlLabel,
	IconButton,
	Table,
	TableBody,
	TableRow,
	TableCell,
} from "@material-ui/core";
import { FaIdCard, FaUserTag, FaReceipt, FaTelegramPlane, FaMale, FaFemale, FaUser } from "react-icons/fa";
import axios from "axios";
const MyDrawer = lazy(() => import("../../Components/Navigation/MyDrawer"));

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	toolbar: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		padding: theme.spacing(2),
	},
	profileTop: {
		height: "160px",
		backgroundRepeat: "no-repeat",
		backgroundImage:
			"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none' width='1600' height='424'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath fill='%23FFF' d='M0 381.894c32.7 22.218 71.305 39.823 132.333 39.823 166.667 0 166.667-58.568 333.334-58.568C632.333 363.149 632.333 423 799 423c166.667 0 166.667-105.465 333.333-105.465 166.667 0 166.667 101.759 333.334 101.759 62.748 0 101.031-5.25 134.333-11.795v15.58L0 423v-41.106z'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 369.514c32.688 28.926 71.342 51.814 132.333 51.814 166.667 0 166.667-76.316 333.334-76.316C632.333 345.012 632.333 423 799 423c166.667 0 166.667-137.424 333.333-137.424C1299 285.576 1299 418.17 1465.667 418.17c62.692 0 101.05-6.828 134.333-15.347' opacity='.5'/%3E%3Cpath stroke='%235468FF' vector-effect='non-scaling-stroke' d='M0 368.476c32.684 28.662 71.352 51.34 132.333 51.34 166.667 0 166.667-84.785 333.334-84.785C632.333 335.03 632.333 422 799 422c166.667 0 166.667-147.86 333.333-147.86 166.667 0 166.667 137.753 333.334 137.753 62.399 0 101.151-9.534 134.333-21.463'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 367.41c32.688 28.412 71.343 50.896 132.333 50.896 166.667 0 166.667-93.214 333.334-93.214C632.333 325.092 632.333 421 799 421c166.667 0 166.667-158.246 333.333-158.246C1299 262.754 1299 405.64 1465.667 405.64c62.705 0 101.046-12.412 134.333-27.897' opacity='.5'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 367.044c32.688 28.322 71.343 50.734 132.333 50.734C299 417.778 299 315.575 465.667 315.575 632.333 315.575 632.333 421 799 421c166.667 0 166.667-169.577 333.333-169.577 166.667 0 166.667 148.864 333.334 148.864 62.356 0 101.166-15.103 134.333-34.009' stroke-dasharray='10'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 365.962c32.69 28.081 71.336 50.305 132.333 50.305C299 416.267 299 305.62 465.667 305.62 632.333 305.62 632.333 420 799 420c166.667 0 166.667-180 333.333-180C1299 240 1299 394.038 1465.667 394.038c62.572 0 101.092-17.98 134.333-40.437' opacity='.5'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 365.718c32.689 27.926 71.339 50.027 132.333 50.027C299 415.745 299 296.297 465.667 296.297 632.333 296.297 632.333 420 799 420c166.667 0 166.667-191 333.333-191C1299 229 1299 388.709 1465.667 388.709c62.132 0 101.243-20.515 134.333-46.25' opacity='.5'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 364.581c32.686 27.716 71.348 49.649 132.333 49.649C299 414.23 299 286.19 465.667 286.19 632.333 286.19 632.333 419 799 419c166.667 0 166.667-201.667 333.333-201.667 166.667 0 166.667 165.098 333.334 165.098 62.628 0 101.072-23.642 134.333-53.158' opacity='.5'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 364.438c32.688 27.508 71.34 49.28 132.333 49.28C299 413.718 299 277.133 465.667 277.133 632.333 277.133 632.333 419 799 419c166.667 0 166.667-212.26 333.333-212.26 166.667 0 166.667 170.43 333.334 170.43 62.294 0 101.187-26.149 134.333-58.898' opacity='.5'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 363.289c32.69 27.304 71.334 48.915 132.333 48.915C299 412.204 299 267.069 465.667 267.069 632.333 267.069 632.333 418 799 418c166.667 0 166.667-222.87 333.333-222.87 166.667 0 166.667 175.78 333.334 175.78 62.501 0 101.116-29.098 134.333-65.47' opacity='.5'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 362.126c32.695 27.107 71.321 48.566 132.333 48.566C299 410.692 299 256.998 465.667 256.998 632.333 256.998 632.333 417 799 417c166.667 0 166.667-233.49 333.333-233.49 166.667 0 166.667 181.14 333.334 181.14 62.376 0 101.159-31.747 134.333-71.477' opacity='.5'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 360.997c32.69 26.894 71.337 48.182 132.333 48.182C299 409.179 299 246.922 465.667 246.922 632.333 246.922 632.333 416 799 416c166.667 0 166.667-244.12 333.333-244.12 166.667 0 166.667 186.513 333.334 186.513 62.214 0 101.215-36.005 134.333-81.135' opacity='.5'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 361.183c32.688 26.77 71.342 47.96 132.333 47.96 166.667 0 166.5-188.393 333.167-188.393 166.667 0 166.833 195.75 333.5 195.75s166.833-286 333.5-286 166.5 222.943 333.167 222.943c62.192 0 101.222-45.734 134.333-103.07' opacity='.5'/%3E%3Cpath stroke='%23C5C9E0' vector-effect='non-scaling-stroke' d='M0 327c32.693 43.58 71.327 78.029 132.333 78.029C299 405.029 299 126.208 465.667 126.208 632.333 126.208 632.333 417 799 417 965.667 417 965.667 1.177 1132.333 1.177 1299 1.177 1299 314.39 1465.667 314.39c62.366 0 101.163-60.824 134.333-136.952' opacity='.5'/%3E%3C/g%3E%3C/svg%3E\")",
		backgroundPosition: `50% 100%`,
	},
	profileImg: {
		width: theme.spacing(10),
		height: theme.spacing(10),
		marginLeft: "auto",
		marginRight: "auto",
	},
	profileTable: {
		marginTop: 20,
	},
}));

export default function MyProfile() {
	const classes = useStyles();
	const [tabVal, setTabVal] = useState(0);

	return (
		<div className={classes.root}>
			<Nav />
			<MyDrawer />
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Paper>
					<Tabs value={tabVal} indicatorColor="primary" textColor="primary" onChange={(e, v) => setTabVal(v)} aria-label="Tab">
						<Tab icon={<FaIdCard />} label="Profile" value={0} />
						<Tab icon={<FaUserTag />} label="Share & Earn" value={1} />
						<Tab icon={<FaReceipt />} label="Transaction" value={2} />
					</Tabs>
					<br />
					{tabVal === 0 && <Profile />}
					{tabVal === 1 && <Account />}
					{tabVal === 2 && <Transaction />}
				</Paper>
			</main>
		</div>
	);
}

function Profile() {
	const classes = useStyles();
	const [data, setData] = useState({
		fullName: "Guest",
		image: "",
		education: "",
		dob: "",
		gender: null,
		location: "",
	});
	useEffect(() => {
		axios
			.get("/api/other/setting/profile")
			.then((res) => setData(res.data))
			.catch((err) => console.log(err));
	}, []);
	const snackRef = useRef();

	const [edit, setEdit] = useState({
		fullName: false,
		education: false,
		dob: false,
		gender: null,
		location: false,
	});

	const changeMode = (n) => {
		let ch = { ...edit };
		ch[n] = !ch[n];
		setEdit(ch);
	};
	const handleChange = (e, n) => {
		let newObj = { ...data };
		newObj[n] = e;
		setData(newObj);
	};
	const handleSubmit = (n) => {
		// console.log({ [n]: data[n] });
		if (data[n]) {
			axios
				.post("/api/other/setting/profile/edit", { [n]: data[n] })
				.then((res) => {
					snackRef.current.handleSnack(res.data);
					changeMode(n);
				})
				.catch((err) => console.log(err));
		} else snackRef.current.handleSnack({ message: "Please Enter Value", variant: "error" });
	};
	const handleImg = (e) => {
		let reader = new FileReader();
		let file = e.target.files[0];
		reader.onloadend = () => {
			setData({ ...data, image: reader.result });
			if (e) {
				const imgData = new FormData();
				imgData.append("photo", file, file.name);
				axios
					.post(`/api/other/fileupload/upload`, imgData, {
						headers: {
							accept: "application/json",
							"Accept-Language": "en-US,en;q=0.8",
							"Content-Type": `multipart/form-data; boundary=${imgData._boundary}`,
						},
					})
					.then((res) => {
						axios
							.post("/api/other/setting/profile/edit", { image: res.data.result.secure_url })
							.then((res) => {
								snackRef.current.handleSnack(res.data);
							})
							.catch((err) => console.log(err));
					})
					.catch((err) => console.log(err));
			}
		};
		file && reader.readAsDataURL(file);
	};

	const edu = [
		{ name: "Class 6th or Below" },
		{ name: "Class 7th" },
		{ name: "Class 8th" },
		{ name: "Class 9th" },
		{ name: "Class 10th" },
		{ name: "Class 11th" },
		{ name: "Class 12th" },
		{ name: "Undergraduate" },
		{ name: "Graduate" },
		{ name: "Postgraduate" },
		{ name: "Others" },
	];
	return (
		<Fragment>
			<div className={classes.profileTop}>
				<Typography align="center" gutterBottom variant="h5" color="primary">
					Hello,
					{data.firstName}!
				</Typography>
				<input accept="image/*" style={{ display: "none" }} id="productImg" type="file" onChange={handleImg} />
				<label htmlFor="productImg">
					<Tooltip title="Click to Change Image" placement="right">
						<Avatar alt={data.fullName} className={classes.profileImg} src={data.image} />
					</Tooltip>
				</label>
			</div>

			<Table className={classes.profileTable} aria-label="Transaction-Data">
				<TableBody>
					<TableRow hover>
						<TableCell style={{ width: "50%" }} align="right">
							<b>Full Name</b>
						</TableCell>
						<TableCell>
							{edit.fullName ? (
								<Input
									defaultValue={data.fullName}
									onChange={(e) => handleChange(e.target.value, "fullName")}
									endAdornment={
										<IconButton size="small" onClick={() => handleSubmit("fullName")} color="primary">
											<FaTelegramPlane />
										</IconButton>
									}
								/>
							) : data.fullName ? (
								<Typography onClick={() => changeMode("fullName")} color="primary">
									{data.fullName}
								</Typography>
							) : (
								<Button size="small" onClick={() => changeMode("fullName")} color="secondary">
									Enter Name
								</Button>
							)}
						</TableCell>
					</TableRow>
					<TableRow hover>
						<TableCell style={{ width: "50%" }} align="right">
							<b>Education</b>
						</TableCell>
						<TableCell>
							{edit.education ? (
								<span>
									<select
										id="education"
										onChange={(e) => {
											handleChange(e.target.value, "education");
										}}
									>
										<option disabled>--Please choose an option--</option>
										{edu.map((e) => (
											<option key={e.name} value={e.name} label={e.name} />
										))}
									</select>
									<IconButton size="small" onClick={() => handleSubmit("education")} color="primary">
										<FaTelegramPlane />
									</IconButton>
								</span>
							) : data.education ? (
								<Typography color="primary" onClick={() => changeMode("education")}>
									{data.education}
								</Typography>
							) : (
								<Button size="small" onClick={() => changeMode("education")} color="secondary">
									Add Educational Details
								</Button>
							)}
						</TableCell>
					</TableRow>
					<TableRow hover>
						<TableCell style={{ width: "50%" }} align="right">
							<b>Date of Birth</b>
						</TableCell>
						<TableCell>
							{edit.dob ? (
								<Input
									defaultValue={data.dob}
									type="date"
									onChange={(e) => handleChange(e.target.value, "dob")}
									endAdornment={
										<IconButton size="small" onClick={() => handleSubmit("dob")} color="primary">
											<FaTelegramPlane />
										</IconButton>
									}
								/>
							) : data.dob ? (
								<Typography onClick={() => changeMode("dob")} color="primary">
									{data.dob}
								</Typography>
							) : (
								<Button onClick={() => changeMode("dob")} size="small" color="secondary">
									Add Birthday
								</Button>
							)}
						</TableCell>
					</TableRow>
					<TableRow hover>
						<TableCell style={{ width: "50%" }} align="right">
							<b>Gender</b>
						</TableCell>
						<TableCell>
							{edit.gender === null ? (
								<span>
									<RadioGroup
										row
										aria-label="gender"
										name="gender"
										value={data.gender}
										onChange={(e) => {
											handleChange(e.target.value, "gender");
										}}
									>
										<FormControlLabel value="male" control={<Radio icon={<FaMale />} color="primary" />} label="Male" />
										<FormControlLabel value="female" control={<Radio icon={<FaFemale />} color="primary" />} label="Female" />
										<FormControlLabel value="other" control={<Radio icon={<FaUser />} color="primary" />} label="Other" />
										<IconButton size="small" onClick={() => handleSubmit("gender")} color="primary">
											<FaTelegramPlane />
										</IconButton>
									</RadioGroup>
								</span>
							) : data.gender ? (
								<Typography onClick={() => changeMode("gender")} color="primary">
									{data.gender}
								</Typography>
							) : (
								<Button onClick={() => changeMode("gender")} size="small" color="secondary">
									Add Gender
								</Button>
							)}
						</TableCell>
					</TableRow>

					<TableRow hover>
						<TableCell style={{ width: "50%" }} align="right">
							<b>Location</b>
						</TableCell>
						<TableCell>
							{edit.location ? (
								<Input
									defaultValue={data.location}
									onChange={(e) => handleChange(e.target.value, "location")}
									endAdornment={
										<IconButton size="small" onClick={() => handleSubmit("location")} color="primary">
											<FaTelegramPlane />
										</IconButton>
									}
								/>
							) : data.location ? (
								<Typography onClick={() => changeMode("location")} color="primary">
									{data.location}
								</Typography>
							) : (
								<Button onClick={() => changeMode("location")} size="small" color="secondary">
									Enter Your Location
								</Button>
							)}
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
			<MySnackbar ref={snackRef} />
		</Fragment>
	);
}
