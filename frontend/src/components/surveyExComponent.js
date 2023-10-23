import React, { useEffect, useCallback } from "react";
import * as Survey from "survey-react";
import 'survey-core/defaultV2.min.css';
import {Converter} from 'showdown'

function SurveyExComponent(props) {

  const json = {
    "logoPosition": "right",
    "pages": [
     {
      "name": "page1",
      "elements": [
        props.exercise
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
      console.log("complete");
      props.action(sender.data.answer);
    }, []);
  
    survey.onComplete.add(surveyComplete);
  
    return (<Survey.Survey model={survey} />);
}

export default SurveyExComponent;