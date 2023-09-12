import {React, useEffect, useState} from 'react'
import {Container} from 'react-bootstrap'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './style.css'
import {normalAxios} from '../../../api/axios'

const TutorialPage = () => {

    let [data, setData] = useState([]);

    const getData = async () => {
        try {
            const role = localStorage.getItem('userData')?.role;
            const response = await normalAxios.post('/api/tutorial/topic/all',
                JSON.stringify({role}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            setData(response?.data?.topics);

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
           <h3>Tutorial Topics</h3>
            <MDBTable align='middle' className='topicTable' responsive bordered >
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Order</th>
                        <th scope='col'>Topic Name</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {data?.map((el)=>
                        <tr>
                            <th scope='row'>{el.order}</th>
                            <td>{el.name}</td>
                            <td className='actions'><a href={'/admin/tutorial/topic/'+el._id}><i class="fa-solid fa-pen-to-square"></i></a></td>
                        </tr>
                    )}
                </MDBTableBody>
            </MDBTable>
        </Container>
    )
}

export default TutorialPage;