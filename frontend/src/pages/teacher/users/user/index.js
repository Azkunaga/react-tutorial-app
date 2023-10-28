import React, { useEffect, useState } from 'react'
import { Button, Container } from 'react-bootstrap';
import {normalAxios, authAxios} from '../../../../api/axios'
import {useNavigate, useParams} from 'react-router-dom'
import {MDBTable, MDBTableHead, MDBTableBody} from  'mdb-react-ui-kit'
import DetailModal from '../../../../components/detailModal';
import './style.css'

const UserMonitoringPage = () => {

    const user = JSON.parse(localStorage.getItem('userData'));

    const {userId} = useParams();

    const [moves,setMoves] = useState([]);

    const[show,setShow] = useState('');

    const getUsersMoves = async () =>{
        try {
            const response = await authAxios.post('/api/users/user/moves',
                JSON.stringify({username:user?.username, userId}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(response?.data?.moves)
            setMoves(response?.data?.moves);

        } catch (err) {
            if (!err?.response) {
                console.log("not response")
            }else{
            }
        }
    }

    useEffect(()=>{
        if(userId){
            getUsersMoves();
        }
    },[userId])

    const navigate = useNavigate();

    return (
        <Container>
            <h3>User movements</h3>
            
            <div className='moves'>
            <MDBTable align='middle' responsive>
            <MDBTableHead>
                <tr>
                    <th scope='col'>Date</th>
                    <th scope='col'>Part</th>
                    <th scope='col'>Move</th>
                    <th scope='col'>Details</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {moves?.map((el,index)=>
                    <tr key={index}>
                        <td>{new Date(el.date).toLocaleString()}</td>
                        <td>
                            {el.part}
                        </td>
                        <td>
                            <p className='fw-normal mb-1'>{el.move}</p>
                        </td>
                        <td className='fw-normal mb-1 actions info'>
                            <DetailModal text={el.text} show={el.id===show} onHide={() => {setShow('');}}></DetailModal>
                            <i className="fa-solid fa-info" onClick={()=>setShow(el.id)}></i>
                        </td>
                    </tr>
                )}
            </MDBTableBody>
            </MDBTable>

            </div>

            <div className='button-right'>
                <Button variant='dark' onClick={()=>navigate(-1)}>Back</Button>
            </div>
        </Container>
    )
}

export default UserMonitoringPage;