import {React, useEffect, useState, useRef} from 'react'
import {useParams} from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap'
import './style.css'
import {normalAxios} from '../../../api/axios'
import BackButton from '../../../components/backButton';

const QuestionEditPage = () => {

    let [data, setData] = useState("");

    let [question,setQuestion] = useState("");
    let [level,setLevel] = useState("");
    let [type,setType] = useState("");
    let [pAnswer,setPAnswer] = useState("");
    let [valid,setValid] = useState("");

    let [types, setTypes] = useState([]);
    let [levels, setLevels] = useState([]);

    const { questionId } = useParams();
  
    useEffect(() => {
        getData();
        getLevels();
        getTypes();
    }, [questionId]);

    const getLevels = async () => {
        try {
            const role = localStorage.getItem('userData')?.role || null;
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
            setData(response?.data?.quest);
            setQuestion(response?.data?.quest.question);
            setPAnswer(response?.data?.quest.correctAnswer);
            setValid(response?.data?.quest.valid)

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
            JSON.stringify({"question":question, "level":level, "type":type, "pAnswer":pAnswer, "role": role}),
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
           <h2>Edit Question</h2>
           { data &&
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
                            onChange={(e) => setType(e.target.value)}
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
                                    onChange={(e) => setPAnswer(e.target.value)}
                                />
                            </div>
                            </Col>
                    </Row>

                    <div className='edit-actions'>  
                        <button type="button" className="btn btn-dark" onClick={saveQuestion}>Save</button> 
                    </div>

            </form>
           </div>
            }
            <BackButton></BackButton>
        </Container>
    )
}

export default QuestionEditPage;