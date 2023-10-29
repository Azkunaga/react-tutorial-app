import React, {useState, useEffect} from 'react'
import { Container } from 'react-bootstrap';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import { normalAxios, authAxios } from '../../../api/axios';
import { useNavigate } from 'react-router-dom';
import NewRow from '../../../components/newRow';


const TeacherQuestionsPage = () => {

    const navigate = useNavigate();

    let [data, setData] = useState([]);

    const getData = async () => {
        try {
            const role = localStorage.getItem('userData')?.role;
            const response = await authAxios.post('/api/tutorial/question/teacher',
                JSON.stringify({role, "valid":true}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response)
            setData(response?.data?.questList);

        } catch (err) {
            if (!err?.response) {
                console.log("not response")
                data = null
            }else{
               
            }
        }
    }

    useEffect(() => {
        if(data.length===0){
            getData();
        }
      }, []);

    return (
        <Container>
            <h3>Question list</h3>
            <NewRow redirect="questions/new"></NewRow>
            <MDBTable align='middle' className='topicTable' responsive bordered >
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Type</th>
                        <th scope='col'>Level</th>
                        <th scope='col'>Topic</th>
                        <th scope='col'>Part</th>
                        <th scope='col'>Question</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {data?.map((el)=>
                        <tr key={el._id}>
                            <th scope='row' >{el.type?.name}</th>
                            <td>{el.difficulty?.name}</td>
                            <td>{el.tutorialPart?.topic?.name}</td>
                            <td>{el.tutorialPart?.name}</td>
                            <td>{el.question?.name}</td>
                            <td className='actions'>
                                <a href={'/teacher/questions/'+el._id}>
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

export default TeacherQuestionsPage;