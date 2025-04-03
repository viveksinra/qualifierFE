import { makeStyles } from "@mui/material";
import { fade } from "@mui/material/styles/colorManipulator";

const useStyles = makeStyles((theme) => ({
	entryArea: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(),
		padding: theme.spacing(2),
		paddingTop: 0,
		marginLeft: "auto",
		marginRight: "auto",
		backgroundImage: "linear-gradient(-180deg, #FFFEFF 0%, #D7FFFE 100%)",
		maxWidth: "95%",
	},
	button: {
		margin: theme.spacing(2),
		"& svg": {
			fontSize: "x-large",
		},
	},
	search: {
		position: "relative",
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade("#2196F3", 0.15),
		"&:hover": {
			backgroundColor: fade("#2196F3", 0.35),
		},
		margin: 10,
		width: "100%",
		backgroundImage: "linear-gradient(-225deg, #69EACB 0%, #EACCF8 48%, #6654F1 100%)",
		[theme.breakpoints.up("xs")]: {
			marginLeft: theme.spacing(),
			width: "auto",
		},
	},
	searchIcon: {
		width: theme.spacing(8),
		height: "100%",
		position: "absolute",
		pointerEvents: "none",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		display: "flex",
		padding: 0,
	},
	inputRoot: {
		color: "inherit",
		width: "100%",
	},
	inputInput: {
		paddingTop: theme.spacing(),
		paddingRight: theme.spacing(),
		paddingBottom: theme.spacing(),
		paddingLeft: theme.spacing(10),
		transition: theme.transitions.create("width"),

		width: "100%",
	},
	searchResult: {
		margin: 10,
		border: "1px solid #EACCF8",
		overflowX: "hidden",
	},
}));

export default useStyles;
