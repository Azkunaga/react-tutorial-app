import React from "react";

const NewRow = (props) => {

    return (
        <div className='button-right'>
            <a className="button_circle" href={props.redirect}>
                <i className="fa-solid fa-plus"></i>
            </a>
        </div>
    );
}
 
export default NewRow;