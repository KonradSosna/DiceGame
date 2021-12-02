import { Button, styled } from '@mui/material';

export const StyledButton = styled(Button)({
	backgroundColor: 'black',
	Color: 'white',
	'&:hover': {
		backgroundColor: '#6b1010',
		borderColor: '#0062cc',
		boxShadow: 'none',
	},
});
