import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';

function MyMenu() {
    const [activeItem, setActiveItem] = useState('home');
    function handleItemClick(e, { name }) {
        setActiveItem(name);
    }

    return (
        <Menu secondary style={{ marginTop: 0 }}>
            <Menu.Item
                name="home"
                active={activeItem === 'home'}
                content="Home"
                onClick={handleItemClick}
            />
            <Menu.Item
                name="polls"
                active={activeItem === 'polls'}
                content="My Polls"
                onClick={handleItemClick}
            />
            <Menu.Item
                name="create"
                active={activeItem === 'create'}
                content="Create Poll"
                onClick={handleItemClick}
            />
            <Menu.Item
                name="logout"
                active={activeItem === 'logout'}
                content="Logout"
                onClick={handleItemClick}
            />
        </Menu>
    );
}

export default MyMenu;
