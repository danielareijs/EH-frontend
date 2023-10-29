import {useState, useEffect} from 'react';
import Trailer from './Trailer';
import Other from './Other';
import Music from './Music';

const Trailers = ({contentType}) => {
    const [credits, setCredits] = useState(null);

    useEffect(() => {
        const fetchCredits = async () => {
            const response = await fetch(`/credits/${contentType}`);
            const json = await response.json();

            if(response.ok){
                setCredits(json);
                console.log('credits in Trailers: ', credits);
            }
        }

        fetchCredits();

    }, []);

    return (
        <div className="container content-container">
            {credits && contentType == 'trailer' && (
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
                        <Music key={credit._id} credit={credit}/>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Trailers;