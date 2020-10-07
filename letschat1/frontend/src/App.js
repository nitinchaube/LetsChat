import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat'
import {useEffect,useState} from 'react';
import Pusher from "pusher-js";
import axios from './axios';

function App() {
  const[messages,setMessages]= useState([]);
  useEffect(()=>{
    axios.get('/messages/sync').then((response)=>{
      setMessages(response.data);
    });
  }, [])
  useEffect(() => {
    const pusher = new Pusher('70d9201f8c151de93347', {
      cluster: 'eu'
    });


    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessages)=> {
      // alert(JSON.stringify(data));
      setMessages([...messages,newMessages]);
    });
    
    return()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="appBody">
        <Sidebar/>
        <Chat messages={messages}/>
      </div>
     



    </div>
  );
}

export default App;
