import {useState, useEffect} from 'react';
import Trailer from './Trailer';
import Other from './Other';
import Music from './Music';

const Trailers = ({contentType}) => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const [credits, setCredits] = useState(null);

    useEffect(() => {
        const fetchCredits = async () => {
            const response = await fetch(`${serverUrl}/credits/${contentType}`);
            const json = await response.json();

            if(response.ok){
                setCredits(json);
                console.log('after sort: ', credits);
            }
        }

        fetchCredits();


    }, []);

    return (
        <div className="container content-container">
            {credits && (contentType == 'trailer' || contentType == 'Trailer') && (
                <div className="card-list trailer-card-list">
                    {credits.map(credit => (
                        <Trailer key={credit._id} credit={credit}/>
                    ))}
                </div>
            )}

            {credits && contentType == 'other' && (
                <div className="card-list other-card-list">
                    {credits.map(credit => (
                        <Other key={credit._id} credit={credit}/>
                    ))}
                </div>
            )}

            {credits && contentType == 'music' && (
                <div className="card-list music-card-list">
                    {credits.map(credit => (
                        <Music key={credit._id} credit={credit} amountOfCredits={credits.length}/>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Trailers;