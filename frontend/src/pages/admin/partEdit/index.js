import {React, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './style.css';
import {authAxios} from '../../../api/axios'
import NewRow from '../../../components/newRow'
import AlertComponent from '../../../components/alert';

const PartEditPage = () => {

    const navigate = useNavigate();

    let [data, setData] = useState("");
    let [exerciseData, setExerciseData] = useState([]);

    let [name,setName] = useState("");
    let [part,setPart] = useState("");
    let [text,setText] = useState("");

    let [alertShow, setAlertShow] = useState(false);
    let [alert, setAlert] = useState("");
    let [variant, setVariant] = useState("");

    let [newRow, setNewRow] = useState();

    const { topicId, partId } = useParams();
  
    useEffect(() => {
        getData();
        getExercises();
    }, [partId]);

    useEffect(() => {
        setNewRow(data[data.length-1]?.part+1)
    }, [data]);

    const getData = async () => {
        try {
            const role = localStorage.getItem('userData')?.role || null;
            const response = await authAxios.post("/api/tutorial/" + partId,
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
            const response = await authAxios.post("/api/tutorial/question/part",
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
            const response = await authAxios.post("/api/tutorial/edit/"+partId,
            JSON.stringify({"part":part, "name":name, "text":text, "role": role}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            console.log(response);

            if(response.status===200){
                setAlert("Saved correctly");
                setAlertShow(true);
                setVariant("success");
            }

        }catch(err){
            if (!err?.response.data.message) {
                setAlert("Something went wrong");
                setAlertShow(true);
                setVariant("danger");
            }else{
                setAlert(err?.response.data.message);
                setAlertShow(true);
                setVariant("danger")
            }
        }
    }

    const deleteQuestion = async(questId) => {
        try {
            const response = await authAxios.delete("/api/tutorial/question/"+questId,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            if(response.status===200){
                getExercises();
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
           <AlertComponent show={alertShow} variant={variant} text={alert} action={setAlertShow}></AlertComponent>
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
            <NewRow redirect={'/admin/tutorial/topic/'+topicId+'/part/'+partId+'/question/new'}></NewRow>
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
                        <tr key={el._id}>
                            <th scope='row' >{el.type.name}</th>
                            <td>{el.difficulty.name}</td>
                            <td  className='actions'>{el.valid ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-xmark"></i>}</td>
                            <td>{el.question.name}</td>
                            <td className='actions'>
                                <a href={'/admin/tutorial/topic/'+topicId+'/part/'+partId+"/question/"+el._id}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </a>
                                <button onClick={()=>deleteQuestion(el._id)}><i className="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    )}
                </MDBTableBody>
            </MDBTable> 
            </div>
            }
            <div className='edit-actions'>
                <button type="button" className="btn btn-dark" onClick={()=>navigate(-1)}>Back</button>
            </div>
        </Container>
    )
}

export default PartEditPage;