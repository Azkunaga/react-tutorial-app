import {React, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import {normalAxios, authAxios} from '../../../../api/axios'

const NewTutorialPartPage = () => {

    const { id, or } = useParams();

    let [name,setName] = useState("");
    let [part,setPart] = useState(or);
    let [text,setText] = useState("");

    const navigate = useNavigate();
    
    const createPart = async () =>{
        try {
            const role = localStorage.getItem('userData')?.role || null;
            const response = await authAxios.post("/api/tutorial/",
            JSON.stringify({"topicId": id, "part":part, "name":name, "text":text, "role": role}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );

            if(response.status===200){
                navigate(-1);
            }
            
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
           <h2>Edit Tutorial Part</h2>

           <div>
            <div className='edit'>
                <Row>
                    <Col>
                    <div className='input-container'>
                        <label htmlFor='part'>Part: </label>
                        <input type="number" 
                        placeholder=" "
                        id="part"
                        autoComplete="off"
                        value={part}
                        required
                        onChange={(e) => setPart(e.target.value)}
                        />
                    </div>
                    </Col>
                    <Col>
                    <div className='input-container'>
                        <label htmlFor='name'>Name of Part: </label>
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
                <Row>
                    <Col>
                        <div className='input-container'>
                            <label htmlFor='text'>Content: </label>
                            <textarea type="text" 
                                placeholder=" "
                                id="text"
                                value={text}
                                required
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>
                        </Col>
                </Row>

                <div className='edit-actions'>  
                    <button type="button" className="btn btn-dark" onClick={() => createPart()}>Create new</button>
                    <button type="button" className="btn btn-dark" onClick={() => navigate(-1)}>Cancel</button>
                </div>

           </div>
           
            </div>


        </Container>
    )
}

export default NewTutorialPartPage;