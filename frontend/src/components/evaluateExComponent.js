import React, { useCallback } from 'react'
import {useNavigate} from 'react-router-dom'
import * as Survey from "survey-react";
// import { Model } from "survey-core";
// import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import {Converter} from 'showdown'
import { Col } from 'react-bootstrap';

const EvaluateExComponent = (props) => {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem('userData'));

    const json = {
        "pages": [
         {
          "name": "page1",
          "elements": [
            {
                "type": "rating",
                "name": "question1",
                "useDisplayValuesInDynamicTexts": false,
                "title": "Evaluate from 1-5 the previous exercise",
                "description": "Topic accuaracy, exercise level, feedback, etc.",
                "valueName": "answer",
                "isRequired": true,
                "minRateDescription": "Very bad",
                "maxRateDescription": "Really good"
               },
               {
                "type": "comment",
                "name": "question2",
                "title": "Any comments (optional)",
                "valueName": "comment"
               }
          ]
         }
        ],
        "widthMode": "responsive",
        "showQuestionNumbers": false,
    }

    const survey = new Survey.Model(json);

    const converter = new Converter();
    survey.onTextMarkdown.add(function (survey, options) {
        // Convert Markdown to HTML
        let str = converter.makeHtml(options.text);
        // Remove root paragraphs <p></p>
        str = str.substring(3);
        str = str.substring(0, str.length - 4);
        // Set HTML markup to render
        options.html = str;
    });

    const surveyComplete = useCallback((sender) => {
        console.log(sender.data);
        props.action( sender.data.answer, sender.data.comment);
      }, []);
    
    survey.onComplete.add(surveyComplete);
 
    return (
        <Col>
            <div className='tutorial-div'>
                <div className='tutorial-exercise-center'>
                    <Survey.Survey model={survey} />
                </div>
            </div>
        </Col>
    );
}

export default EvaluateExComponent;