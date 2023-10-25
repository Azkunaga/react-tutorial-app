import { MDBSpinner } from 'mdb-react-ui-kit';

const SpinnerComponent = (props) =>{

    return (
        <div className='text-center'>
            <MDBSpinner className='me-2' color={props.color} style={{ width: '3rem', height: '3rem' }}>
                <span className='visually-hidden'>Loading...</span>
            </MDBSpinner>
        </div>
    );
}

export default SpinnerComponent;