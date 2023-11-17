import {Alert} from 'react-bootstrap';

const AlertComponent = (props) => {

  return (
    <Alert show={props.show} variant={props.variant} onClose={() => props.action(false)} dismissible>
        <p>
            {props.text}
        </p>
    </Alert>
  )
}

export default AlertComponent;