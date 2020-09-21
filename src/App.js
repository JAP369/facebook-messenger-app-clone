import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import './App.css';
import db from './firebase';
import Message from './Message';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { username: 'Jonathan', message: 'How are you?' },
    { username: 'Than', message: 'All good' },
  ]);
  const [username, setUsername] = useState('');

  // useState = variables in React
  // useEffect = run code on a condition in React

  useEffect(() => {
    db.collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    // const username = prompt('please enter your name')
    //run code here...
    // if it is blank inside [], this code run ONCE when the app component loads
    setUsername(prompt('Please enter your name:'));
  }, []); // condition

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // setMessages([...messages, { username: username, text: input }]);
    setInput('');
  };

  return (
    <div className='App'>
      <img
        src='https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=90&h=90'
        alt=''
      />
      <h1>Facebook Messenger App Clone</h1>
      <h2>Welcome, {username}</h2>

      <form className='app__form' action=''>
        <FormControl className='app__formControl'>
          <Input
            className='app__input'
            placeholder='Enter a message...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type='text'
          />
          <IconButton
            className='app__iconButton'
            disabled={!input}
            variant='contained'
            color='primary'
            type='submit'
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
