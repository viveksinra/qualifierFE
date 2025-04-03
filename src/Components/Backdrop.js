import React from "react";
import { Backdrop, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
	zIndex: theme.zIndex.drawer + 1,
	color: "#fff",
}));

export default function SimpleBackdrop({ open }) {
	// const [open, setOpen] = React.useState(false);
	// useEffect(() => {
	// 	onClose();
	// }, [open]);

	return (
		<div>
			<StyledBackdrop open={open}>
				<CircularProgress color="inherit" />
			</StyledBackdrop>
		</div>
	);
}
