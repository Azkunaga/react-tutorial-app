import React from "react";

const NewRow = (props) => {

    return (
        <div className='new'>
            <a className="button_plus" href={props.redirect}>
                <i className="fa-solid fa-plus"></i>
            </a>
        </div>
    );
}
 
export default NewRow;