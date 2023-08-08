import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import Paper from "@mui/material/Paper";
import GalleryItem from "./GalleryItem"
import ImageUpload from "./ImageUpload";


export default function Gallery(){
    const dispatch = useDispatch();
    const [userDisp, setUserDisp] = useState(false)
    const gallery = useSelector(store => store.gallery);

    useEffect(() => {
        if (!userDisp){
            dispatch({ type: 'FETCH_IMGS' })
        } else {
            dispatch({ type: 'FETCH_USER_IMGS' })
        }
    }, [gallery]);

    return(
        <Paper>
            <h2>test</h2>
            <ImageUpload 
                userDisp={userDisp}
            />
            {gallery.map(image => 
                <GalleryItem
                    image={image}
                    key={image.id}
                />)}
        </Paper>
    )
}