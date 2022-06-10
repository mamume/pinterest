import { CircularProgress, Container, CssBaseline, Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Fragment, useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './Auth/Auth';
import PwReset from './Auth/PwReset';
import PwResetConfirm from './Auth/PwResetConfirm';
import NavigationBar from './components/navigationbar/NavigationBar';
import Create from './components/pins/create_pin';
import Pin from './components/pins/pin';
import { UserContext } from "./context";
import LogoutHomepage from './LogoutHomepage/App';
import Board from './pages/Board';
import Homepage from "./pages/Homepage";
import Profile from './pages/Profile';
import Settings from "./pages/Settings";
import theme from './styles/Theme';


function App() {
  // const [host] = useState('http://localhost:8000')
  // const [host] = useState("https://pinterest-mamume.herokuapp.com")
  const [host] = useState(process.env.REACT_APP_BACK_HOST)

  const [headers, setHeaders] = useState({
    "content-type": "application/json",
    "Authorization": `JWT ${localStorage.getItem('pinterestAccessToken')}`
  })
  const [authedUser, setAuthedUser] = useState(null)
  const [pins, setPins] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log(process.env.REACT_APP_UNSPLASH_ACCESS_KEY)
    console.log(process.env.REACT_APP_BACK_HOST)

    if (localStorage.getItem('pinterestAccessToken') && host) {
      fetch(`${host}/user_profile/list/`, { headers })
        .then(res => res.json())
        .then(data => {
          if (data[0]?.username)
            setAuthedUser(data[0])
          else
            setAuthedUser(null)
        })
        .then(setLoading(false))
        .catch(err => console.log(err))
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
    localStorage.getItem('pinterestAccessToken') && host &&
      fetch(`${host}/pin/pins/`, { headers })
        .then(res => res.json())
        .then(data => setPins(data))
        .catch(err => console.log(err))
  }, [headers, host])

  const AuthRef = useRef();
  const runAuth = (type) => {
    AuthRef.current.handleClickOpen(type)
  }

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
                    <Route path="app/" exact element={<Homepage pins={pins} addItem={addItem} removeItem={removeItem} />} />
                    <Route path="app/profile/" element={<Profile addItem={addItem} />} />
                    <Route path="app/profile/:usernameParam" element={<Profile addItem={addItem} />} />
                    <Route path="app/settings/*" element={<Settings />} />
                    <Route path="app/board/" element={<Board addItem={addItem} />} />
                    <Route path="app/create_pin/" element={<Create />} />
                    <Route path='app/pin/:id' element={<Pin />} />
                  </Routes>
                :
                <Routes>
                  <Route path="app/" exact element={<LogoutHomepage />} />
                  <Route path="app/password-reset" element={<PwReset />} />
                  <Route path="app/password-reset/confirm" element={<PwResetConfirm />} />
                </Routes>
              }
            </Container>
          </Router>
        </UserContext.Provider>
      </ThemeProvider>
    </Fragment >
  );
}

export default App;


