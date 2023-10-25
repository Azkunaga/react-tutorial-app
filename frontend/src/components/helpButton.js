import React from "react";

const HelpButton = (props) => {

    return (
        <div className='button-right question-button'>
            <a className="button_circle" onClick={props.action}>
                <i className="fa-solid fa-question" ></i>
            </a>
        </div>
    );
}
 
export default HelpButton;