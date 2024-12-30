import React, { useState } from "react";
import {  askToAi } from "../services/apiService";


  import { Box, TextField, Button, Typography, Paper,Container } from '@mui/material';





export default function MainContent() {

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'You', text: newMessage }
      ]);
      setNewMessage('');
  
      submitUpdateForm(newMessage.trim());
    }
  };


  const [messages, setMessages] = useState([
    { sender: 'Bot', text: 'Hello! How can I help you today?' }
  ]);
  const [newMessage, setNewMessage] = useState('');

   
  const submitUpdateForm = async (user_message) => {
    try {
      const api_request_data = {
        message: user_message
      };
      const response = await askToAi(api_request_data);
  
      if (response) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'Bot', text: response.message }
        ]);
      }
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      {/* Page Title */}
      <Typography variant="h4" gutterBottom textAlign="center">
        Welcome to AI bot
      </Typography>
      <Typography variant="body1" textAlign="center" sx={{ mb: 3 }}>
        Ask question whatever you want today!
      </Typography>

      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '80vh',
        maxWidth: '100%',
        margin: 'auto',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: 2
      }}
    >
      {/* Chat Messages Container */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          marginBottom: 2,
          paddingRight: 1
        }}
      >
        {messages.map((message, index) => (
          <Paper
            key={index}
            sx={{
              padding: 1,
              marginBottom: 1,
              backgroundColor: message.sender === 'You' ? '#d3f2ff' : '#f1f1f1',
              textAlign: message.sender === 'You' ? 'right' : 'left'
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {message.sender}:
            </Typography>
            <Typography variant="body2">{message.text}</Typography>
          </Paper>
        ))}
      </Box>

      {/* Message Input Area */}
      <Box sx={{ display: 'flex' }}>
        <TextField
          fullWidth
          label="Type a message..."
          variant="outlined"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          sx={{ marginRight: 1 }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Box>


    </Container>
    </Box>
  );
}
