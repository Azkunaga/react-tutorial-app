import {React, useState} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import { authAxios } from '../../../../api/axios';
import { useNavigate, useParams } from "react-router-dom";
import AlertComponent from '../../../../components/alert';

const NewTutorialTopicPage = () => {

    const navigate = useNavigate();

    const { or } = useParams();

    let [name,setName] = useState("");
    let [order,setOrder] = useState(or);

    let [alertShow, setAlertShow] = useState(false);
    let [alert, setAlert] = useState("");
  
    const createTopic = async () =>{
        try {
            const response = await authAxios.post("/api/tutorial/topic/",
            JSON.stringify({"order":order, "topic":name}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );

            if(response.status===200){
                navigate(-1);
            }
            
            setName("");
            setOrder("");
        }catch(err){
            console.log("Error", err)
            if (err.response?.data?.message) {
                setAlertShow(true);
                setAlert(err.response?.data?.message);
            }else{
                setAlertShow(true);
                setAlert("Something went wrong")
            }
        }
    }

    return (
        <Container>
           <h2>Add a Tutorial Topic</h2>
           <AlertComponent show={alertShow} variant={"danger"} text={alert} action={setAlertShow}></AlertComponent>
           <div>
            <div className='edit'>
                <Row>
                    <Col>
                    <div className='input-container'>
                        <label htmlFor='order'>Order: </label>
                        <input type="number" 
                        placeholder=" "
                        id="order"
                        autoComplete="off"
                        value={order}
                        required
                        onChange={(e) => setOrder(e.target.value)}
                        />
                    </div>
                    </Col>
                    <Col>
                    <div className='input-container'>
                        <label htmlFor='name'>Name of Topic: </label>
                        <input type="text" 
                        placeholder=" "
                        id="name"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    </Col>
                </Row>

                    <div className='edit-actions'>
                        <button type="button" className="btn btn-dark" onClick={() => createTopic()}>Create new</button>
                        <button type="button" className="btn btn-dark" onClick={() => navigate(-1)}>Cancel</button>
                    </div>
           </div>
            </div>
        </Container>
    )
}

export default NewTutorialTopicPage;