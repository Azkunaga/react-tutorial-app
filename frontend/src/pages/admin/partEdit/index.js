import {React, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './style.css'
import {normalAxios} from '../../../api/axios'
import BackButton from '../../../components/backButton';

const PartEditPage = () => {

    let [data, setData] = useState("");
    let [exerciseData, setExerciseData] = useState([]);

    let [name,setName] = useState("");
    let [part,setPart] = useState("");
    let [text,setText] = useState("");


    const { topicId, partId } = useParams();
  
    useEffect(() => {
        getData();
        getExercises();
    }, [partId]);

    const getData = async () => {
        try {
            const role = localStorage.getItem('userData')?.role || null;
            const response = await normalAxios.post("/api/tutorial/" + partId,
                JSON.stringify({"role":role}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );   
            setData(response?.data?.part);

            setName(response?.data?.part.name);
            setPart(response?.data?.part.part);
            setText(response?.data?.part.text);

        } catch (err) {
            if (!err?.response) {
                console.log("no response");
            }else{
                console.log("error")
            }
        }
    }

    const getExercises = async (id) => {
        try {
            const role = localStorage.getItem('userData')?.role || null;
            const response = await normalAxios.post("/api/tutorial/question/part",
                JSON.stringify({"partId":partId, "role": role}),
                {   
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response);
            setExerciseData(response?.data?.questions);
        } catch (err) {
            if (!err?.response) {
                console.log("not response")
                console.log(err);
            }else{
                console.log(err);
            }
        }
    }

    const savePart = async () =>{
        try {
            const role = localStorage.getItem('userData')?.role || null;
            const response = await normalAxios.post("/api/tutorial/edit/"+partId,
            JSON.stringify({"part":part, "name":name, "text":text, "role": role}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            console.log(response);
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
           { data &&
           <div>
            <div className='edit'>
            <form onSubmit={savePart}>
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
                        <button type="button" className="btn btn-dark" onClick={savePart}>Save</button> 
                    </div>

            </form>
           </div>
           <h3>Exercises</h3>
            <MDBTable align='middle' className='topicTable' responsive bordered >
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Type</th>
                        <th scope='col'>Level</th>
                        <th scope='col'>Valid</th>
                        <th scope='col'>Question</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {exerciseData?.map((el)=>
                        <tr>
                            <th scope='row' >{el.type.name}</th>
                            <td>{el.difficulty.name}</td>
                            <td  className='actions'>{el.valid ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                            <td>{el.question}</td>
                            <td className='actions'>
                                <a href={'/admin/tutorial/topic/'+topicId+'/part/'+partId+"/question/"+el._id}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </a>
                            </td>
                        </tr>
                    )}
                </MDBTableBody>
            </MDBTable> 
            </div>
            }
            <BackButton></BackButton>
        </Container>
    )
}

export default PartEditPage;