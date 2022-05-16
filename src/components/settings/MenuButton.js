import { Menu, MenuItem, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import { IconButton } from '@mui/material';

function MenuButton({ icon, label, options }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Fragment>
            <IconButton color="black" onClick={handleClick}>{icon}</IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                elevation={1}
            >
                <Typography variant="caption" color="grey" mx>{label}</Typography>

                {options.map((option, index) => (
                    <MenuItem selected={index === 0} key={index} onClick={handleClose}>{option}</MenuItem>
                ))}
            </Menu>
        </Fragment>
    );
}

export default MenuButton;
