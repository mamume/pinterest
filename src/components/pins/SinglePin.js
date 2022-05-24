
import styled from 'styled-components';
import Button from '@mui/material/Button';
import CallMadeIcon from '@mui/icons-material/CallMade';
import IconButton from '@mui/material/IconButton';
import DownloadIcon from '@mui/icons-material/Download';
import { Link } from 'react-router-dom'
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import React, { useState, useEffect, useContext, Fragment } from "react";
import { UserContext } from "../../context";
import { Stack, Typography, Box } from '@mui/material';
import Styles from '../../styles/Styles'
import { saveAs } from 'file-saver'
import CreateBoard from '../profile/CreateBoard'




function SinglePin({ onOpenPinModal, img, external_link, id, boards, sub_board, pinItem }) {
  // const downloadImage = () => {
  //   saveAs(img, 'image.jpg') // Put your image url here.
  // }
  const { authedUser, headers, host } = useContext(UserContext)

  const classes = Styles()
  const [savedBoard, setSavedBoard] = useState("");
  const [linked, setLinked] = useState(false)
  const [subBoard, setSubBoard] = useState(sub_board)
  const [openCreateBoard, setOpenCreateBoard] = useState(false)


  const handlePost = () => {
    const fd = new FormData()
    fd.append('pin_id', id)
    fd.append('board_id', savedBoard)

    fetch(`${host}/pin/link_board`, {
      method: 'POST',
      body: fd,
      headers: { 'Authorization': headers.Authorization }
    })
      .then(response => response.json())
      .then(() => {
        setSubBoard(boards.filter(board => board.id === savedBoard)[0])
        setLinked(true)
      })
  }

  useEffect(() => {
    if (subBoard !== "None" && authedUser.id === subBoard.owner) {
      setLinked(true)
    }
  }, [authedUser, subBoard])

  const saveImage = (image, title) => {
    saveAs(image, `${title}.jpg`)
  }

  return (
    <>
      <Wrapper>
        <CardWrapper className={classes.pin}>
          <div className="myModal">
            <Stack direction='row' justifyContent="space-between" p={1} spacing={1}>
              {linked
                ? <Fragment>
                  <Link
                    to={`/board?board_id=${subBoard.id}`}
                    className={classes.link}
                  >
                    <Box sx={{ bgcolor: "white", borderRadius: 1, p: "5px" }}>
                      <Typography variant="h6">{subBoard.title}</Typography>
                    </Box>
                  </Link>
                  <Button size="small" style={{ color: "white", backgroundColor: "black" }}>Saved</Button>
                </Fragment>

                : <>
                  {
                    boards.length
                      ? < Fragment >
                        <FormControl size="small" fullWidth>
                          <InputLabel id="select-board" style={{ color: "#455a64" }}>Board</InputLabel>
                          <Select
                            labelId="select-board"
                            onChange={(e) => setSavedBoard(e.target.value)}
                            label="Board"
                            style={{ backgroundColor: "white" }}
                            value={savedBoard}
                            size="small"
                          >
                            {boards.map((item, index) => (
                              <MenuItem value={item.id} key={index}>{item.title}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <Button size="small" onClick={handlePost}>Save</Button>
                      </Fragment>
                      : <Button size="small" onClick={() => setOpenCreateBoard(true)}>Create Board</Button>
                  }</>}
            </Stack>

            <div style={{ display: "flex", height: "100%" }} onClick={onOpenPinModal} className="my_image_div"></div>
            <div className="my_modal_footer">
              {external_link && (<a href={external_link}><div className="my_ext" style={{ position: "absolute", float: "left", bottom: "15px", left: "15px" }} >
                <IconButton>
                  <CallMadeIcon />
                </IconButton>
                <span>{external_link}</span>
              </div> </a>)}

              <div className="my_send" style={{ position: "absolute", float: "right", bottom: "15px", right: "15px" }}>
                {/* <IconButton onClick={downloadImage}>
                  <DownloadIcon />
                </IconButton> */}
                <IconButton disableRipple sx={{ bgcolor: "white" }} onClick={() => saveImage(img, pinItem.title)}>
                  <DownloadIcon />
                </IconButton>
              </div>
            </div>
          </div>

          <img style={{ minHeight: 236, }} src={img} alt="" />
        </CardWrapper>
      </Wrapper >
      < CreateBoard
        openCreateBoard={openCreateBoard}
        closeCreateBoard={() => setOpenCreateBoard(false)
        }
      />
    </>
  )
}

export default SinglePin

const Wrapper = styled.div`
    display: inline-flex;
    padding: 8px;

    img{
        display: flex;
        justify-content: center;
        width: 100%;
        border-radius: 16px;
        object-fit: cover;
    }
`

const CardWrapper = styled.div`
    width: 250px;

    border-radius: 16px;
    background-color: #efefef;
    position: relative;
    overflow: hidden;
    space: no-wrap;
    margin: auto;
    &:hover{
        img{
            opacity: 50%;
        }
    }

    .myModal{
        width: 100%;
        opacity: 0;
        transition-duration: 1s;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);

        height:100%;

    }

    .myModal:hover{
        opacity: 100%;
        postion: absolute;
        z-index: 1000;

    }
    .my_modal_header{
        display: flex;
        padding: 8px;
    }

    .my_modal_header .One{
        flex-grow: 10;
    }
    .my_modal_header .Two{
        flex-grow:30 ;
    }
    .my_modal_header .Three{
        flex-grow: 10;
    }

    .my_image_div:hover{
      cursor: pointer;

    }

    .my_modal_footer{
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        position: fixed;
        bottom: 0;
        padding: 10px 0px;

        a{
            text-decoration: none;
        }


    }

    .my_ext{
        height: 32px;
        width: 130px;
        background-color: #efefef;
        border-radius: 16px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .my_ext span{
        display: inline-block;
        white-space: nowrap;
        overflow: hidden;
    }

    .my_send, .my_options{
        height: 32px;
        background-color: #efefef;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`


