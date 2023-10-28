import {React, useEffect, useState} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {Container, Row, Col} from 'react-bootstrap'
import {MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import './style.css'
import {normalAxios,authAxios} from '../../../api/axios'
import NewRow from '../../../components/newRow';

const TutorialEditPage = () => {

    const navigate = useNavigate();

    let [data, setData] = useState("");
    let [partData, setPartData] = useState([]);

    let [name,setName] = useState("");
    let [order,setOrder] = useState("");

    let [newRow, setNewRow] = useState();

    const { id } = useParams();
  
    useEffect(() => {
        getData(id);
        getPartData(id);
    }, [id]);

    useEffect(() => {
        setNewRow((partData[partData.length-1]?.part||0)+1)
    }, [partData]);

    const getData = async (id) => {
        try {
            const role = localStorage.getItem('userData')?.role || null;
            const path = String("/api/tutorial/topic/" + id);
            const response = await authAxios.post(path,
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
            const response = await authAxios.post("/api/tutorial/topic/parts",
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
            const response = await authAxios.post("/api/tutorial/topic/edit/"+id,
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

    const deletePart = async(partId)=>{
        try {
            const response = await authAxios.delete("/api/tutorial/"+partId,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
            );

            if(response.status===200){
                getPartData(id);
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
                            <label htmlFor='name'>Name of Topic: </label>
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
            <NewRow redirect={"/admin/tutorial/topic/" + id + "/part/new/" + newRow}></NewRow>
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
                        <tr key={el._id}>
                            <th scope='row' >{el.part}</th>
                            <td>{el.name}</td>
                            <td className='actions'>
                                <a href={'/admin/tutorial/topic/'+id+'/part/'+el._id}>
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </a>
                                <button onClick={()=>deletePart(el._id)}><i className="fa-solid fa-trash"></i></button>
                            </td>
                        </tr>
                    )}
                </MDBTableBody>
            </MDBTable> 
            </div>
            }
            <div className='edit-actions'>
                <button type="button" className="btn btn-dark" onClick={()=>navigate(-1)}>Back</button>
            </div>
           
        </Container>
    )
}

export default TutorialEditPage;