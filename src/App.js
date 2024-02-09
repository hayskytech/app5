import React, { useEffect, useState } from 'react'
import 'semantic-ui-css/semantic.min.css'
import Matches from './FB/Matches'
import Login from './FB/Login'
import { auth } from './FB/config'
import { onAuthStateChanged, onIdTokenChanged, signOut } from 'firebase/auth'
import { Icon, Menu } from 'semantic-ui-react'
import Fruits from './FB/Fruits'

export default function App() {
  const urlParams = new URLSearchParams(window.location.search);
  let param = urlParams.get('page');
  if (!param) {
    param = 'Home'
  }

  const [user, setUser] = useState(null)
  const [page, setPage] = useState(param)

  useEffect(() => {
    const unsubscribeAuthState = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    const unsubscribeIdToken = onIdTokenChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      unsubscribeAuthState();
      unsubscribeIdToken();
    };
  }, [auth])

  function doLogout() {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  function MainMenu() {
    const items = ['Home', 'Matches', "Fruits", 'Item 4', 'New Paege', "Games"]
    return (<Menu icon='labeled' widths={items.length + 1} compact size='mini'>
      {items.map((item) =>
        <Menu.Item name='gamepad'
          onClick={() => chngpage(item)}
        >
          <Icon name='home' />
          {item}
        </Menu.Item>)
      }
      <Menu.Item name='signout' color='red' onClick={doLogout}>
        <Icon color='red' name='sign-out' />
        Logout
      </Menu.Item>
    </Menu>)
  }

  function chngpage(value) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('page', value);
    const newURL = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
    window.history.pushState({}, document.title, newURL);
    setPage(value)
  }


  return (
    <div>
      {user ?
        <>
          <MainMenu />
          {page === 'Home' && <p>this is home</p>}
          {page === 'Games' && <p>this is games</p>}
          {page === 'Channels' && <p>this is channels</p>}
          {page === 'Matches' && <Matches />}
          {page === 'Fruits' && <Fruits />}
        </>
        :
        <Login />
      }
    </div>
  )
}
