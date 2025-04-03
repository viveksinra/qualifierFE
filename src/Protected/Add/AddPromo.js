import React, { Fragment, useState, useEffect, useRef } from "react";
import useStyles from "./useStyles";
import MySnackbar from "../../Components/MySnackbar";
import {
	Grid,
	Chip,
	Paper,
	TextField,
	Table,
	TableHead,
	TableRow,
	Tooltip,
	Radio,
	Fab,
	MenuItem,
	RadioGroup,
	FormControlLabel,
	TableCell,
	TableBody,
	TableFooter,
	TablePagination,
	Input,
	Divider,
} from "@material-ui/core";
import axios from "axios";
import { MdSearch, MdDoneAll, MdClearAll, MdDeleteForever } from "react-icons/md";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function AddPromo() {
	const classes = useStyles();
	const [id, setId] = useState("");
	const [promoCode, setPromo] = useState("");
	const [userDiscount, setUserDis] = useState("");
	const [maxDiscount, setMaxDiscount] = useState("");
	const [isforOverall, setIsOverall] = useState(true);
	const [uniqueMax, setUniqueMax] = useState("");
	const [influencer, setInf] = useState(null);
	const [influencerCredit, setInfCred] = useState("");
	const [maxCredit, setMaxCredit] = useState("");
	const [validCriteria, setValidCriteria] = useState("");
	const [validTime, setValidTime] = useState("");
	const [tMoreThan, setTMoreThan] = useState("");
	const [validityFrom, setValidFrom] = useState("");
	const [validityTo, setValidTo] = useState("");
	const [count, setCount] = useState("");
	const [message, setMsg] = useState("");
	const [allPromo, setAllPromo] = useState([]);
	const [allInflu, setAllInflu] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [err] = useState({ errIn: "", msg: "" });
	const snackRef = useRef();
	useEffect(() => {
		getData("");
		axios
			.get("/api/other/promocode/influencer")
			.then((res) => setAllInflu(res.data))
			.catch((err) => console.log(err));
	}, []);
	const getData = async (word) => {
		await axios
			.get(`/api/other/promocode/getall/${word}`)
			.then((res) => setAllPromo(res.data))
			.catch((err) => console.log(err));
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		let promoData = {
			_id: id,
			promoCode,
			userDiscount,
			maxDiscount,
			isforOverall,
			uniqueMax,
			influencerId: influencer ? influencer._id : "",
			validOn: "fullpass",
			influencerCredit,
			maxCredit,
			validCriteria,
			validTime,
			tMoreThan,
			validity: { from: validityFrom, to: validityTo },
			count,
			message,
		};
		await axios
			.post(`/api/other/promocode/${id}`, promoData)
			.then((res) => {
				snackRef.current.handleSnack(res.data);
				getData("");
				handleClear();
			})
			.catch((err) => console.log(err));
	};
	const handleClear = () => {
		setId("");
		setPromo("");
		setUserDis("");
		setMaxDiscount("");
		setIsOverall(true);
		setUniqueMax("");
		setInf(null);
		setInfCred("");
		setMaxCredit("");
		setValidCriteria("");
		setValidTime("");
		setTMoreThan("");
		setValidFrom("");
		setValidTo("");
		setCount("");
		setMsg("");
	};
	const setData = async (id) => {
		await axios
			.get(`/api/other/promocode/get/${id}`)
			.then((res) => {
				setId(res.data._id);
				setPromo(res.data.promoCode);
				setUserDis(res.data.userDiscount);
				setMaxDiscount(res.data.maxDiscount);
				setIsOverall(res.data.isforOverall);
				setUniqueMax(res.data.uniqueMax);
				setInf(res.data.influencer);
				setInfCred(res.data.influencerCredit);
				setMaxCredit(res.data.maxCredit);
				setValidCriteria(res.data.validCriteria);
				setValidTime(res.data.validTime);
				setTMoreThan(res.data.tMoreThan);
				setValidFrom(res.data.validityFrom);
				setValidTo(res.data.validityTo);
				setCount(res.data.count);
				setMsg(res.data.message);
			})
			.catch((err) => console.log(err));
	};

	const handleDelete = (id) => {
		axios
			.delete(`/api/other/promocode/delete/${id}`)
			.then((res) => {
				snackRef.current.handleSnack(res.data);
				getData("");
			})
			.catch((err) => console.log(err));

		handleClear();
	};
	const handleErr = (errIn) => {
		switch (errIn) {
			case "promoCode":
				// if(promoCode.length  < 10){
				//     setErr({errIn:"mobileNo", msg:"Enter 10 Digits Mobile No."})
				// }else setErr({errIn:"", msg:""})
				break;
			default:
				break;
		}
	};

	const todayDate = () => {
		var d = new Date(),
			month = "" + (d.getMonth() + 1),
			day = "" + d.getDate(),
			year = d.getFullYear();
		if (month.length < 2) month = "0" + month;
		if (day.length < 2) day = "0" + day;
		return year + "-" + month + "-" + day;
	};
	return (
		<Fragment>
			<Grid container>
				<Grid item xs={12} md={9}>
					<Paper className={classes.entryArea}>
						<form onSubmit={(e) => handleSubmit(e)} style={{ maxWidth: "100vw" }}>
							<Grid container spacing={2}>
								<Grid item xs={4}></Grid>
								<Grid item xs={4}>
									<center>
										<Chip color="primary" label="Add Promo Code" />
									</center>
								</Grid>
								<Grid item xs={4}></Grid>
								<Grid item xs={12} md={4}>
									<TextField
										variant="outlined"
										required
										fullWidth
										inputProps={{ maxLength: "25" }}
										// onBlur={() => handleErr("title")}
										error={err.errIn === "title" ? true : false}
										label={err.errIn === "title" ? err.msg : "Promo Code"}
										placeholder="Type Promo Code.."
										value={promoCode}
										onChange={(e) => setPromo(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} md={4}>
									<TextField
										variant="outlined"
										required
										type="number"
										fullWidth
										onBlur={() => handleErr("userDiscount")}
										error={err.errIn === "userDiscount" ? true : false}
										label={err.errIn === "userDiscount" ? err.msg : "User Discount"}
										placeholder="User Discount (%)"
										value={userDiscount}
										onChange={(e) => setUserDis(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} md={4}>
									<TextField
										variant="outlined"
										required
										type="number"
										fullWidth
										error={err.errIn === "maxDiscount" ? true : false}
										label={err.errIn === "maxDiscount" ? err.msg : "Maximum Discount"}
										placeholder="Rs Max. Discount"
										value={maxDiscount}
										onChange={(e) => setMaxDiscount(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} md={4}>
									<RadioGroup aria-label="position" value={isforOverall} onChange={() => setIsOverall(!isforOverall)} name="position" row>
										<FormControlLabel value={true} control={<Radio color="primary" />} label="For All User" labelPlacement="end" />
										<FormControlLabel value={false} control={<Radio color="primary" />} label="Personal Ref " labelPlacement="end" />
									</RadioGroup>
								</Grid>
								<Grid item xs={12} md={4}>
									<TextField
										variant="outlined"
										fullWidth
										type="number"
										helperText="Minimum = 1"
										label="Unique Maximum"
										inputProps={{ min: "1" }}
										placeholder="Max users can get"
										value={uniqueMax}
										onChange={(e) => setUniqueMax(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} md={4}>
									<TextField variant="outlined" fullWidth label="Valid On (Access Type)" placeholder="" value="fullpass" disabled />
								</Grid>
								<Grid item xs={12} md={4}>
									<Autocomplete
										options={allInflu}
										getOptionLabel={(option) => option.name}
										onChange={(e, v) => {
											setInf(v);
										}}
										value={influencer}
										renderInput={(params) => <TextField {...params} label="Select Influencer" variant="outlined" fullWidth />}
									/>
								</Grid>
								<Grid item xs={12} md={4}>
									<TextField
										variant="outlined"
										fullWidth
										required
										type="number"
										label="Influencer Credit"
										placeholder="Credit in (%)"
										value={influencerCredit}
										onChange={(e) => setInfCred(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} md={4}>
									<TextField
										variant="outlined"
										fullWidth
										required
										type="number"
										label="Influencer Maximum Credit"
										placeholder="Credit in (Rs)"
										value={maxCredit}
										onChange={(e) => setMaxCredit(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} md={4}>
									<TextField
										variant="outlined"
										fullWidth
										select
										label="Valid Criteria"
										value={validCriteria}
										onChange={(e) => setValidCriteria(e.target.value)}
									>
										<MenuItem value="all">All Plans </MenuItem>
										<MenuItem value="validtime">Valid on Time</MenuItem>
										<MenuItem value="tmorethan">More than Time </MenuItem>
									</TextField>
								</Grid>
								<Grid item xs={12} md={4}>
									<TextField
										variant="outlined"
										fullWidth
										type="number"
										helperText="Same days as Plan validity"
										label="Valid Time"
										value={validTime}
										onChange={(e) => setValidTime(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} md={4}>
									<TextField
										variant="outlined"
										fullWidth
										type="number"
										placeholder="more then ..... days plan."
										helperText="Valid on plan, that has more days then this."
										label="Time More Than (Days)"
										value={tMoreThan}
										onChange={(e) => setTMoreThan(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} md={4}>
									<TextField
										variant="outlined"
										fullWidth
										type="date"
										required
										InputLabelProps={{
											shrink: true,
										}}
										inputProps={{ min: todayDate() }}
										label="Valid From"
										value={validityFrom}
										onChange={(e) => setValidFrom(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} md={4}>
									<TextField
										variant="outlined"
										fullWidth
										required
										inputProps={{ min: todayDate() }}
										type="date"
										InputLabelProps={{
											shrink: true,
										}}
										label="Valid To"
										value={validityTo}
										onChange={(e) => setValidTo(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} md={4}>
									<TextField
										variant="outlined"
										fullWidth
										type="number"
										label="Count"
										helperText="Max number this code can use"
										value={count}
										onChange={(e) => setCount(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<TextField
										variant="outlined"
										fullWidth
										required
										inputProps={{ maxLength: "75" }}
										label="Enter Short Message"
										value={message}
										onChange={(e) => setMsg(e.target.value)}
									/>
								</Grid>
								<Grid item xs={12}>
									<Divider />
								</Grid>
								<Grid item xs={12}>
									<center>
										<Tooltip title={id === "" ? "Save" : "Update"}>
											<Fab color="primary" type="submit" className={classes.button}>
												<MdDoneAll />
											</Fab>
										</Tooltip>
										<Tooltip title="Clear All">
											<Fab size="small" color="secondary" onClick={() => handleClear()} className={classes.button}>
												<MdClearAll />
											</Fab>
										</Tooltip>
										{id !== "" && (
											<Tooltip title="Delete">
												<Fab size="small" color="secondary" onClick={() => handleDelete(id)} className={classes.button}>
													<MdDeleteForever />
												</Fab>
											</Tooltip>
										)}
									</center>
								</Grid>
							</Grid>
						</form>
					</Paper>
				</Grid>
				<Grid item xs={12} md={3}>
					{/* Search Section */}
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<MdSearch />
						</div>
						<Input
							placeholder="Search Promo..."
							onChange={(e) => getData(e.target.value)}
							disableUnderline
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
						/>
					</div>
					<div className={classes.searchResult}>
						<Paper>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell component="th" scope="row">
											Search Results
										</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{allPromo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => (
										<TableRow key={data._id} onClick={() => setData(data._id)} hover>
											<TableCell component="td" scope="row">
												Promo : {data.promoCode} <br />
											</TableCell>
										</TableRow>
									))}
								</TableBody>
								<TableFooter>
									<TableRow>
										<TablePagination
											count={allPromo.length}
											rowsPerPage={rowsPerPage}
											page={page}
											onChangePage={(e, page) => setPage(page)}
											onChangeRowsPerPage={(r) => setRowsPerPage(r.target.value)}
										/>
									</TableRow>
								</TableFooter>
							</Table>
						</Paper>
					</div>
				</Grid>
			</Grid>
			<MySnackbar ref={snackRef} />
		</Fragment>
	);
}
