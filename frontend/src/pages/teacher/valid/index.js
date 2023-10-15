import React, {useState, useEffect} from 'react'
import { Container } from 'react-bootstrap';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { normalAxios } from '../../../api/axios';
import { useNavigate } from 'react-router-dom';

const TeacherValidPage = () => {

    const navigate = useNavigate();

    let [data, setData] = useState([]);

    const getData = async () => {
        try {
            const role = localStorage.getItem('userData')?.role;
            const response = await normalAxios.post('/api/tutorial/question/teacher/valid',
                JSON.stringify({role}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data?.list)
            setData(response?.data?.list);

        } catch (err) {
            if (!err?.response) {
                console.log("not response")
                data = null
            }else{
               
            }
        }
    }

    useEffect(() => {
        getData();
      }, []);

    return (
        <Container>
            <h3>Question list</h3>
            <MDBTable align='middle' className='topicTable' responsive bordered >
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Votes</th>
                        <th scope='col'>Note</th>
                        <th scope='col'>Topic</th>
                        <th scope='col'>Part</th>
                        <th scope='col'>Question</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {data?.map((el)=>
                        <tr>
                            <th scope='row' >{el.stats.valorations}</th>
                            <td>{el.stats.avg}</td>
                            <td>{el.question.tutorialPart.topic.name}</td>
                            <td>{el.question.tutorialPart.name}</td>
                            <td>{el.question.question}</td>
                            <td className='actions'>
                                <a href={'/teacher/valid/'+el.question._id}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </a>
                            </td>
                        </tr>
                    )}
                </MDBTableBody>
            </MDBTable> 
            <div className='edit-actions'>
                <button type="button" className="btn btn-dark" onClick={()=>navigate(-1)}>Back</button>
            </div>
        </Container>
    )
}

export default TeacherValidPage;