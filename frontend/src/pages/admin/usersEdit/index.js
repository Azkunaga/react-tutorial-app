import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import { normalAxios } from '../../../api/axios';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import profile from '../../../img/profile.jpg';

const UsersEditPage = () => {

    const [usersData, setUsersData] = useState();

    const getUsersData = async() =>{
        try {
            const role = localStorage.getItem('userData')?.role || null;
            const response = await normalAxios.post("/api/users/",
                JSON.stringify({"role":role}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );   
            console.log(response?.data?.users);
            setUsersData(response?.data?.users);

        } catch (err) {
            if (!err?.response) {
                console.log("no response");
            }else{
                console.log("error")
            }
        }
    }

    const deleteUser = async() => {

    }

    useEffect(()=>{
        getUsersData();
    },[]);

    return (
        <Container>
            <h2>Users List</h2>
            <MDBTable align='middle' responsive>
            <MDBTableHead>
                <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>Username</th>
                    <th scope='col'>Role</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Actions</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {usersData?.map((el)=>
                    <tr>
                    <td>
                        <div className='d-flex align-items-center'>
                        <img
                            src={el.img || profile}
                            alt=''
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
                        <MDBBadge color='success' pill>
                            {el.status.charAt(0).toUpperCase() + el.status.slice(1)}
                        </MDBBadge>
                    </td>  
                    <td className='actions'>
                        <a href={'/admin/user/'+el._id}>
                            <i className="fa-solid fa-pen-to-square"></i>
                        </a>
                        <button onClick={deleteUser}>
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                    </tr>
                )}
            </MDBTableBody>
            </MDBTable>
        </Container>

    )
}

export default UsersEditPage;