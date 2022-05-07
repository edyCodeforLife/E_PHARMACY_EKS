import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export interface ISnackBarProps {
	vertical: "top" | "bottom";
	horizontal: "left" | "center" | "right";
	open: boolean;
	handleClose(): void;
	message: string;
	severity: "success" | "error" | "warning" | "info";
}

export default function PositionedSnackbar(props: ISnackBarProps) {
	const { vertical, horizontal, open, handleClose, message, severity } = props;

	const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
		props,
		ref,
	) {
		return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
	});


	return (
		<Snackbar
			autoHideDuration={3000}
			anchorOrigin={{ vertical, horizontal }}
			open={open}
			onClose={() => handleClose}
			key={vertical + horizontal}
		>
			<Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
				{message}
			</Alert>
		</Snackbar>
	);
}
