import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './App.css';
import db from './firebase';
import Message from './Message';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { username: 'Jonathan', message: 'How are you?' },
    { username: 'Than', message: 'All good' },
  ]);
  const [username, setUsername] = useState('');

  // useState = variables in React
  // useEffect = run code on a condition in React

  useEffect(() => {}, []);
  db.collection('messages').onSnapshot((snapshot) => {
    setMessages(snapshot.docs.map((doc) => doc.data()));
  });

  useEffect(() => {
    // const username = prompt('please enter your name')
    //run code here...
    // if it is blank inside [], this code run ONCE when the app component loads
    setUsername(prompt('Please enter your name:'));
  }, []); // condition

  const sendMessage = (e) => {
    e.preventDefault();
    setMessages([...messages, { username: username, message: input }]);
    setInput('');
  };

  return (
    <div className='App'>
      <h1>Facebook Messenger</h1>
      <h2>Welcome, {username}</h2>

      <form action=''>
        <FormControl>
          <InputLabel>Enter a message...</InputLabel>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type='text'
          />
          <Button
            disabled={!input}
            variant='contained'
            color='primary'
            type='submit'
            onClick={sendMessage}
          >
            Send Message
          </Button>
        </FormControl>
      </form>
      {messages.map((message) => (
        <Message username={username} message={message} />
      ))}
    </div>
  );
}

export default App;
