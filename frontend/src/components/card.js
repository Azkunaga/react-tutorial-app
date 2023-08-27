import React from "react";
import tutImage from '../img/tutorial-icon.jpg'

const Card = () => {

    return (  
       <div className="card">
            <img src={tutImage} />
            <div className="card-content">
                <h3>Edit Tutorial</h3>
                <p>You will be able to edit tutorial parts and exercises</p>
            </div>
       </div>
    );
}
 
export default Card;