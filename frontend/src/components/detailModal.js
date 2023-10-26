import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Markdown from 'react-markdown';

const DetailModal = (props) => {

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
     >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Move details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <Markdown className='detailText'>{props.text}</Markdown>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
    )
}

export default DetailModal;