import React, { Fragment, useMemo, useState } from "react";
import {
	makeStyles,
	Container,
	Grid,
	Card,
	Typography,
	Divider,
	List,
	Tabs,
	Tab,
	ListItem,
	ListItemText,
	Button,
	withWidth,
} from "@material-ui/core";
import "../TestHome/common.css";
import { Link } from "react-router-dom";
import { FullOffer } from "../../Components/Decoration/OfferCard";
import { FcFlashOn, FcApproval } from "react-icons/fc";
import clsx from "clsx";
import { fetchData } from "../../Components/Api";
const resource = fetchData("/api/bigtest/testbundle/main/get");

const seriesSyle = makeStyles((theme) => ({
	bundle: {
		padding: "20px 0px",
	},
	header: {
		height: 80,
		color: "#2196f3",
		fontSize: 30,
		textAlign: "center",
	},
	catgWise: {
		minHeight: 600,
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	},
	tabs: {
		borderRight: `1px solid ${theme.palette.divider}`,
	},
}));
function SeriesList({ width }) {
	const classes = seriesSyle();
	const [tab, setTab] = useState("All");
	const [Tseries, setT] = useState([]);
	const [allCatg, setCatg] = useState([]);
	useMemo(() => {
		const Ts = resource.data.read();
		setT(Ts);
		let cat = [];
		Tseries.map((t) => {
			const newC = cat.find((o) => o === t.category);
			if (newC !== t.category) {
				return cat.push(t.category);
			} else return null;
		});
		return setCatg(cat);
	}, [Tseries]);

	return (
		<Fragment>
			<div className={classes.bundle}>
				<Container>
					<div className={clsx(classes.header, "center")}>
						<FcFlashOn />
						<h6>Popular Test Series for Banking, SSC, Railways & CBSE</h6>
					</div>
					<br />
					<SeriesCard lg={3} data={Tseries.filter((f) => f.popular === true)} />
				</Container>
			</div>
			<FullOffer />
			<div className={classes.catgWise}>
				<Container>
					<Grid container spacing={2}>
						<Grid item xs={12} md={3}>
							<Typography variant="subtitle1" align="center" gutterBottom color="primary">
								Category Wise : Test Series
							</Typography>
							<Tabs
								orientation={width === "xs" || width === "sm" ? "horizontal" : "vertical"}
								variant="scrollable"
								textColor="secondary"
								value={tab}
								onChange={(e, v) => setTab(v)}
								className={classes.tabs}
							>
								<Tab label="All" value="All" />
								{allCatg.map((c, j) => (
									<Tab label={c} key={j} value={c} />
								))}
							</Tabs>
						</Grid>
						<Grid item xs={12} md={9}>
							<SeriesCard lg={4} data={tab === "All" ? Tseries : Tseries.filter((f) => f.category === tab)} />
						</Grid>
					</Grid>
				</Container>
			</div>
		</Fragment>
	);
}

export default withWidth()(SeriesList);

const cardSyle = makeStyles((theme) => ({
	cardBox: {
		display: "flex",
		justifyContent: "center",
		"& a": {
			textDecoration: "none",
		},
	},
	card: {
		height: 300,
		width: 230,
		padding: theme.spacing(2),
		overflow: "hidden",
		position: "relative",
		background: "linear-gradient(to bottom, #6dd5fa,  #C9D6FF, #ffffff)",
		// transition: "transform 0.1s",
		// "&:hover": {
		// 	background: "linear-gradient(to left, #6dd5fa,  #C9D6FF, #ffffff)",
		// 	transform: "scale(1.02)",
		// },
	},
	avatar: {
		height: theme.spacing(7),
	},
	icon: {
		fontSize: "larger",
		marginRight: 15,
	},
}));

function SeriesCard({ data, lg }) {
	const classes = cardSyle();
	return (
		<Grid container spacing={2}>
			{data.map((t, i) => (
				<Grid item xs={12} sm={6} lg={lg} key={i} className={classes.cardBox}>
					<Card className={clsx(classes.card, "shine")} elevation={3}>
						<Link to={`/test/${t.link}`}>
							<img className={classes.avatar} alt={t.title} src={t.logo} />
							<Typography noWrap variant="h6">
								{t.title}
							</Typography>
							<Grid container>
								<Grid item>
									<Typography gutterBottom>{`${t.totalTest} Total Test`}</Typography>
								</Grid>
								<span style={{ flexGrow: 0.1 }} />
								<Grid item>
									<Typography gutterBottom style={{ color: "#e500ff" }}>{`  |  ${t.totalFree} Free Test`}</Typography>
								</Grid>
							</Grid>
							<Divider light />
							<List dense style={{ height: 135, overflow: "hidden" }}>
								{t.desp &&
									t.desp.map((l, j) => (
										<ListItem dense key={j} style={{ paddingTop: 1, paddingBottom: 1 }}>
											<FcApproval className={classes.icon} />
											{/* <img src="https://res.cloudinary.com/qualifier/image/upload/v1585479266/Default/check-mark_zbl05t.svg" alt="Right" /> */}
											<ListItemText disableTypography primary={l.title} />
										</ListItem>
									))}
							</List>
							<Divider light />
							<center>
								<Button size="small" style={{ marginTop: 5 }} variant="outlined" color="primary">
									View All
								</Button>
							</center>
						</Link>
					</Card>
				</Grid>
			))}
		</Grid>
	);
}
