import {React, useState} from 'react'
import {Container, Row, Col} from 'react-bootstrap'
import { normalAxios } from '../../../../api/axios';
import { useNavigate, useParams } from "react-router-dom";

const NewTutorialTopicPage = () => {

    const navigate = useNavigate();

    const { or } = useParams();

    let [name,setName] = useState("");
    let [order,setOrder] = useState(or);
  
    const createTopic = async () =>{
        try {
            const role = localStorage.getItem('userData')?.role || null;
            const response = await normalAxios.post("/api/tutorial/topic/",
            JSON.stringify({"order":order, "topic":name, "role": role}),
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
            if (!err?.response) {
                console.log("not response")
                console.log(err);
            }else{
                console.log(err);
            }
        }
    }

    return (
        <Container>
           <h2>Add a Tutorial Topic</h2>
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