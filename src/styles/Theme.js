import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";
import { grey } from "@mui/material/colors";

const theme = createTheme({
    components: {
        MuiInputBase: {
            defaultProps: {
                sx: {
                    borderRadius: "16px",
                    height: "48px"
                },
            }
        },
        MuiTextField: {
            defaultProps: {
                color: 'info',
                InputLabelProps: {
                    sx: {
                        fontSize: "16px"
                    }
                }
            }
        },
        MuiButton: {
            defaultProps: {
                size: "large",
                variant: "contained",
                sx: {
                    borderRadius: "20px"
                }
            }
        },
        MuiSelect: {
            defaultProps: {
                color: 'info'
            }
        },
        MuiInputLabel: {
            defaultProps: {
                color: 'info'
            }
        },
        MuiRadio: {
            defaultProps: {
                color: 'black'
            }
        },
        MuiFormLabel: {
            defaultProps: {
                color: 'black'
            }
        },
        MuiCheckbox: {
            defaultProps: {
                color: 'black'
            }
        },
    },
    palette: {
        primary: {
            main: red[700],
            light: red[300],
            dark: red[900]
        },
        black: {
            main: grey[900],
            light: grey[500],
            contrastText: "#fff"
        },
        grey: {
            main: "#E2E2E2"
        }
    },
    shape: {
        borderRadius: 16
    }
});

export default theme;