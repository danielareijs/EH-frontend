import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ReactPlayer from 'react-player';

const modalStyles = {
    content: {
        width: '100vw',
        maxWidth: '1000px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(0,0,0,0.9)',
        border: 'none'
    },
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.9)'
      }
  };

Modal.setAppElement('#root');


const Trailer = ({credit}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [url, setUrl] = useState('');

    useEffect(() => {
        let url = credit.url;
        setUrl(url);
    }, []);

    function openModal(){
        setIsOpen(true);
    }

    function afterOpenModal(){
        
    }

    function closeModal(){
        setIsOpen(false);
    }


    return ( 
        <>
            <div 
                className="card trailer-card" 
                style={credit.image ? {backgroundImage: `url("${credit.image}")`} : {background: 'rgb(40,40,40)'}}
                onClick={openModal}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <i className="fa-regular fa-circle-play"></i>
                    </div>
            </div>
            <Modal 
            isOpen={isOpen}
            onRequestClose={closeModal}
            onAfterOpen={afterOpenModal}
            style={modalStyles}
            >
                {url &&
                <ReactPlayer 
                playing={true}
                url={url}
                sources={[
                    { src: {url}, type: 'video/mp4' },
                    { src: {url}, type: 'video/webm' },
                  ]} />
                }
                {!url && <img src={credit.image} style={{width: '50%'}}/>}
            </Modal>
        </>
     );
}

export default Trailer;
