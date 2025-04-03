import React, { useContext, useEffect, useState } from "react";
import { QuesContext } from "../../../Components/Context/AddQuesContext/QuestionContext";
import { Input, Dialog, DialogTitle, DialogContent, Table, TableRow, TableCell, TableBody, TableFooter, TablePagination } from "@material-ui/core";
import useStyles from "../useStyles";
import NoContent from "../../../Components/NoContent";
import ReactHtmlParser from "react-html-parser";

import { FcSearch } from "react-icons/fc";
import axios from "axios";

function QuesSearch() {
	const classes = useStyles();
	const { Qstate, Qdispatch } = useContext(QuesContext);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [allQuestion, setAllQuestion] = useState([]);
	const getData = async (chapLink, word) => {
		if (chapLink) {
			await axios
				.get(`/api/test/question/select/${chapLink}/${word}`)
				.then((res) => setAllQuestion(res.data))
				.catch((err) => console.log(err));
		}
	};
	useEffect(() => {
		if (Qstate.chapter.length !== 0) {
			getData(Qstate.chapter[0].link, "");
		}
	}, [Qstate.chapter]);
	const setData = (id) => {
		axios
			.get(`/api/test/question/get/${id}`)
			.then((res) =>
				Qdispatch({
					type: "SETQUESTION",
					payload: {
						id: res.data._id,
						title: res.data.questionTitle,
						category: res.data.category[0],
						course: res.data.course,
						subject: res.data.subject,
						chapter: res.data.chapter,
						options: res.data.options,
						correctOption: res.data.correctOption,
						level: res.data.level,
						maxTime: res.data.maxTime,
						highlight: res.data.highlight,
						image: res.data.image,
						solImage: res.data.solImage,
						hint: res.data.hint,
						solTitle: res.data.solTitle,
					},
				}),
			)
			.catch((err) => console.log(err));
	};

	return (
		<Dialog open={Qstate.openSearchBox} onClose={() => Qdispatch({ type: "TOGGLESEARCH" })} aria-labelledby="form-dialog-title">
			<DialogTitle id="search-Question">
				<div className={classes.search}>
					<div className={classes.searchIcon}>
						<FcSearch />
					</div>
					<Input
						placeholder="Search Question..."
						onChange={(e) => getData(Qstate.chapter[0] && Qstate.chapter[0].link, e.target.value)}
						disableUnderline
						classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
						}}
					/>
				</div>
			</DialogTitle>
			<DialogContent>
				{allQuestion.length !== 0 ? (
					<Table>
						<TableBody>
							{allQuestion.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, i) => (
								<TableRow key={data._id} onClick={() => setData(data._id)} hover>
									<TableCell size="small" padding="none" align="left">{`${i + 1})`}</TableCell>
									<TableCell component="td" scope="row">
										{ReactHtmlParser(data.questionTitle.slice(0, 200))}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TablePagination
									count={allQuestion.length}
									rowsPerPage={rowsPerPage}
									page={page}
									onChangePage={(e, page) => setPage(page)}
									onChangeRowsPerPage={(r) => setRowsPerPage(r.target.value)}
								/>
							</TableRow>
						</TableFooter>
					</Table>
				) : (
					<NoContent msg="No search result available, Select appropriate Chapter." />
				)}
			</DialogContent>
		</Dialog>
	);
}

export default QuesSearch;
