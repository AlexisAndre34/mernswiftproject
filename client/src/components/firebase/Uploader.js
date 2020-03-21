import React, {useState, Fragment} from 'react';
import { setAlert } from '../../actions/alert';
import storage from '../../firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

export const Uploader = () => {
    
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("");
    const [progress, setProgress] = useState(null);

    const handChange = e => {
        const file = e.target.files[0];
        if(file) {
            const fileType = file["type"]
            const validImageTypes=["image/jpeg","image/png"]
            if (validImageTypes.includes(fileType)) {
                setImage(file);

            } else {
                setAlert('Veuillez choisir une image', 'danger');
            }
        }
    }

    const handleUpdate = async () => {
        if(image) {
            const metadata = {contentType: 'image/jpeg'}
            const imageName = uuidv4() + 'jpeg';
            const imageRef = storage.ref(`images/${imageName}`);
            const uploadTask = await imageRef.put(image, metadata);
            const urldownload = await imageRef.getDownloadURL().catch((error) => console.log(error));
            setUrl(urldownload);
            console.log(urldownload)
        } else {
            setAlert('Veuillez choisir une image');
        }
    }

    return (
        <Fragment>
            <div>
            <input type="file" onChange={handChange} />{' '}
            <button type="button" className="btn btn-primary" onClick={handleUpdate} >Button</button>
            {progress > 0 ? <progress value={progress} max="100" /> : ""}
            </div>
            { url ? <img src={url} /> : <p>choisir une image de profile</p>}
        </Fragment>
    )
}

export default Uploader
