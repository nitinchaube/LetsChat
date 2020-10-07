import React from 'react';
import './Sidebar.css';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import {Avatar, IconButton} from '@material-ui/core';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
 function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src="https://lh3.googleusercontent.com/ogw/ADGmqu_2lStSXQTFr4RBYUoQ4DRwU-kVl6NwlsNKTdGJ=s83-c-mo"/>
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                    
                    
                </div>
            </div>
            <div className='sidebar_search'>
                <div className="sidebar_searchContainer">
                    <SearchOutlinedIcon/>
                    <input placeholder="Search or start new chat" type="text"/>
                </div>
            </div>
            <div className="sidebar_chats">
                <SidebarChat/>
                <SidebarChat/>
                <SidebarChat/>

                <SidebarChat/>

            </div>
        </div>
    )
}

export default Sidebar;
