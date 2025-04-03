import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { LOGOUT_USER } from "../../Components/Context/types";
import { MainContext } from "../../Components/Context/MainContext";
import { Grid, Container, Button } from "@material-ui/core";
import { FcImport } from "react-icons/fc";

export default function AdminDashboard() {
	const { dispatch } = useContext(MainContext);
	const handleLogout = () => {
		dispatch({ type: LOGOUT_USER });
	};
	return (
		<Fragment>
			<br />
			<Container>
				<center>
					<h3>Welcome to Administration !</h3>
				</center>
				<br />
				<Grid container spacing={2}>
					{data.map((d) => (
						<Grid item key={d.link} xs={6} sm={3}>
							<Link to={d.link}>{d.title}</Link>
						</Grid>
					))}
					<Grid item xs={6} sm={3}>
						<Button onClick={handleLogout} startIcon={<FcImport />}>
							Logout
						</Button>
					</Grid>
				</Grid>
			</Container>
		</Fragment>
	);
}

const data = [
	{
		title: "Add Category",
		link: "/admin/addcategory",
		icon: "",
	},
	{
		title: "Add Course",
		link: "/admin/addcourse",
		icon: "",
	},
	{
		title: "Add Subject",
		link: "/admin/addsubject",
		icon: "",
	},
	{
		title: "Add Chapter",
		link: "/admin/addchapter",
		icon: "",
	},
	{
		title: "Add Question",
		link: "/admin/addquestion",
		icon: "",
	},
	{
		title: "Add Blog",
		link: "/admin/addblog",
		icon: "",
	},
	{
		title: "Add Promo Code",
		link: "/admin/addpromo",
		icon: "",
	},
	{
		title: "Add A Test",
		link: "/admin/addtest",
		icon: "",
	},
	{
		title: "Add Section of Test",
		link: "/admin/addtestsection",
		icon: "",
	},
	{
		title: "Add Test Series",
		link: "/admin/addtestseries",
		icon: "",
	},

	{
		title: "See Contact Request",
		link: "/admin/message",
		icon: "",
	},
	{
		title: "Reported Question List",
		link: "/admin/reportedquestion",
		icon: "",
	},
	{
		title: "Transfer Question",
		link: "/admin/transferquestion",
		icon: "",
	},
];
