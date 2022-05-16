import { ThemeProvider } from "@mui/material/styles";
import Profile from './pages/Profile'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import theme from './styles/Theme'
import Settings from "./pages/Settings"
import Homepage from "./pages/Homepage";
import Board from './pages/Board'
import NavigationBar from './components/navigationbar/NavigationBar'
import { Container, CssBaseline } from "@mui/material";
import { Fragment, useEffect, useState, useRef } from "react";
import Create from './components/pins/create_pin'
import Pin from './components/pins/pin'
import { UserContext } from "./context";
import PwReset from './Auth/PwReset'
import PwResetConfirm from './Auth/PwResetConfirm'
import Auth from './Auth/Auth'
import LogoutHomepage from './LogoutHomepage/App'



function App() {
  const [host] = useState('http://localhost:8000')
  const [headers, setHeaders] = useState({
    'content-type': "application/json",
    'Authorization': `bearer ${localStorage.getItem('pinterestAccessToken')}`
  })
  const [authedUser, setAuthedUser] = useState({})
  const [pins, setPins] = useState([])

  useEffect(() => {
    fetch(`${host}/account/details`, { headers })
      .then(res => res.json())
      .then(data => {
        if (data.username)
          setAuthedUser(data)
        else
          setAuthedUser(null)
      })
  }, [headers, host])

  const removeItem = (id) => {
    setPins(pins => pins.filter(item => item.id !== id))
  }

  const addItem = (item) => {
    item.content_src = `${host}${item.content_src}`
    setPins(pins => [item, ...pins])
  }

  useEffect(() => {
    if (authedUser)
      fetch(`${host}/pin/pins/`, { headers })
        .then(res => res.json())
        .then(data => {
          setPins(data)
        })
  }, [authedUser, host, headers])

  const AuthRef = useRef();
  const runAuth = (type) => {
    AuthRef.current.handleClickOpen(type)
  }

  if (authedUser == null && window.location.href.search("http://localhost:3000/password-reset") === -1) AuthRef.current.state.open = true

  return (
    <Fragment>
      <Auth ref={AuthRef} />
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ authedUser, headers, setAuthedUser, setHeaders, host }}>
          <Container maxWidth="xl" sx={{ paddingTop: 9 }} >
            <Router>
              <NavigationBar runAuth={runAuth} pins={pins} setPins={setPins} />
              {authedUser
                ?
                <Routes>
                  <Route path="/" exact element={<Homepage pins={pins} addItem={addItem} removeItem={removeItem} />} />
                  <Route path="/profile" element={<Profile addItem={addItem} />} />
                  <Route path="/settings/*" element={<Settings />} />
                  <Route path="/board/" element={<Board addItem={addItem} />} />
                  <Route path="/create_pin/" element={<Create />} />
                  <Route path='/pin/:id' element={<Pin />}> </Route>
                </Routes>
                :
                <>
                  <Routes>
                    <Route path="/" exact element={<LogoutHomepage />} />
                    <Route path="/password-reset" element={<PwReset />} />
                    <Route path="/password-reset/confirm" element={<PwResetConfirm />} />
                  </Routes>
                </>
              }
            </Router>
          </Container>
        </UserContext.Provider>
      </ThemeProvider>
    </Fragment>
  );
}

export default App;


