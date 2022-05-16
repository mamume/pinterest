import { Button, Stack, Typography } from "@mui/material";
import { Fragment } from "react";

function Notifications() {
    return (
        <Fragment>
            <Typography variant="h5">Notifications</Typography>
            <Typography variant="subtitle1" paragraph>We'll always let you know about important changes, but you pick what else you want to hear about.</Typography>

            <Typography variant="h6">On Pinterest</Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="start" spacing={2}>
                <Typography variant="subtitle1" paragraph>Pick which notifictions to see while in the app or on the site.</Typography>
                <Button color="grey" variant="contained" component="span">
                    Edit
                </Button>
            </Stack>
            <Typography variant="h6">By Email</Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="start" spacing={2}>
                <Typography variant="subtitle1" paragraph>Pick which notifications to get by email.</Typography>
                <Button color="grey" variant="contained" component="span">
                    Edit
                </Button>
            </Stack>
            <Typography variant="h6">By Push Notification</Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="start" spacing={2}>
                <Typography variant="subtitle1" paragraph>Pick which notifications to get on your phone or computer.</Typography>
                <Button color="grey" variant="contained" component="span">
                    Edit
                </Button>
            </Stack>
        </Fragment>
    );
}

export default Notifications;