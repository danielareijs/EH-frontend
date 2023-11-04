import {useState, useEffect} from 'react';
import { useCreditsContext } from '../hooks/useCreditsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const CreditForm = () => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const {dispatch} = useCreditsContext();
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('Trailer');
    const [error, setError] = useState(null);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const { user } = useAuthContext();

    useEffect(() => {
        if(title && image && url && category){
            setButtonDisabled(false);
        }
    }, [title, image, category, url])

    const handleImageUpload = (event) => {

        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = () => {
            resizeImage(reader.result, 350, 400).then((result) => {
                setImage(result);
            });
        }

    }

    function resizeImage(base64Str, maxWidth = 500, maxHeight = 600) {
        return new Promise((resolve) => {
          let img = new Image()
          img.src = base64Str
          img.onload = () => {
            let canvas = document.createElement('canvas')
            const MAX_WIDTH = maxWidth
            const MAX_HEIGHT = maxHeight
            let width = img.width
            let height = img.height
      
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width
                width = MAX_WIDTH
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height
                height = MAX_HEIGHT
              }
            }
            canvas.width = width
            canvas.height = height
            let ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, width, height)
            resolve(canvas.toDataURL())
          }
        })
      }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user){
            setError('Use must be logged in');
            return;
        } 

        const credit = {title, category, url, image}
        console.log('CREDIT: ', credit);

        const response = await fetch(`${serverUrl}/credits`, {
            method: 'POST',
            body: JSON.stringify(credit),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if(!response.ok){
            setError(response.json().error)
        }
        if(response.ok){
            setTitle('');
            setCategory('');
            setUrl('');
            setImage('');
            setError(null);
            console.log('New credit added.');
            
            dispatch({type: 'CREATE_CREDIT', payload: json});
        }
    }

    return (
        <div className="create-form">
            <h2>Add new credit</h2>
            {error && <div className="error">{error}</div>}
            <label>
                <p>Category</p>
                <select 
                    value={category} 
                    onChange={(e) => setCategory(e.target.value)} 
                    required>
                    <option value="trailer">trailer</option>
                    <option value="music">music</option>
                    <option value="other">other</option>
                </select>
            </label>
            <label>
                <p>Title</p>
                <input 
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />
            </label>
            <label>
                <p>URL</p>
                <input 
                    type="text"
                    onChange={(e) => setUrl(e.target.value)}
                    value={url}
                />
            </label>
            <label>
                {!image && <p>Poster</p>}
                {image && <img src={image} alt="Unknown" width="150"/>}
            <input type="file" onChange={(e) => handleImageUpload(e)}/>
            </label>
            
           
            <input 
                type="submit" 
                value="Add Credit" 
                onClick={handleSubmit} 
                disabled={buttonDisabled}/>
        </div>
    )
}

export default CreditForm;