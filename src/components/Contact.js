const Contact = () => {
    return ( 
       <div id="contact">
            <h2>Contact</h2>
            <div>
                <div className="contact-info">
                    <div>
                    <p>espen.haagensli@gmail.com</p>
                    </div>
                    <div>
                        <ul className="social-media-list">
                            {/* <p style={{textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgb(0,0,0,0.4)', fontSize: '14px', fontWeight: 'light'}}>Espen Haagensli</p> */}
                            <li><a href="https://www.instagram.com/espenhmusic/" target="_blank" className="contact-icon">
                                <i className="fa-brands fa-instagram"></i></a>
                            </li>
                            <li><a href="https://www.facebook.com/pirtro" target="_blank" className="contact-icon">
                                <i className="fa-brands fa-facebook-f"></i></a>
                            </li>
                            <li><a href="mailto:espen.haagensli@gmail.com" target="_blank" className="contact-icon">
                                <i className="fa fa-envelope fa"></i></a>
                            </li>      
                        </ul>
                    </div>
                </div>
            </div>
       </div>
     );
}
 
export default Contact;