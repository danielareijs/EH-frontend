import { SlSocialSpotify } from 'react-icons/sl';
const Music = ({credit}) => {
    const openInNewTab = (url) => {
        console.log('IN open new tab: ', url);
        window.open(url, "_blank", "noreferrer");
      };

    return (
        <div 
            className="card music-card" 
            onClick={(e) => openInNewTab(credit.url)}
        >
            <div> 
                <div className="image" style={credit.image ? {backgroundImage: `url("${credit.image}")`} : {background: 'rgb(40,40,40)'}}>
                    <i class="fa-solid fa-circle-play"></i>
                </div>        
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}>
                    <div style={{textAlign: 'left'}}>
                        <p>{credit.title}</p>
                        {/* <p className="badge">Artist</p> */}
                    </div>
                </div>
            </div>
            
        </div>
     );
}

export default Music;