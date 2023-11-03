import {React, useEffect, useState} from 'react'
import {Container} from 'react-bootstrap'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './style.css'
import {normalAxios, authAxios} from '../../../api/axios'
import NewRow from '../../../components/newRow';
import { useLocation, useNavigate } from 'react-router-dom';
import AlertComponent from '../../../components/alert';

const TutorialPage = () => {

    const navigate = useNavigate();
    
    let [data, setData] = useState([]);
    let [newRow, setNewRow] = useState();

    useEffect(() => {
        setNewRow(data[data.length-1]?.order+1)
    }, [data]);

    const getData = async () => {
        try {
            const role = localStorage.getItem('userData')?.role;
            const response = await authAxios.post('/api/tutorial/topic/all',
                JSON.stringify({role}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            
            setData(await response?.data?.topics);
            

        } catch (err) {
            if (!err?.response) {
                console.log("not response")
                data = null
            }else{
               
            }
        }
    }

    const deleteTopic = async (id)=>{
        try {
            const response = await authAxios.delete("/api/tutorial/topic/"+id,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            console.log(response)
            if(response.status===200){
                getData();
            }
            
        }catch(err){
            if (!err?.response) {
                console.log("not response")
                console.log(err);
            }else{
                console.log(err);
            }
        }
    }


    useEffect(() => {
        getData();
      }, []);

    return (
        <Container>
           <h3>Tutorial Topics</h3>
            <NewRow redirect={'tutorial/topic/new/'+ newRow }></NewRow>
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
                        <tr key={el._id}>
                            <th scope='row'>{el.order}</th>
                            <td>{el.name}</td>
                            <td className='actions'>
                                <a href={'/admin/tutorial/topic/'+el._id}><i className="fa-solid fa-pen-to-square"></i></a>
                                <button onClick={() => deleteTopic(el._id)}><i className="fa-solid fa-trash"></i></button>
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

export default TutorialPage;