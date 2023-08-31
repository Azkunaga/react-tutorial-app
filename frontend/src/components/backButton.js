import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
    
    const navigate = useNavigate();

    return (  
        <div className="backButton" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-angle-left"></i> Back
        </div>
    );
}
 
export default BackButton;