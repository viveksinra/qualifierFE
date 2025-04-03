import React, { Fragment, useState, Suspense } from "react";
import bankSvg from "./bank.svg";
import cbsc from "./cbsc.svg";
import placement from "./placement.svg";
import { makeStyles, withStyles, Tooltip, Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText } from "@material-ui/core";
import { FcNext } from "react-icons/fc";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	subMenu: {
		textDecoration: "none",
		color: "#0a5494",
		margin: 0,
		"&:hover": {
			color: "#53ccce",
		},
	},
}));

const HtmlTooltip = withStyles((theme) => ({
	tooltip: {
		backgroundColor: "#f5f5f9",
		color: "rgba(0, 0, 0, 0.87)",
		minWidth: "500px",
		height: "400px",
		padding: 0,
		boxShadow: "inset -8px -8px 10px rgba(255,255,255,0.5), inset 8px 8px 20px rgba(0,0,0,0.05)",
		borderRadius: "10px",
		fontSize: theme.typography.pxToRem(16),
	},
}))(Tooltip);

export default function MegaMenu(props) {
	const classes = useStyles();
	const [menuIndex, setMenuIndex] = useState(0);
	const [subMenuData, setSubmenuData] = useState([]);
	const handleHover = (e, i, subMenu) => {
		setMenuIndex(i);
		setSubmenuData(subMenu);
	};
	return (
		<Suspense fallback={<div className={props.className}>{props.children}</div>}>
			<HtmlTooltip
				arrow
				interactive
				title={
					<Fragment>
						<Grid container>
							<Grid item xs={5}>
								<List component="nav" aria-label="main mailbox folders">
									{menuData.map((m, i) => (
										<ListItem button key={i} selected={menuIndex === i ? true : false} onMouseOver={(e) => handleHover(e, i, m.subMenu)}>
											<ListItemAvatar>
												<Avatar alt={m.title} src={m.icon} />
											</ListItemAvatar>
											<Link to={`/practice/${m.catLink}`}>
												<ListItemText primary={m.title} secondary="Exam" />
											</Link>
											<span style={{ flexGrow: 1 }} />
											<FcNext />
										</ListItem>
									))}
								</List>
							</Grid>
							<Grid item xs={7}>
								<List component="nav" aria-label="main mailbox folders">
									{subMenuData &&
										subMenuData.map((s) => (
											<Link to={`/practice/${s.catLink}/${s.link}`} key={s.course} className={classes.subMenu}>
												<ListItem dense>
													<ListItemText primary={s.course} />
													<FcNext />
												</ListItem>
											</Link>
										))}
								</List>
							</Grid>
						</Grid>
					</Fragment>
				}
			>
				{props.children}
			</HtmlTooltip>
		</Suspense>
	);
}

const menuData = [
	{
		title: "Government",
		catLink: "governmentexam",
		subMenu: [
			{ course: "Indian Railways", link: "railways", catLink: "governmentexam" },
			{ course: "Civil Services Exam", link: "upsc", catLink: "governmentexam" },
			{ course: "Bank PO", link: "bankpo", catLink: "governmentexam" },
			{ course: "SSC CGL", link: "ssc", catLink: "governmentexam" },
			{ course: "Bank Clerk", link: "bankclerk", catLink: "governmentexam" },
		],
		icon: bankSvg,
	},
	{
		title: "Placement",
		catLink: "placementpapers",
		subMenu: [
			{ course: "TCS Placement Exam", link: "tcs", catLink: "placementpapers" },
			{ course: "Infosys Test Pattern", link: "infosys", catLink: "placementpapers" },
			{ course: "IBM Professional Entry", link: "ibm", catLink: "placementpapers" },
			{ course: "Wipro National Qualifier Test", link: "wipro", catLink: "placementpapers" },
		],
		icon: placement,
	},
	{
		title: "CBSE",
		catLink: "cbse",
		subMenu: [
			{ course: "CLASS ~ 12th", link: "class12", catLink: "cbse" },
			{ course: "CLASS ~ 11th", link: "class11", catLink: "cbse" },
			{ course: "CLASS ~ 10th", link: "class10", catLink: "cbse" },
			{ course: "CLASS ~ 9th", link: "class9", catLink: "cbse" },
		],
		icon: cbsc,
	},
];
