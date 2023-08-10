import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from '@mui/material/IconButton';
import AddBoxIcon from '@mui/icons-material/AddBox';
// component imports
import GalleryItem from "./GalleryItem"
import ImageUpload from "./ImageUpload";
import "./Gallery.css"

export default function Gallery() {
    const dispatch = useDispatch();
    const [userDisp, setUserDisp] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const gallery = useSelector(store => store.gallery);

    useEffect(() => {
        if (!userDisp) {
            dispatch({ type: 'FETCH_IMGS' })
        } else {
            dispatch({ type: 'FETCH_USER_IMGS' })
        }
    }, [gallery]);

    return (
        <div className="gallery">
            <div className="gallery-top">
                <div className="title-container">
                    {!userDisp
                        ? <h2>Community Gallery</h2>
                        : <h2>Your Gallery</h2>}
                </div>
                <div className="button-container">
                    {/* <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setModalOpen(true)}
                    >Add Image</Button> */}
                    <Tooltip title="Add Image" placement="top">
                        <IconButton
                            aria-label="add"
                            onClick={() => setModalOpen(true)}>
                            <AddBoxIcon fontSize="large" />
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <ImageUpload
                userDisp={userDisp}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
            <Grid container spacing={3}>
                {gallery.map(image =>
                    <GalleryItem
                        image={image}
                        key={image.id}
                    />)}
            </Grid>
        </div>
    )
}