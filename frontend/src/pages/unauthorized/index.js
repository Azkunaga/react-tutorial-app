import { useNavigate } from "react-router-dom"
import { Container } from "react-bootstrap";

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <Container>
                <div className='center e404'>
                    <h2>UNAUTHORIZED</h2>
                    <p>You do not have access to the requested page.</p>
                    <div className="gs_button" >
                        <div className="slide"></div>
                        <a className="gs_a" onClick={goBack}>Go back home</a>
                    </div>
                </div>
            </Container>
    )
}

export default Unauthorized