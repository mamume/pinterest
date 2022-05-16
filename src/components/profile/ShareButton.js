import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { IconButton } from '@mui/material';
import WhatsappRoundedIcon from '@mui/icons-material/WhatsappRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  link: {
    textDecoration: "inherit",
    color: "inherit",
    '&:hover': {
      textDecoration: "inherit",
    }
  },
})

export default function BasicMenu({ username }) {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [currentURL] = React.useState(window.location.href)
  function copyURL() {
    navigator.clipboard.writeText(currentURL)
  }

  return (
    <div>
      <Button
        onClick={handleClick}
        color="grey"
      >
        Share
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}

      >
        <IconButton sx={{ color: "#0571E6" }}>
          <a
            target="_blank"
            rel="noreferrer"
            className={classes.link}
            href={`https://www.facebook.com/sharer/sharer.php?u=${currentURL}/`}>
            <FacebookRoundedIcon fontSize="large" />
          </a>
        </IconButton>

        <IconButton sx={{ color: "#00E676" }}>
          <a
            target="_blank"
            rel="noreferrer"
            className={classes.link}
            href={`whatsapp://send?text=${currentURL}`}>
            <WhatsappRoundedIcon fontSize="large" />
          </a>
        </IconButton>

        <IconButton sx={{ color: "#1A8CD8" }}>
          <a
            className={classes.link}
            href={`http://twitter.com/share?text=Share Profile:&url=${currentURL}`}
            target="_blank"
            rel="noreferrer"
          >
            <TwitterIcon fontSize="large" />
          </a>
        </IconButton>

        <IconButton color="secondary" onClick={copyURL}>
          <ContentCopyRoundedIcon fontSize="large" />
        </IconButton>
      </Menu>
    </div >
  );
}
