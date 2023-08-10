import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
// component imports
import GalleryItem from "./GalleryItem"
import ImageUpload from "./ImageUpload";
import "./Gallery.css"

export default function Gallery() {
    const dispatch = useDispatch();
    const [userDisp, setUserDisp] = useState(false)
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
            {!userDisp
                ? <h2>Community Gallery</h2>
                : <h2>Your Gallery</h2>}
            <ImageUpload
                userDisp={userDisp}
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