import {React, useEffect, useState, useRef} from 'react'
import {useParams, useLocation, useNavigate, createMemoryRouter} from 'react-router-dom'
import {Container, Row, Col, OverlayTrigger, Tooltip} from 'react-bootstrap'
import './style.css'
import {normalAxios} from '../../../../api/axios'
import ExerciseComponent from '../../../../components/exerciseComponent'

const CreateQuestionPage = () => {

    const navigate = useNavigate();

    let [level,setLevel] = useState("easy");
    let [type,setType] = useState("code");
    let [pAnswer,setPAnswer] = useState("");
    let [valid,setValid] = useState("true");

    let [types, setTypes] = useState([]);
    let [levels, setLevels] = useState([]);

    let [isTeacher, setIsTeacher] = useState();
    let [isValidate, setIsValidate] = useState();

    const {partId} = useParams();

    const role = JSON.parse(localStorage.getItem('userData'))?.role || null;

    const [create,setCreate] = useState(<></>)
  
    useEffect(() => {
       getLevels();
       getTypes();    
    },[]);

    const getLevels = async () => {
        try {
            const response = await normalAxios.post("/api/tutorial/exLevel/all",
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
            const response = await normalAxios.post("/api/tutorial/exType/all",
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
            const response = await normalAxios.post("/api/tutorial/question/",
            JSON.stringify({"question":exercise, level, type, pAnswer, valid, partId ,role}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );

            navigate(-1);
           
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
           <h2>Create Question</h2>
            <div className='edit'>
                <Row>
                    <Col>
                    <div className='input-container'>
                        <label htmlFor='level'>Level: </label>
                        <select
                        id="level"
                        value={level}
                        required
                        disabled = {isTeacher}
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
                            disabled = {isTeacher}
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
                        disabled = {isTeacher && !isValidate}
                        onChange={(e) => setValid(e.target.value)}
                        >
                            <option value="true">True</option>
                            <option value="false">False</option>
                        </select>
                    </div>
                    </Col>
                    
                </Row>
                <ExerciseComponent type={type}></ExerciseComponent>
                <Row>
                    <Col>
                        <div className='input-container'>
                            <label htmlFor='pA'>Correct answer: </label>
                            <textarea type="text" 
                                placeholder=" "
                                id="pA"
                                value={pAnswer}
                                required
                                disabled = {isValidate}
                                onChange={(e) => setPAnswer(e.target.value)}
                            />
                        </div>
                        </Col>
                </Row>

                <div className='edit-actions'>  
                    <button type="button" className="btn btn-dark" onClick={createQuestion}>Create question</button>
                    <button type="button" className="btn btn-dark" onClick={()=>navigate(-1)}>Back</button> 
                </div>
           </div>

        </Container>
    )
}

export default CreateQuestionPage;