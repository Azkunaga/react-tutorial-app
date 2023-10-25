import React, { useState, useEffect } from "react";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import SurveyComponent from "./surveyComponent";
import markdownDescription from "../utils/markdownDescription"

const ExerciseComponent = (props) => {

    let [question,setQuestion] = useState("");
    let [description,setDescription] = useState("");
    let [option1,setOption1] = useState("");
    let [option2,setOption2] = useState("");
    let [option3,setOption3] = useState("");
    let [option4,setOption4] = useState("");

    let [exercise,setExercise] = useState([]);

    let [withOption, setWithOptions] = useState(false);

    let code = {
        "type": "comment",
        "name": question,
        "name": question || "Example Title",
        "description": description || "Example Description",
        "valueName": "answer",
        "isRequired": true,
    }

    let test = {
        "type": "radiogroup",
        "name": question,
        "title": question || "Example title",
        "description": description || "Example description",
        "valueName": "answer",
        "isRequired": true,
        "choices": [
         option1 || "Option 1",
         option2 || "Option 2",
         option3 || "Option 3",
         option4 || "Option 4"
        ]
    }

    let test1 = {
        "type": "checkbox",
        "name": question,
        "title": question || "Example title",
        "description": description || "Example description",
        "valueName": "answer",
        "isRequired": true,
        "choices": [
         option1 || "Option 1",
         option2 || "Option 2",
         option3 || "Option 3",
         option4 || "Option 4"
        ]
    }

    let trueFalse = {
        "type": "boolean",
        "name": question,
        "name": question || "Example Title",
        "description": description || "Example Description",
        "valueName": "answer",
        "isRequired": true,
        "labelTrue": "True",
        "labelFalse": "False",
    }

    let fill1 = {
        "type": "ranking",
        "name": question,
        "name": question || "Example Title",
        "description": description || "Example Description",
        "valueName": "answer",
        "isRequired": true,
        "choices": [
            option1 || "Option 1",
            option2 || "Option 2",
            option3 || "Option 3",
            option4 || "Option 4"
           ]
       }

    let fill2 = {
        "type": "tagbox",
        "name": question ,
        "title": question || "Example Title",
        "description": description || "Example Description",
        "valueName": "answer",
        "isRequired": true,
        "choices": [
            option1 || "Option 1",
            option2 || "Option 2",
            option3 || "Option 3",
            option4 || "Option 4"
           ]
       }

    useEffect(()=>{
        setQuestion(props.data?.name);
        setDescription(props.data?.description);
        if(props.data?.choices){
            setOption1(props.data?.choices[0]);
            setOption2(props.data?.choices[1]);
            setOption3(props.data?.choices[2]);
            setOption4(props.data?.choices[3]);
        }
        
    },[props.data])

    useEffect(()=>{
        if(props.type === "code"){
            setExercise(code);
            setWithOptions(false);
        }

        if(props.type === "test1"){
            setExercise(trueFalse);
            setWithOptions(false);
        }
        
        if(props.type === "test2"){
            setExercise(test);
            setWithOptions(true);
        }

        if(props.type === "test3"){
            setExercise(test1);
            setWithOptions(true);
        }
        
        if(props.type === "fillGaps1"){
            setExercise(fill1);
            setWithOptions(true);
        }
        
        if(props.type === "fillGaps2"){
            setExercise(fill2);
            setWithOptions(true);
        }

    }, [props.type, question, description, option1, option2, option3, option4] );

    return (  
       <>
        <Row>
            <Col>
                <div className='input-container'>
                    <label htmlFor='quest'>Title: </label>
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
            <Col>
                <div className='input-container'>
                    <label htmlFor='descr'>Description:  <OverlayTrigger
                        placement="bottom"
                        overlay={
                            <Tooltip>
                               {markdownDescription}
                            </Tooltip>
                        }
                        >
                            <i className="fa-solid fa-circle-info"></i>
                    </OverlayTrigger></label>
                   
                    <textarea type="text" 
                        placeholder=" "
                        id="descr"
                        autoComplete="off"
                        value={description}
                        required
                        onChange={(e) => {setDescription(e.target.value);} 
                    }
                    />
                </div>
            </Col>
        </Row>
        { withOption && <>
        <Row>
            <Col>
                <div className='input-container'>      
                    <input type="text" 
                    placeholder="Option 1"
                    id="opt1"
                    autoComplete="off"
                    value={option1}
                    required
                    onChange={(e) => {setOption1(e.target.value);} 
                    }
                    />
                </div>
            </Col>
            <Col>
                <div className='input-container'>                      
                    <input type="text" 
                    placeholder="Option 3"
                    id="opt1"
                    autoComplete="off"
                    value={option3}
                    required
                    onChange={(e) => {setOption3(e.target.value);} 
                    }
                    />
                </div>
            </Col>
        </Row>
        <Row>
            <Col>
                <div className='input-container'>               
                    <input type="text" 
                    placeholder="Option 2"
                    id="opt1"
                    autoComplete="off"
                    value={option2}
                    required
                    onChange={(e) => {setOption2(e.target.value);} 
                    }
                    />
                </div>
            </Col>
            <Col>
                <div className='input-container'>               
                    <input type="text" 
                    placeholder="Option 4"
                    id="opt1"
                    autoComplete="off"
                    value={option4}
                    required
                    onChange={(e) => {setOption4(e.target.value);} 
                    }
                    />
                </div>
            </Col>
        </Row> </>}
        <Row>
            <Col>
                <div className='input-container'>
                    Preview:
                    <SurveyComponent exercise={exercise}></SurveyComponent>
                </div>
            </Col>
        </Row>
       </>
       
    );
}
 
export default ExerciseComponent;