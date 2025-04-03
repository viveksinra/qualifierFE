import React, { useRef, useEffect, useState } from "react";
import {
	Grid,
	Chip,
	Typography,
	Button,
	AccordionDetails,
	Container,
	Accordion,
	AccordionSummary,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import { FcExpand, FcFullTrash } from "react-icons/fc";
import NoContent from "../Components/NoContent";
import MySnackbar from "../Components/MySnackbar";
import axios from "axios";

const StyledHeadingTypography = styled(Typography)(({ theme }) => ({
	fontSize: theme.typography.pxToRem(15),
	flexBasis: "33.33%",
	flexShrink: 0,
}));

const StyledSecondaryHeadingTypography = styled(Typography)(({ theme }) => ({
	fontSize: theme.typography.pxToRem(15),
	color: theme.palette.text.secondary,
}));

function SeeMessage() {
	const [data, setData] = useState([]);
	useEffect(() => {
		axios
			.get("/api/other/contactus/getall")
			.then((res) => setData(res.data))
			.catch((err) => console.log(err));
	}, []);
	const snackRef = useRef();
	const handleDelete = (id) => {
		axios
			.delete(`/api/other/contactus/deletecontact/${id}`)
			.then((res) => snackRef.current.handleSnack(res.data))
			.catch((err) => console.log(err));

		// setTimeout(function () {
		// 	window.location.reload();
		// }, 4000);
	};
	return (
		<div>
			<Container>
				<br />
				<center>
					<Chip label="See Messages" color="primary" />
				</center>

				<br />
				{data.length === 0 ? (
					<NoContent msg="Enjoy !  No reported Question available." />
				) : (
					data.map((d, i) => (
						<Accordion key={i}>
							<AccordionSummary expandIcon={<FcExpand />} aria-controls="panel1a-content" id="panel1a-header">
								<StyledHeadingTypography>{d.date} </StyledHeadingTypography>
								<StyledSecondaryHeadingTypography>By: {d.name}</StyledSecondaryHeadingTypography>
							</AccordionSummary>
							<AccordionDetails>
								<Grid container>
									<Grid item xs={12} md={4}>
										<ul>
											<li>
												Mobile No. : <b> {d.mobile} </b>
											</li>
											<li>
												Email Id: <b>{d.email} </b>
											</li>
											<li>
												Subject : <b> {d.subject} </b>
											</li>
										</ul>
									</Grid>

									<Grid item xs={12} md={8} style={{ borderLeft: "1px solid royalblue" }}>
										<Typography gutterBottom align="center">
											<b> Message</b> <br />
											{d.message}
										</Typography>

										<center>
											<Button color="secondary" endIcon={<FcFullTrash />} size="small" variant="outlined" onClick={() => handleDelete(d._id)}>
												Delete
											</Button>
										</center>
									</Grid>
								</Grid>
							</AccordionDetails>
						</Accordion>
					))
				)}
			</Container>
			<MySnackbar ref={snackRef} />
		</div>
	);
}

export default SeeMessage;
