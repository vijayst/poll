import React, { useState, useEffect } from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { withRouter, Link } from 'react-router-dom';
import firebase from '../util/firebase';

const ROUTE_MAP = {
    home: '/',
    login: '/login',
    register: '/register',
    polls: '/polls/my',
    create: '/polls/create'
};

function getDefaultItem(pathname) {
    let item = 'home';
    Object.keys(ROUTE_MAP).forEach(key => {
        if (pathname === ROUTE_MAP[key]) {
            item = key;
        }
    });
    return item;
}

function MyMenu(props) {
    const [activeItem, setActiveItem] = useState(
        getDefaultItem(props.location.pathname)
    );
    const { currentUser } = firebase.auth();
    const [user, setUser] = useState(currentUser);
    const loggedIn = !!user;

    firebase.auth().onAuthStateChanged(currentUser => {
        setUser(currentUser);
    });

    useEffect(() => {
        setActiveItem(getDefaultItem(props.location.pathname));
    }, [props.location.pathname]);

    function handleItemClick(e, { name }) {
        setActiveItem(name);
        props.history.push(ROUTE_MAP[name]);
    }

    async function handleLogout() {
        await firebase.auth().signOut();
        props.history.push('/login');
    }

    return loggedIn ? (
        <Menu inverted secondary style={{ marginTop: 0, marginRight: 24 }}>
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
            <Menu.Item>
                <Dropdown pointing="top left" text={user.displayName}>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            as={Link}
                            to={`/profile`}
                            text="My Profile"
                            icon="user"
                        />
                        <Dropdown.Item
                            text="Sign Out"
                            icon="power"
                            onClick={handleLogout}
                        />
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Item>
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
