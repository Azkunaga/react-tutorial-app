import React, { useEffect } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
// import * as Survey from "survey-react";
import 'survey-core/defaultV2.min.css';
import {Converter} from 'showdown'

function SurveyComponent(props) {

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
    "mode": "display",
    "widthMode": "responsive",
    "showQuestionNumbers": false,
   }

//    const themeJSON = {
//     "cssVariables": {
//         "--sjs-general-backcolor": "rgba(255, 255, 255, 0.1)",
//         "--sjs-general-backcolor-dark": "rgba(52, 52, 52, 1)",
//         "--sjs-general-backcolor-dim": "#FFFFFF",
//         "--sjs-general-backcolor-dim-light": "rgba(76, 57, 140, 0.25)",
//         "--sjs-general-backcolor-dim-dark": "rgba(46, 46, 46, 1)",
//         "--sjs-general-forecolor": "rgba(255, 255, 255, 0.78)",
//         "--sjs-general-forecolor-light": "rgba(255, 255, 255, 0.42)",
//         "--sjs-general-dim-forecolor": "rgba(255, 255, 255, 0.79)",
//         "--sjs-general-dim-forecolor-light": "rgba(255, 255, 255, 0.45)",
//         "--sjs-primary-backcolor": "rgba(80, 61, 153, 1)",
//         "--sjs-primary-backcolor-light": "rgba(80, 61, 153, 0.1)",
//         "--sjs-primary-backcolor-dark": "rgba(96, 92, 177, 1)",
//         "--sjs-primary-forecolor": "rgba(255, 255, 255, 1)",
//         "--sjs-primary-forecolor-light": "rgba(255, 255, 255, 0.25)",
//         "--sjs-base-unit": "8px",
//         "--sjs-corner-radius": "4px",
//         "--sjs-secondary-backcolor": "rgba(255, 152, 20, 1)",
//         "--sjs-secondary-backcolor-light": "rgba(255, 152, 20, 0.1)",
//         "--sjs-secondary-backcolor-semi-light": "rgba(255, 152, 20, 0.25)",
//         "--sjs-secondary-forecolor": "rgba(48, 48, 48, 1)",
//         "--sjs-secondary-forecolor-light": "rgba(48, 48, 48, 0.25)",
//         "--sjs-shadow-small": "0px 0px 0px 1px rgba(255, 255, 255, 0.25)",
//         "--sjs-shadow-medium": "0px 2px 6px 0px rgba(0, 0, 0, 0.2)",
//         "--sjs-shadow-large": "0px 8px 16px 0px rgba(0, 0, 0, 0.2)",
//         "--sjs-shadow-inner": "0px 0px 0px 1px rgba(255, 255, 255, 0.15)",
//         "--sjs-border-light": "rgba(255, 255, 255, 0.08)",
//         "--sjs-border-default": "rgba(255, 255, 255, 0.12)",
//         "--sjs-border-inside": "rgba(255, 255, 255, 0.08)",
//         "--sjs-special-red": "rgba(254, 76, 108, 1)",
//         "--sjs-special-red-light": "rgba(254, 76, 108, 0.1)",
//         "--sjs-special-red-forecolor": "rgba(48, 48, 48, 1)",
//         "--sjs-special-green": "rgba(36, 197, 164, 1)",
//         "--sjs-special-green-light": "rgba(36, 197, 164, 0.1)",
//         "--sjs-special-green-forecolor": "rgba(48, 48, 48, 1)",
//         "--sjs-special-blue": "rgba(91, 151, 242, 1)",
//         "--sjs-special-blue-light": "rgba(91, 151, 242, 0.1)",
//         "--sjs-special-blue-forecolor": "rgba(48, 48, 48, 1)",
//         "--sjs-special-yellow": "rgba(255, 152, 20, 1)",
//         "--sjs-special-yellow-light": "rgba(255, 152, 20, 0.1)",
//         "--sjs-special-yellow-forecolor": "rgba(48, 48, 48, 1)",
//         "--sjs-question-background": "rgba(255, 255, 255, 1)",
//         "--sjs-questionpanel-backcolor": "rgba(255, 255, 255, 0.1)",
//         "--sjs-questionpanel-hovercolor": "rgba(255, 255, 255, 0.1)",
//         "--sjs-questionpanel-cornerRadius": "8px",
//         "--sjs-editor-background": "rgba(76, 57, 140, 1)",
//         "--sjs-editorpanel-backcolor": "rgba(76, 57, 140, 0.25)",
//         "--sjs-editorpanel-hovercolor": "rgba(76, 57, 140, 0.35)",
//         "--sjs-editorpanel-cornerRadius": "6px",
//         "--sjs-font-pagetitle-color": "rgba(255, 255, 255, 1)",
//         "--sjs-font-pagetitle-size": "32px",
//         "--sjs-font-questiontitle-color": "rgba(255, 255, 255, 1)",
//         "--sjs-font-questiondescription-color": "rgba(255, 255, 255, 0.5)",
//         "--sjs-font-editorfont-color": "rgba(255, 255, 255, 1)",
//         "--sjs-font-size": "16px",
//         "--font-size": 100
//     },
//     "themeName": "default",
//     "themePalette": "dark",
//     "backgroundImageFit": "cover",
//     "backgroundImageAttachment": "fixed",
//     "isCompact": false,
//     "backgroundOpacity": 1
// };

    useEffect(()=>{
      localStorage.setItem('exerciseJSON',JSON.stringify(props.exercise));
    },[json]);

    // const survey = new Survey.Model(json);
    // survey.applyTheme(themeJSON)
    const survey = new Model(json);

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
  
    return (<Survey model={survey} />);
}

export default SurveyComponent;