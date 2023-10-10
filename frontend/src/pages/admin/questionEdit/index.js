import {React, useEffect, useState} from 'react'
import {useParams, useLocation, useNavigate} from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap'
import './style.css'
import {normalAxios} from '../../../api/axios'

const QuestionEditPage = () => {

    const navigate = useNavigate();

    const location = useLocation();

    let [data, setData] = useState("");

    let [question,setQuestion] = useState("");
    let [level,setLevel] = useState("");
    let [type,setType] = useState("");
    let [pAnswer,setPAnswer] = useState("");
    let [valid,setValid] = useState("");

    let [types, setTypes] = useState([]);
    let [levels, setLevels] = useState([]);

    let [isTeacher, setIsTeacher] = useState();
    let [isValidate, setIsValidate] = useState();

    const { questionId } = useParams();

    const role = JSON.parse(localStorage.getItem('userData'))?.role || null;
  
    useEffect(() => {
        if(questionId){
            getData();
        }else{
            setData(null);
        }
        
    }, [questionId]);

    useEffect(()=>{
        if(role=="teacher"){
            setIsTeacher(true);
        }else{
            setIsTeacher(false);
        }

        if(location.pathname.includes('valid')){
            setIsValidate(true);
        }else{
            setIsValidate(false);
        }

    },[])

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

    const getData = async () => {
        try {
            const role = localStorage.getItem('userData')?.role || null;
            const response = await normalAxios.post("/api/tutorial/question/" + questionId,
                JSON.stringify({"role":role}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            if(response?.data?.quest){
                setData(response?.data?.quest);
                setQuestion(response?.data?.quest?.question);
                setPAnswer(response?.data?.quest?.correctAnswer);
                setType(response?.data?.quest?.type.name);
                setLevel(response?.data?.quest?.difficulty.name);
                setValid(response?.data?.quest?.valid);
                getLevels();
                getTypes();
            }


        } catch (err) {
            if (!err?.response) {
                console.log("no response");
            }else{
                console.log("error")
            }
        }
    }

    const saveQuestion = async () =>{
        try {
            const role = localStorage.getItem('userData')?.role || null;
            const response = await normalAxios.post("/api/tutorial/question/edit/"+questionId,
            JSON.stringify({"question":question, "level":level, "type":type, "pAnswer":pAnswer, "valid":valid,  "role": role}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
           
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
           <h2>{isValidate ? "Valid Question" : isTeacher? "Edit Question Possible Answer" : "Edit Question"}</h2>
           { questionId && data ?
            <div className='edit'>
            <form onSubmit={saveQuestion}>
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
                                    <option value={el.name}>{el.name.charAt(0).toUpperCase() + el.name.slice(1)}</option>
                                )}
                            </select>
                        </div>
                        </Col>
                        <Col>
                        <div className='input-container'>
                            <label htmlFor='type'>Type: </label>
                            <select
                            id="type"
                            value={type}
                            required
                            disabled = {isTeacher}
                            onChange={(e) => setType(e.target.value)}
                            >
                                {types?.map((el)=>
                                    <option value={el.name}>{el.name.charAt(0).toUpperCase() + el.name.slice(1)}</option>
                                )}
                            </select>
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
                    <Row>
                    <Col>
                        <div className='input-container'>
                            <label htmlFor='quest'>Question: </label>
                            <textarea type="text" 
                            placeholder=" "
                            id="quest"
                            autoComplete="off"
                            value={question}
                            required
                            disabled = {isTeacher}
                            onChange={(e) => {setQuestion(e.target.value);} 
                            }
                            />
                        </div>
                        </Col>
                    </Row>
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
                        <button type="button" className="btn btn-dark" onClick={saveQuestion}>Save</button>
                        <button type="button" className="btn btn-dark" onClick={()=>navigate(-1)}>Back</button> 
                    </div>

            </form>
           </div>
            : <p>Question not found</p>}

        </Container>
    )
}

export default QuestionEditPage;