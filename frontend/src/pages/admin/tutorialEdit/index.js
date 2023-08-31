import {React, useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './style.css'
import {normalAxios} from '../../../api/axios'
import BackButton from '../../../components/backButton';

const TutorialEditPage = () => {

    let [data, setData] = useState("");
    let [partData, setPartData] = useState([]);

    let [name,setName] = useState("");
    let [order,setOrder] = useState("");

    const { id } = useParams();
  
    useEffect(() => {
        getData(id);
        getPartData(id);
    }, [id]);

    const getData = async (id) => {
        try {
            const role = localStorage.getItem('userData')?.role || null;
            const path = String("/api/tutorial/topic/" + id);
            const response = await normalAxios.post(path,
                JSON.stringify({"role":role}),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );            
            setData(response?.data?.topic);

            setName(response?.data?.topic.name);
            setOrder(response?.data?.topic.order)
            

        } catch (err) {
            if (!err?.response) {
                console.log("no response");
            }else{
                console.log("error")
            }
        }
    }

    const getPartData = async (id) => {
        try {
            const role = localStorage.getItem('userData')?.role || null;
            const response = await normalAxios.post("/api/tutorial/topic/parts",
                JSON.stringify({"topicId":id, "role": role}),
                {   
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            
            setPartData(response?.data?.parts);
        } catch (err) {
            if (!err?.response) {
                console.log("not response")
                console.log(err);
            }else{
                console.log(err);
            }
        }
    }

    const saveTopic = async () =>{
        try {
            const role = localStorage.getItem('userData')?.role || null;
            const response = await normalAxios.post("/api/tutorial/topic/edit/"+id,
            JSON.stringify({"order":order, "name":name, "role": role}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );

            console.log(response);

        }catch(err){
            if (!err?.response) {
                console.log("not response")
                console.log(err);
            }else{
                console.log(err);
            }
        }
    }

    return (
        <Container>
           <h2>Edit Tutorial Topic</h2>
           { data &&
           <div>
            <div className='edit'>
            <form onSubmit={saveTopic}>
                    <Row>
                        <Col>
                        <div className='input-container'>
                            <label htmlFor='order'>Order: </label>
                            <input type="number" 
                            placeholder=" "
                            id="order"
                            autoComplete="off"
                            value={order}
                            required
                            onChange={(e) => setOrder(e.target.value)}
                            />
                        </div>
                        </Col>
                        <Col>
                        <div className='input-container'>
                            <label htmlFor='name'>Name of Part: </label>
                            <input type="text" 
                            placeholder=" "
                            id="name"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        </Col>
                    </Row>

                    <div className='edit-actions'>
                        <button type="button" className="btn btn-dark" onClick={saveTopic}>Save</button>
                    </div>

            </form>
           </div>
           <h3>Topic Parts</h3>
            <MDBTable align='middle' className='topicTable' responsive bordered >
                <MDBTableHead>
                    <tr>
                        <th scope='col'>Order</th>
                        <th scope='col'>Part Name</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {partData?.map((el)=>
                        <tr>
                            <th scope='row' >{el.part}</th>
                            <td>{el.name}</td>
                            <td className='actions'>
                                <a href={'/admin/tutorial/topic/'+id+'/part/'+el._id}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </a>
                            </td>
                        </tr>
                    )}
                </MDBTableBody>
            </MDBTable> 
            </div>
            }
            <BackButton></BackButton>
        </Container>
    )
}

export default TutorialEditPage;