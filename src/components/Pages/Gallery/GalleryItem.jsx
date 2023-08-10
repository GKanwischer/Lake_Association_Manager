import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import CardMedia from "@mui/material/CardMedia"
import CardContent from "@mui/material/CardContent"
import CardActions from "@mui/material/CardActions"
import Grid from "@mui/material/Grid"

export default function GalleryItem({ image }) {

    return (
        <Grid item
            xs={6} md={4} lg={3}
        >
            <Card elevation={3}
                sx={{ 
                    p: 2, 
                    height: "100%", 
                    }}>
                <CardHeader
                    title={image.title}
                />
                <CardMedia
                    component="img"
                    image={image.url}
                />
                <CardContent>
                    <p>{image.description}</p>
                </CardContent>
            </Card>
        </Grid>
    )
}