
export default function ImageUpload(){

    const addImage = async (files) => {
        try {          
          let image_url = ''; 
    
          if (imageSelected !== '') {
            const formData = new FormData();
            formData.append('file', imageSelected); // appending the imageSelected state to be the file selected by the user
            formData.append('upload_preset', 'scbbuugt'); // this is needed to upload to the cloudinary account
    
            // This does the actual work of posting the image to the cloudinary server
            const response = await axios.post('https://api.cloudinary.com/v1_1/lake-association-manager/image/upload', formData); 
            // setting the variable of the image url from the response
            image_url = response.data.secure_url;
          }
          dispatch({ // This fires the post request to insert a new image into the db
            type: 'ADD_PROP',
            payload: {
              description: description,
              image_url: image_url,

            }
          });
        } catch (error) {
          console.log("Image add error!");
        }
      };

    return(
        <>
            <input type="file" onChange={e => setImageSelected(e.target.files[0])}/>
        </>
    )
}