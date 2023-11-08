import {useEffect, useState, useRef} from 'react';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { useCreditsContext } from '../hooks/useCreditsContext';
import { useAuthContext } from '../hooks/useAuthContext';

import CreditForm from '../components/CreditForm';

const UpdateCredits = () => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const {credits, dispatch} = useCreditsContext();
    const [draggingElement, setDraggingElement] = useState(null);
    const dragItem = useRef(null);
    const dragOverItem = useRef(null);
    const { user } = useAuthContext();
    const [activeTab, setActiveTab] = useState('trailer');

    useEffect(() => {
        fetchCredits();
    }, [])

    const fetchCredits = async () => {
        const response = await fetch(`${serverUrl}/credits`);
        const json = await response.json();

        if(response.ok){
            dispatch({type: 'SET_CREDITS', payload: json})
        }
    }

    const handleDelete = async (e, id) => {
        if (!user){
            return;
        }
        const response = await fetch(`${serverUrl}/credits/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if(response.ok){
            console.log('in response.ok in updateCredits.js');
            dispatch({type: 'DELETE_CREDIT', payload: json})
        }
    }

    const handleSort = () => {
        let _credits = [...credits];

        const dragItemPos = _credits.map(x => x._id).indexOf(dragItem.current);
        const dragOverItemPos = _credits.map(x => x._id).indexOf(dragOverItem.current);

        const draggedItemContent = _credits.splice(dragItemPos, 1)[0];
        _credits.splice(dragOverItemPos, 0, draggedItemContent);

        dragItem.current = null;
        dragOverItem.current = null;

        dispatch({type: 'SET_CREDITS', payload: _credits})
    }

    const handleDragStart = (e, id) => {
        dragItem.current = id;
        setDraggingElement(id);
    }

    return (
        <div className="content-editor">
            <div className="left">
                <div>
                    <div className="content-categories">
                        <p className={activeTab === 'trailer' ? 'content-category active' : 'content-category'} onClick={() => setActiveTab('trailer')}>Trailers</p>
                        <p className={activeTab === 'other' ? 'content-category active' : 'content-category'} onClick={() =>setActiveTab('other')}>Film/Ads/Games</p>
                        <p className={activeTab === 'music' ? 'content-category active' : 'content-category'} onClick={() =>setActiveTab('music')}>Music</p>
                    </div>
                    <div className="content-list">
                    {credits && credits.filter(credit => credit.category === activeTab).map(credit => (
                        <div 
                            key={credit._id} 
                            // className={draggingElement == credit._id ? 'content-card draggable dragging' : 'content-card draggable'} 
                            className='content-card draggable'
                            draggable="true" 
                            onDragStart={(e) => handleDragStart(e, credit._id)}
                            onDragEnter={(e) => dragOverItem.current=credit._id}
                            onDragEnd={handleSort}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <img 
                                src={credit.image} 
                                alt="Credit Poster" 
                                width="100"
                            />
                            <div className="content-card-info">
                                <h3>{credit.title}</h3>
                                <a href={credit.url} target="_blank" rel="noreferrer" alt="Video Url">{credit.url}</a>
                                <p>Date: {credit.date}</p>
                            </div>
                            <div className="delete-button">
                                <BsFillTrash3Fill onClick={(e) => handleDelete(e, credit._id)}/>
                            </div>
                        </div>
                    ))}
                </div>
                {/* {credits && credits.filter(credit => credit.category === 'trailer').map(credit => (
                        <div 
                            key={credit._id} 
                            // className={draggingElement == credit._id ? 'content-card draggable dragging' : 'content-card draggable'} 
                            className='content-card draggable'
                            draggable="true" 
                            onDragStart={(e) => handleDragStart(e, credit._id)}
                            onDragEnter={(e) => dragOverItem.current=credit._id}
                            onDragEnd={handleSort}
                            onDragOver={(e) => e.preventDefault()}
                        >
                            <img 
                                src={credit.image} 
                                alt="Credit Poster" 
                                width="100"
                            />
                            <div className="content-card-info">
                                <h3>{credit.title}</h3>
                                <a href={credit.videoUrl} target="_blank" rel="noreferrer" alt="Video Url">{credit.videoUrl}</a>
                                <p>Created: {credit.createdAt}</p>
                            </div>
                            <div style={{position: 'relative', top: '10px', right: '10px', color: 'gray', fontWeight: 'bold', cursor: 'pointer', display: 'flex'}}>
                                <BsFillTrash3Fill onClick={(e) => handleDelete(e, credit._id)}/>
                            </div>
                        </div>
                    ))} */}
                </div>
            </div>
            <div className="right">
                <CreditForm/>
            </div>
        </div>
    )
}

export default UpdateCredits;