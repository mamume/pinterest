import { ThemeProvider } from "@mui/material/styles";
import Profile from './pages/Profile'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import theme from './styles/Theme'
import Settings from "./pages/Settings"
import Homepage from "./pages/Homepage";
import Board from './pages/Board'
import NavigationBar from './components/navigationbar/NavigationBar'
import { CircularProgress, Container, CssBaseline, Stack } from "@mui/material";
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
    "content-type": "application/json",
    "Authorization": `JWT ${localStorage.getItem('pinterestAccessToken')}`
  })
  const [authedUser, setAuthedUser] = useState(null)
  const [pins, setPins] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (localStorage.getItem('pinterestAccessToken')) {
      // setLoading(true)

      fetch(`${host}/profile/list/`, { headers })
        .then(res => res.json())
        .then(data => {
          // console.log({ 'data[0]': data[0] })
          if (data[0]?.username)
            setAuthedUser(data[0])
          else
            setAuthedUser(null)
        })
        .then(setLoading(false))
    }
  }, [headers, host])

  const removeItem = (id) => {
    setPins(pins => pins.filter(item => item.id !== id))
  }

  const addItem = (item) => {
    item.content_src = `${host}${item.content_src}`
    setPins(pins => [item, ...pins])
  }

  useEffect(() => {
    localStorage.getItem('pinterestAccessToken') &&
      fetch(`${host}/pin/pins/`, { headers })
        .then(res => res.json())
        .then(data => {
          setPins(data)
        })
  }, [headers, host])

  const AuthRef = useRef();
  const runAuth = (type) => {
    AuthRef.current.handleClickOpen(type)
  }

  // useEffect(() => {
  //   if (authedUser && window.location.href.search("http://localhost:3000/password-reset") === -1)
  //     AuthRef.current.state.open = true
  // }, [authedUser])
  // if (authedUser && window.location.href.search("http://localhost:3000/password-reset") === -1)
  //   AuthRef.current.state.open = true

  return (
    <Fragment>
      <Auth ref={AuthRef} />
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <UserContext.Provider value={{ loading, authedUser, headers, setAuthedUser, setHeaders, host }}>
          <Router>
            <NavigationBar runAuth={runAuth} pins={pins} setPins={setPins} />
            <Container maxWidth="xl" sx={{ paddingTop: 9 }} >
              {localStorage.getItem('pinterestAccessToken')
                ? loading || !authedUser
                  ? <Stack direction="row" justifyContent="center" mt={10}><CircularProgress /></Stack>
                  :
                  <Routes>
                    <Route path="/" exact element={<Homepage pins={pins} addItem={addItem} removeItem={removeItem} />} />
                    <Route path="/profile/" element={<Profile addItem={addItem} />} />
                    <Route path="/profile/:usernameParam" element={<Profile addItem={addItem} />} />
                    <Route path="/settings/*" element={<Settings />} />
                    <Route path="/board/" element={<Board addItem={addItem} />} />
                    <Route path="/create_pin/" element={<Create />} />
                    <Route path='/pin/:id' element={<Pin />} />
                  </Routes>
                :
                <Routes>
                  <Route path="/" exact element={<LogoutHomepage />} />
                  <Route path="/password-reset" element={<PwReset />} />
                  <Route path="/password-reset/confirm" element={<PwResetConfirm />} />
                </Routes>}
            </Container>
          </Router>
        </UserContext.Provider>
      </ThemeProvider>
    </Fragment >
  );
}

export default App;


