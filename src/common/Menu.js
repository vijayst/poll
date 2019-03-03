import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import firebase from '../util/firebase';

const ROUTE_MAP = {
    home: '/',
    login: '/login',
    register: '/register',
    polls: '/polls/my',
    create: '/polls/create'
};

function MyMenu(props) {
    const [activeItem, setActiveItem] = useState('home');
    const user = firebase.auth().currentUser;
    const loggedIn = !!user;
    function handleItemClick(e, { name }) {
        setActiveItem(name);
        props.history.push(ROUTE_MAP[name]);
    }

    return loggedIn ? (
        <Menu secondary style={{ marginTop: 0, marginRight: 24 }}>
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
    ) : (
        <Menu inverted secondary style={{ marginTop: 0, marginRight: 24 }}>
            <Menu.Item
                name="home"
                active={activeItem === 'home'}
                content="Home"
                onClick={handleItemClick}
            />
            <Menu.Item
                name="register"
                active={activeItem === 'register'}
                content="Register"
                onClick={handleItemClick}
            />
            <Menu.Item
                name="login"
                active={activeItem === 'login'}
                content="Login"
                onClick={handleItemClick}
            />
        </Menu>
    );
}

export default withRouter(MyMenu);
