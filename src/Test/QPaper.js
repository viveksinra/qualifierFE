import React, { useContext } from "react";
import { TestContext } from "../Components/Context/TestContext/TestContext";
import { makeStyles, ListSubheader, List, Divider } from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";

const QStyle = makeStyles((theme) => ({
	root: {
		background: "#fff",
		fontFamily: "sans-serif",
		padding: theme.spacing(0, 2),
		color: "#000",
	},
	list: {
		width: "100%",
		backgroundColor: theme.palette.background.paper,
		position: "relative",
		overflow: "auto",
		maxHeight: `calc(100vh - ${150}px)`,
	},
	listSec: {
		backgroundColor: "inherit",
	},
	ul: {
		backgroundColor: "inherit",
		padding: 0,
	},
	option: {
		marginLeft: 20,
		marginBottom: 10,
	},
}));
function QPaper() {
	const classes = QStyle();
	const { Tstate } = useContext(TestContext);

	return (
		<div className={classes.root}>
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
		</div>
	);
}

export default QPaper;
