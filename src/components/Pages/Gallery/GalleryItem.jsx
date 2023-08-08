import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"

export default function GalleryItem({ image }) {

    return (
        <Card elevation={3}
        sx={{p: 3, m: 1.5, width: '50%'}}>
            <CardHeader
                title={image.title}
            />
            <CardMedia>
                <img src={image.url} />
            </CardMedia>
            <CardContent>
                <p>{image.description}</p>
            </CardContent>
        </Card>
    )
}