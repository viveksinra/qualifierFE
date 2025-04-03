import React, { useImperativeHandle, Suspense, useState, forwardRef } from "react";
import clsx from "clsx";
import { IconButton, Snackbar, SnackbarContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import { amber, green } from "@mui/material/colors";
import { MdError, MdInfo, MdClose, MdWarning, MdCheckCircle } from "react-icons/md";

const variantIcon = {
	success: MdCheckCircle,
	warning: MdWarning,
	error: MdError,
	info: MdInfo,
};

const StyledSnackbarContent = styled(SnackbarContent)(({ theme, variant }) => ({
	backgroundColor: 
		variant === 'success' ? green[600] :
		variant === 'error' ? theme.palette.error.dark :
		variant === 'info' ? theme.palette.primary.main :
		variant === 'warning' ? amber[700] : undefined,
}));

const Icon = styled('span')(({ theme }) => ({
	fontSize: 20,
}));

const IconVariant = styled('span')(({ theme }) => ({
	opacity: 0.9,
	marginRight: theme.spacing(1),
	fontSize: 20,
}));

const Message = styled('span')(({ theme }) => ({
	display: "flex",
	alignItems: "center",
}));

const Margin = styled('div')(({ theme }) => ({
	margin: theme.spacing(1),
}));

const MySnackbar = forwardRef((props, ref) => {
	const [data, setData] = useState({ message: "", variant: "success" });
	const [open, setOpen] = useState(false);
	const VariantIcon = variantIcon[data.variant];
	
	useImperativeHandle(ref, () => ({
		handleSnack(a) {
			setData(a);
			setOpen(!open);
		},
	}));

	return (
		<Suspense fallback={null}>
			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "left",
				}}
				open={open}
				onClose={() => setOpen(false)}
				autoHideDuration={5000}
			>
				<StyledSnackbarContent
					variant={data.variant}
					aria-describedby="client-snackbar"
					message={
						<Message id="client-snackbar">
							<IconVariant><VariantIcon /></IconVariant>
							{data.message}
						</Message>
					}
					action={[
						<IconButton key="close" aria-label="close" color="inherit" onClick={() => setOpen(false)}>
							<Icon><MdClose /></Icon>
						</IconButton>,
					]}
				/>
			</Snackbar>
		</Suspense>
	);
});

export default MySnackbar;
