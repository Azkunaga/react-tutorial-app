import {React, useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {Container, Row, Col, OverlayTrigger, Tooltip, Spinner} from 'react-bootstrap'
import './style.css'
import {authAxios} from '../../../../api/axios'
import ExerciseComponent from '../../../../components/exerciseComponent'
import SpinnerComponent from '../../../../components/spinnerComponent'
import AlertComponent from '../../../../components/alert'

const CreateQuestionPage = () => {

    const navigate = useNavigate();

    let [level,setLevel] = useState("easy");
    let [type,setType] = useState("code");
    let [pAnswer,setPAnswer] = useState("");
    let [valid,setValid] = useState("true");

    let [types, setTypes] = useState([]);
    let [levels, setLevels] = useState([]);

    let [isTeacher, setIsTeacher] = useState(true);

    const [parts,setParts] = useState();
    const [part, setPart] = useState();
    const [isManual,setManual] = useState(false);
    const [isGPT,setIsGPT] = useState(false);
    const [gptData, setGptData] = useState();
    const [gptResponse,setGptResponse] = useState(false);

    let [alertShow, setAlertShow] = useState(false);
    let [alert, setAlert] = useState("");

    const {partId} = useParams();

    const role = JSON.parse(localStorage.getItem('userData'))?.role || null;

    const getLevels = async () => {
        try {
            const response = await authAxios.post("/api/tutorial/exLevel/all",
                JSON.stringify({"role":role}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setLevels(response?.data?.levels);

        } catch (err) {
            if (!err?.response) {
                console.log("no response");
            }else{
                console.log("error")
            }
        }

    }

    const getTypes = async () => {
        try {
            const role = localStorage.getItem('userData')?.role || null;
            const response = await authAxios.post("/api/tutorial/exType/all",
                JSON.stringify({"role":role}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setTypes(response?.data?.types);

        } catch (err) {
            if (!err?.response) {
                console.log("no response");
            }else{
                console.log("error")
            }
        }

    }

    const createQuestion = async () =>{
        try {
            const role = JSON.parse(localStorage.getItem('userData'))?.role || null;            
            const exercise = JSON.parse(localStorage.getItem('exerciseJSON')); 
            const id = partId || part; 
            console.log("partID:",id)
            const response = await authAxios.post("/api/tutorial/question/",
            JSON.stringify({"question":exercise, level, type, pAnswer, valid, partId:id ,role}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );

            if(response.status===200){
                localStorage.removeItem('exerciseJSON');
                navigate(-1);
            }
           
        }catch(err){
            if (!err?.response.data.message) {
                setAlert("Something went wrong");
                setAlertShow(true);
            }else{
                setAlert(err?.response.data.message);
                setAlertShow(true);
            }
        }
    }

    const getParts = async () =>{
        try {         
            const response = await authAxios.post("/api/tutorial/parts",
            JSON.stringify(),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );

            if(response.status===200){
                setParts(response?.data?.parts);
                setPart(response?.data?.parts[0]?._id);
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

    const newExercise = async () => {
        try {         
            const id = partId || part; 
            const response = await authAxios.post("/api/chatgpt/create2",
            JSON.stringify({level, type, partId:id ,role}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );

            console.log(response);
            if(response.status===200){
                setGptData(response?.data?.question?.ex);
                setPAnswer(response?.data?.question?.pA)
                setGptResponse(true);
            }
           
        }catch(err){
            if (!err?.response.data.message) {
                setAlert("Something went wrong");
                setAlertShow(true);
            }else{
                setAlert(err?.response.data.message);
                setAlertShow(true);
            }
        }
    }

    const refresh = () => {
        setIsGPT(false);
        setManual(false);
        setGptData();
        setGptResponse();
    }

    useEffect(() => {
        getLevels();
        getTypes();
     },[]);
 
     useEffect(()=> {
        if(role==="teacher"){
            setIsTeacher(true);
            getParts();
        }else{
            setIsTeacher(false);
        }

     },[role])

    return (
        <Container>
           <h2>Create Question</h2>
           <AlertComponent show={alertShow} variant={"danger"} text={alert} action={setAlertShow}></AlertComponent>
            <div className='edit'>
                <Row>
                    {isTeacher &&
                     <Col>
                        <div className='input-container'>
                            <label htmlFor='level'>Tutorial Part: </label>
                            <select
                            id="level"
                            value={part}
                            required
                            onChange={(e) => {setPart(e.target.value);}}
                            >
                                {parts?.map((el)=>
                                    <option key={el._id} value={el._id}>{el.name}</option>
                                )}
                            </select>
                        </div>
                     </Col>
                    }
                    <Col>
                    <div className='input-container'>
                        <label htmlFor='level'>Level: </label>
                        <select
                        id="level"
                        value={level}
                        required
                        onChange={(e) => setLevel(e.target.value)}
                        >
                            {levels?.map((el)=>
                                <option key={el._id} value={el.name}>{el.name.charAt(0).toUpperCase() + el.name.slice(1)}</option>
                            )}
                        </select>
                    </div>
                    </Col>
                    <Col>
                    <div className='input-container'>
                        <label htmlFor='type'>Type: </label>
                        <div>
                            <select
                            id="type"
                            value={type}
                            required
                            onChange={(e) => setType(e.target.value)}
                            >
                                {types?.map((el)=>
                                    <option key={el._id} value={el.name}>{el.name.charAt(0).toUpperCase() + el.name.slice(1)}</option>
                                )}
                            </select>
                            <div className='typeInfo'>
                            <OverlayTrigger
                            placement="bottom"
                            overlay={
                                <Tooltip>
                                    {types.find((a)=> a.name === type)?.description}
                                </Tooltip>
                            }
                            >
                                <i className="fa-solid fa-circle-info"></i>
                            </OverlayTrigger>
                            </div>
                        </div>
                    </div>
                    
                    </Col>
                    <Col>
                    <div className='input-container'>
                        <label htmlFor='Valid'>Valid: </label>
                        <select
                        id="valid"
                        value={valid}
                        required
                        onChange={(e) => setValid(e.target.value)}
                        >
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                    </Col>
                    
                </Row>
                { (isManual ||  (isGPT && gptResponse)) ? <>
                <ExerciseComponent type={type} data={gptData}></ExerciseComponent>
                <Row>
                    <Col>
                        <div className='input-container'>
                            <label htmlFor='pA'>Correct answer: </label>
                            <textarea type="text" 
                                placeholder=" "
                                id="pA"
                                value={pAnswer}
                                required
                                onChange={(e) => setPAnswer(e.target.value)}
                            />
                        </div>
                        </Col>
                </Row>
                <div className='edit-actions'>  
                    <button type="button" className="btn btn-dark" onClick={createQuestion}>Create question</button> 
                    <button type="button" className="btn btn-dark" onClick={()=>{refresh()}}>Back</button> 
                </div>
                </>
                
                : (isGPT && !gptResponse) ?
                    <div className='feedback'>
                        <SpinnerComponent color="warning"></SpinnerComponent>
                        <div className='edit-actions'>  
                            <button type="button" className="btn btn-dark" onClick={()=>{refresh()}}>Back</button> 
                        </div>
                    </div>
                    
                :
                    <>
                    <h4>Decide how to make the exercise</h4>
                    <div className='text-center'>
                        <div className="gs_button" id="gs_button">
                            <div className="slide"></div>
                            <a className="gs_a" onClick={()=>setManual(true)}>Manual</a>
                        </div>

                        <div className="gs_button" id="gs_button">
                            <div className="slide"></div>
                            <a className="gs_a" onClick={()=>{setIsGPT(true); newExercise();}}>Chatgpt</a>
                        </div>
                    </div>
                    <div className='edit-actions'>  
                        <button type="button" className="btn btn-dark" onClick={()=>navigate(-1)}>Back</button> 
                    </div>
                    </>
                    
                }
           </div>

        </Container>
    )
}

export default CreateQuestionPage;