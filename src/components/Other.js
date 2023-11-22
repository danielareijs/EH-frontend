import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import ReactPlayer from 'react-player/youtube';

const modalStyles = {
    content: {
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


const Other = ({credit}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [url, setUrl] = useState('');

    useEffect(() => {
        setUrl(credit.url);
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
                className="card other-card" 
                // style={credit.image ? {backgroundImage: `url("${credit.image}")`} : {background: 'rgb(40,40,40)'}}
                onClick={openModal}>
                    <div>
                        <div className="other-card-img" style={credit.image ? {backgroundImage: `url("${credit.image}")`} : {background: 'rgb(40,40,40)'}}>
                            <i className="fa-regular fa-circle-play"></i>
                        </div>
                    </div>
            </div>
            <Modal 
            isOpen={isOpen}
            onRequestClose={closeModal}
            onAfterOpen={afterOpenModal}
            style={modalStyles}
            >
                <ReactPlayer 
                playing={true}
                url={url}
                sources={[
                    { src: {url}, type: 'video/mp4' },
                    { src: {url}, type: 'video/webm' },
                  ]} />
            </Modal>
        </>
     );
}

export default Other;