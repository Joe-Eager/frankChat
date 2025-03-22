import Send from '@mui/icons-material/Send';
import { Box, Card, IconButton, Stack, TextField, Typography } from '@mui/material';
import { FormEvent, useState, useRef, useEffect } from 'react';
import handleFrankChat from './frankChat';

const FrankChat = () => {
	const [input, setInput] = useState('');
	const [chatArray, setChatArray] = useState<{ type: string; message: string }[]>([]);
	const chatContainerRef = useRef<HTMLDivElement>(null);

	// Scroll to the latest message whenever chatArray changes
	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
		}
	}, [chatArray]);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (input.trim() !== '') {
			setChatArray((prev) => [...prev, { type: 'user', message: input }]);
			// Simulate a response (replace this with actual API call or logic)
			setTimeout(() => {
				setChatArray((prev) => [
					...prev,
					{ type: 'response', message: handleFrankChat(input) }
				]);
			}, 1000);
			setInput('');
		}
	};

	return (
		<Stack p={4} height='100%' width='100%' justifyContent='space-between' gap={2}>
			<Card
				sx={{ borderRadius: 4, overflowY: 'auto', padding: 2 }}
				ref={chatContainerRef} // Attach ref to the chat container
			>
				{chatArray.map((chat, index) => (
					<Box key={index} display='block' width='100%'>
						<Box
							sx={{
								display: 'flex',
								justifyContent: chat.type === 'user' ? 'flex-end' : 'flex-start'
							}}
						>
							<Typography
								sx={{
									backgroundColor: chat.type === 'user' ? '#0078FE' : '#6ACC46',
									padding: 1,
									borderRadius: 2,
									marginBottom: 1,
									maxWidth: '70%',
									display: 'inline-block'
								}}
							>
								{chat.message}
							</Typography>
						</Box>
					</Box>
				))}
			</Card>
			<form onSubmit={handleSubmit}>
				<TextField
					fullWidth
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder='Type your message...'
					slotProps={{
						input: {
							endAdornment: (
								<IconButton type='submit'>
									<Send />
								</IconButton>
							)
						}
					}}
				/>
			</form>
		</Stack>
	);
};

export default FrankChat;
