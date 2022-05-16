import { Fragment, useEffect, useState } from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Styles from "../../styles/Styles";
import { useNavigate } from "react-router";
import { ImageListItemBar } from "@mui/material";

function BoardThumbnail({ board, isAuthedProfile }) {
  const classes = Styles()
  const [pins, setPins] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!board.share && !isAuthedProfile)
      setPins({ content_src: "/images/private_board.png", title: "Private" })
    else {
      setPins(board.pins.slice(0, 3))

      if (board.pins.length === 0)
        setPins({ content_src: "/images/board_placeholder.png", title: "No Content" })
    }
  }, [board.pins, board.share, isAuthedProfile])

  function openBoard() {
    navigate(`/board?board_id=${board.id}`)
  }

  return (
    <Fragment>
      <ImageList
        className={classes.boardThumbnail}
        variant="quilted"
        cols={3}
        onClick={openBoard}
      >
        {pins.length && pins.map((pin, index) => (
          <ImageListItem key={index}>
            <img
              src={pin.content_src}
              alt={pin.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
        <ImageListItemBar
          title={board.share || isAuthedProfile ? board.title : "Private Board"}
        />
      </ImageList>
    </Fragment>
  );
}

export default BoardThumbnail;