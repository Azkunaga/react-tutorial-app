import React, { useEffect, useState, useCallback } from 'react'
import {normalAxios} from '../api/axios'
import {useNavigate} from 'react-router-dom'
import * as Survey from "survey-react";
import "survey-core/defaultV2.min.css";
import {Converter} from 'showdown'
import { Col } from 'react-bootstrap';

const StartEx = () => {

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
            "startWithNewLine": false,
            "title": "React Level",
            "description": "Select your actual level of JavaScript and React so we can collect and offer the best personalized exercises",
            "hideNumber": true,
            "valueName": "answer",
            "isRequired": true,
            "autoGenerate": false,
            "rateValues": [
             {
              "value": "ver low",
              "text": "Very Low"
             },
             {
              "value": "low",
              "text": "Low"
             },
             {
              "value": "medium",
              "text": "Medium"
             },
             {
              "value": "high",
              "text": "High"
             },
             {
              "value": "really high",
              "text": "Really High"
             }
            ]
           }
          ]
         }
        ],
        "widthMode": "responsive",
        "showQuestionNumbers": false,
       }

    const saveInitialLevel = async (answer) => {
        try {
            const role = localStorage.getItem('userData')?.role || null;
            await normalAxios.post("/api/users/start",
            JSON.stringify({username:user?.username,initialLevel:answer,role}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            ).then(response => {
                console.log(response);
                navigate("/student/tutorial/"+response.data.first);
            })

        }catch(err){
            if (!err?.response) {
                console.log(err);
            }else{
                console.log(err);
            }
        }
            
       
    }

    // survey.applyTheme(themeJSON)
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
        saveInitialLevel(sender.data.answer)
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

export default StartEx;