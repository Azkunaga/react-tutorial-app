import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Markdown from 'react-markdown';
import SpinnerComponent from './spinnerComponent';
import { useEffect, useState } from 'react';

const HelpModal = (props) => {

    const [isComplete, setIsComplete] = useState(false);

    useEffect(()=>{
        console.log(props.help);
        if(props.help){
            setIsComplete(true);
        }else{
            setIsComplete(false);
        }
    },[props.help])

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
     >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Exercise Help
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isComplete ? 
            <Markdown>{props.help}</Markdown>
        :
            <SpinnerComponent color="secondary"></SpinnerComponent>
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default HelpModal;