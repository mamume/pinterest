import { Container, List, ListItemButton, ListItemText, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Drawer from '@mui/material/Drawer';
import PublicProfile from '../components/settings/PublicProfile'
import AccountSettings from '../components/settings/AccountSettings';
import {
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import Security from '../components/settings/Security';

const drawerWidth = 200

const useStyles = makeStyles({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    marginTop: "90px",
    border: "0px"
  },
  link: {
    textDecoration: "inherit",
    color: "inherit",
    '&:hover': {
      textDecoration: "inherit",
    }
  },
})

function Setting() {
  const classes = useStyles()
  const location = useLocation();

  return (
    <Container>
      <div className={classes.root}>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          anchor="left"
          classes={{ paper: classes.drawer }}
        >
          <List>
            <Link to="" className={classes.link}>
              <ListItemButton selected={location.pathname === "/settings"}>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "button"
                  }}
                >
                  Public Profile
                </ListItemText>
              </ListItemButton>
            </Link>

            <Link to="account" className={classes.link}>
              <ListItemButton selected={location.pathname === "/settings/account"}>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "button"
                  }}
                >
                  Account Settings
                </ListItemText>
              </ListItemButton>
            </Link>

            {/* <ListItemButton>
              <ListItemText
                primaryTypographyProps={{
                  variant: "button"
                }}
              >
                Home feed tuner</ListItemText>
            </ListItemButton>
            <ListItemButton>
              <ListItemText
                primaryTypographyProps={{
                  variant: "button"
                }}
              >
                Claim</ListItemText>
            </ListItemButton>

            <Link to="notifications" className={classes.link}>
              <ListItemButton selected={location.pathname === "/settings/notifications"}>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "button"
                  }}
                >
                  Notifications
                </ListItemText>
              </ListItemButton>
            </Link> */}

            <Link to="security" className={classes.link}>
              <ListItemButton selected={location.pathname === "/settings/security/"}>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "button"
                  }}
                >
                  Security</ListItemText>
              </ListItemButton>
            </Link>
            {/* <Link to="privacy" className={classes.link}>
              <ListItemButton selected={location.pathname === "/settings/privacy"}>
                <ListItemText
                  primaryTypographyProps={{
                    variant: "button"
                  }}
                >
                  Privacy and data</ListItemText>
              </ListItemButton>
            </Link> */}

            {/* <ListItemButton>
              <ListItemText
                primaryTypographyProps={{
                  variant: "button"
                }}
              >
                Security</ListItemText>
            </ListItemButton> */}
            {/* <ListItemButton>
              <ListItemText
                primaryTypographyProps={{
                  variant: "button"
                }}
              >
                Apps</ListItemText>
            </ListItemButton> */}
          </List>
        </Drawer>
        <Stack m={3} spacing={2} sx={{ width: "490px" }}>
          <Routes>
            <Route path="" element={<PublicProfile />}
            />
            <Route path="account" element={<AccountSettings />} />
            <Route path="security" element={<Security />} />
            {/* <Route path="notifications" element={<Notifications />} /> */}
            {/* <Route path="privacy" element={<PrivacyAndData />} /> */}
          </Routes>
        </Stack>
      </div>
    </Container>
  );
}

export default Setting;