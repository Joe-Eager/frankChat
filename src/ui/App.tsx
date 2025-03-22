import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import FrankChat from './FrankChat';
import { useEffect } from 'react';

const darkTheme = createTheme({
	palette: {
		mode: 'dark'
	}
});

function App() {
	useEffect(() => {
		document.title = 'Frank Chat'; // Set or update the window title
	}, []);

	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Box
				sx={{
					width: '100vw',
					height: '100vh',
					alignContent: 'center'
				}}
			>
				<FrankChat />
			</Box>
		</ThemeProvider>
	);
}

export default App;
