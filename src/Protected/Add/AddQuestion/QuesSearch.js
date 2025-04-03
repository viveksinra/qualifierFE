import React, { useContext, useEffect, useState } from "react";
import { QuesContext } from "../../../Components/Context/AddQuesContext/QuestionContext";
import { Input, Dialog, DialogTitle, DialogContent, Table, TableRow, TableCell, TableBody, TableFooter, TablePagination, Paper } from "@mui/material";
import { styled } from '@mui/material/styles';
import NoContent from "../../../Components/NoContent";
import parse from "html-react-parser";
import { FcSearch } from "react-icons/fc";
import axios from "axios";
import { Fab, TextField, Button, Chip } from "@mui/material";
import { MdSearch } from "react-icons/md";

// Styled components
const SearchContainer = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: theme.palette.common.white,
	'&:hover': {
		backgroundColor: theme.palette.grey[100],
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInput = styled(Input)(({ theme }) => ({
	color: 'inherit',
	width: '100%',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
	},
}));

const SearchResultDiv = styled('div')(({ theme }) => ({
	maxHeight: '80vh',
	overflow: 'auto',
	margin: theme.spacing(1)
}));

const EntryAreaPaper = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
	margin: theme.spacing(1),
	backgroundColor: theme.palette.background.paper
}));

const StyledButton = styled(Button)(({ theme }) => ({
	margin: theme.spacing(1)
}));

function QuesSearch() {
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
				<SearchResultDiv>
					<SearchContainer>
						<SearchIconWrapper>
							<FcSearch />
						</SearchIconWrapper>
						<StyledInput
							placeholder="Search Question..."
							onChange={(e) => getData(Qstate.chapter[0] && Qstate.chapter[0].link, e.target.value)}
							disableUnderline
						/>
					</SearchContainer>
				</SearchResultDiv>
			</DialogTitle>
			<DialogContent>
				{allQuestion.length !== 0 ? (
					<Table>
						<TableBody>
							{allQuestion.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data, i) => (
								<TableRow key={data._id} onClick={() => setData(data._id)} hover>
									<TableCell size="small" padding="none" align="left">{`${i + 1})`}</TableCell>
									<TableCell component="td" scope="row">
										{parse(data.questionTitle.slice(0, 200))}
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
									onPageChange={(e, page) => setPage(page)}
									onRowsPerPageChange={(r) => setRowsPerPage(r.target.value)}
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
