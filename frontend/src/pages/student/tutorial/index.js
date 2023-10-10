import React from 'react'
import {Row,Col} from 'react-bootstrap';
import TutorialMenu from '../../../components/tutorialMenu';
import TutorialPart from '../../../components/tutorialPart';
import './style.css'
import { useParams } from 'react-router-dom';

const StudentPage = () => {

    const {id} = useParams();

    console.log(id)

    return (
        <div className='tutorial'>
                <Row>
                    <TutorialMenu></TutorialMenu>
                    <TutorialPart partId={id}></TutorialPart>
                </Row>
        </div>
    )
}

export default StudentPage;