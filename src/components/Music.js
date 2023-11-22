import { useEffect, useState } from "react";
const Music = ({credit, amountOfCredits}) => {
    // const [credits, setCredits] = useState(credits);

    useEffect(() => {
        console.log('Amount of credits: ', amountOfCredits);
    }, []);

    const openInNewTab = (url) => {
        window.open(url, "_blank", "noreferrer");
      };

    return (
        <div 
            className={amountOfCredits == 3 ? "card music-card three-music-cards" : "card music-card"} 
            onClick={(e) => openInNewTab(credit.url)}
        >
            <div> 
                <div className="image" style={credit.image ? {backgroundImage: `url("${credit.image}")`} : {background: 'rgb(40,40,40)'}}>
                    <i class="fa-solid fa-circle-play"></i>
                </div>        
                <div style={{width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}>
                    <div style={{textAlign: 'left'}}>
                        <p>{credit.title}</p>
                    </div>
                </div>
            </div>
            
        </div>
     );
}

export default Music;