import Card from "@mui/material/Card"

// this component constructs the about us section of the home/login page

export default function LoginAbout() {

    return (
        <Card className="login-about"
        sx={{
            border: 4,
            borderRadius: '16px',
            borderColor: 'rgb(114, 162, 245)'
          }}>
            <div className="la-msg">
                <h2>About us</h2>
                <p>This is a site that was designed for the purpose of helping memebers
                    of a lake association to more effectively manage the governing principals
                    of their community. We want to provide the members a way to handle tedious
                    stuff from home, so they can spend more time doing the things they enjoy
                    while at the lake. If you stumbled upon us by happenstance and would like
                    to learn more about our community. Feel free to reach out to one of our board
                    members at <strong>LakeViewAssociation@gmail.com</strong></p>
            </div>
            <div className="la-pic">
                <img src="/images/Login_page_graphic.png" />
            </div>
        </Card>

    )
}