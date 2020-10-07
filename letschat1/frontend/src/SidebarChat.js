import { Avatar } from '@material-ui/core';
import React from 'react';

import './SidebarChat.css';

function SidebarChat() {
    return (
        <div className="sidebarChat">
            <Avatar/>
            <div className="sidebarChat_info">
                <h2>nitin</h2>
                <p>not good what about you</p>
            </div>
        </div>
    )
}

export default SidebarChat;
