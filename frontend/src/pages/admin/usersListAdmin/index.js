import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { normalAxios, SERVER_URL, authAxios } from '../../../api/axios';
import { MDBBadge, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import profile from '../../../img/profile.jpg';
import NewRow from '../../../components/newRow'
import { useNavigate } from 'react-router-dom';

const UsersListPage = () => {

    const navigate = useNavigate();

    const [usersData, setUsersData] = useState();

    const getUsersData = async() =>{
        try {
            const role = localStorage.getItem('userData')?.role || null;
            const response = await authAxios.post("/api/users/",
                JSON.stringify({"role":role}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );   
            console.log(response)

            setUsersData(response?.data?.users);

        } catch (err) {
            if (!err?.response) {
                console.log("no response");
            }else{
                console.log("error")
            }
        }
    }

    const deleteUser = async(id) => {
        try {
            const response = await authAxios.delete("/api/users/"+id,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );
            console.log(response)
            if(response.status===200){
                getUsersData();
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

    useEffect(()=>{
        getUsersData();
    },[]);

    return (
        <Container>
            <h2>Users List</h2>
            <NewRow redirect={"/admin/users/new"}></NewRow>
            <MDBTable align='middle' responsive>
            <MDBTableHead>
                <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Username</th>
                    <th scope='col'>Role</th>
                    <th scope='col'>State</th>
                    <th scope='col'>Actions</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {usersData?.map((el)=>
                    <tr key={el._id}>
                    <td>
                        <div className='d-flex align-items-center'>
                        <img
                            src = {el.profileImage ?  SERVER_URL+"/userImages/"+el.profileImage : profile}
                            alt= 'profile picture'
                            style={{ width: '45px', height: '45px' }}
                            className='rounded-circle'
                        />
                        <div className='ms-3'>
                            <p className='fw-bold mb-1'>{el.firstName + " " + el.lastName}</p>
                            <p className='text-muted mb-0'>{el.email}</p>
                        </div>
                        </div>
                    </td>
                    <td>
                        <p className='fw-normal mb-1'>{el.username}</p>
                    </td>
                    <td>{el.role.charAt(0).toUpperCase() + el.role.slice(1)}</td>
                    <td>
                        <MDBBadge color={el.state==="active" ? 'success' : 'danger'} pill>
                            {el.state.charAt(0)?.toUpperCase() + el.state.slice(1)}
                        </MDBBadge>
                    </td>
                    <td className='actions'>
                        <a href={'/admin/users/'+el._id}>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </a>
                        <button onClick={()=>deleteUser(el._id)}>
                            <i className="fa-solid fa-trash"></i>
                        </button>
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

export default UsersListPage;