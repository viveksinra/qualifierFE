import React, { useContext } from "react";
import { TestContext } from "../Components/Context/TestContext/TestContext";
import { ListSubheader, List, Divider } from "@mui/material";
import { styled } from '@mui/material/styles';
import ReactHtmlParser from "react-html-parser";

const PREFIX = 'QPaper';
const classes = {
	root: `${PREFIX}-root`,
	list: `${PREFIX}-list`,
	listSec: `${PREFIX}-listSec`,
	ul: `${PREFIX}-ul`,
	option: `${PREFIX}-option`
};

const StyledRoot = styled('div')(({ theme }) => ({
	[`&.${classes.root}`]: {
		background: "#fff",
		fontFamily: "sans-serif",
		padding: theme.spacing(0, 2),
		color: "#000",
	},
	[`& .${classes.list}`]: {
		width: "100%",
		backgroundColor: theme.palette.background.paper,
		position: "relative",
		overflow: "auto",
		maxHeight: `calc(100vh - ${150}px)`,
	},
	[`& .${classes.listSec}`]: {
		backgroundColor: "inherit",
	},
	[`& .${classes.ul}`]: {
		backgroundColor: "inherit",
		padding: 0,
	},
	[`& .${classes.option}`]: {
		marginLeft: 20,
		marginBottom: 10,
	},
}));

function QPaper() {
	const { Tstate } = useContext(TestContext);

	return (
		<StyledRoot className={classes.root}>
			<List aria-labelledby="question-paper" subheader={<li />} className={classes.list}>
				{Tstate.sections.map((s) => (
					<li key={s.sectionId} className={classes.listSec}>
						<ul className={classes.ul}>
							<ListSubheader>{`Section Name  :  ${s.title}`} </ListSubheader>
							{s.questions.map((q, i) => (
								<div key={i}>
									{ReactHtmlParser(`Q.${i + 1}) ${q.question}`)}
									<ol className={classes.option}>
										{q.options.map((o) => (
											<li key={o.number}>{ReactHtmlParser(o.title)}</li>
										))}
									</ol>
									<Divider light />
									<br />
								</div>
							))}
						</ul>
					</li>
				))}
			</List>
		</StyledRoot>
	);
}

export default QPaper;
