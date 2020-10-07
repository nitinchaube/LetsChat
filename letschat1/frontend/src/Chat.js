import { Avatar, IconButton } from '@material-ui/core';
import {AttachFile, MoreVert, SearchOutlined} from '@material-ui/icons';
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import {useState} from 'react';
import axios from './axios';

import React from 'react';
import './Chat.css';

export default function Chat({messages}) {
    const [input,setInput]=useState("");
    const sendMessage = async (e) =>{
        e.preventDefault();
        await axios.post('/messages/new',{
            messages: input,
            name:"naiitn",
            timestamp:"just now",
            received:false,
        });
        setInput('');
    };


    return (
        <div className="chat">
            <div className="chat_header">
                <Avatar/>
                <div className="chat_headerInfo">
                    <h3>Room name</h3>
                    <p>last seen.....</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="chat_body">
                {messages.map((mess)=>(
                    <p className={`chat_message ${!mess.received && "chat_receiver"}`}>
                    <span className="chat_name">{mess.name}</span>
                   {mess.messages}
                    <span className="chat_timestamp">{mess.timestamp}</span>
                    </p>
                ))}

               

                

                
                {/* <p className="chat_message">
                    <span className="chat_name">nitin</span>
                    hii nitin how r you
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>
                </p>

                <p className=" chat_message chat_receiver">
                    <span className="chat_name">nitin</span>
                    hii nitin how r you
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>
                </p>

                <p className="chat_message">
                    <span className="chat_name">nitin</span>
                    hii nitin how r you
                    <span className="chat_timestamp">{new Date().toUTCString()}</span>
                </p> */}
                
            </div>
            <div className="chat_footer">
                <InsertEmoticonIcon/>
                <form>
                    <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Type a Message" type="text"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>  
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}
