import React, { useState } from 'react'
import './employee.css'
import { MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import AddEmployee from '../Modal/AddEmployee';
import axios from 'axios';
import Swal from 'sweetalert2';
import EditEmployee from '../Modal/EditEmployee';

function Employee() {
    const [showAddModal,setShowAddModal]=useState(false)
    const [showEditModal,setShowEditModal]=useState(false)
    const [employeeData,setEmployeeData]=useState([])
    const [refresh,setRefresh]=useState(false)
    const [name,setName]=useState('')
    const [count,setCount]=useState()
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    function handleAddModal(){
        setShowAddModal(true)
    }
    function handleEditModal(employeeId){
      const selected = employeeData.find((item) => item._id === employeeId);
        setSelectedEmployee(selected);
        console.log(selected)
        setShowEditModal(true)
    }
    React.useEffect(()=>{
      (
          async function(){
              try{
                  const {data}=await axios.get("/admin/getEmployeeData?name="+name)
                  console.log(data)
                  if(!data.err){
                      console.log(data)
                      setEmployeeData(data.employees)
                      setCount(data.employeesCount)
                      setRefresh(!refresh)
                  }
              }
              catch(err){   
                  console.log(err)
          }
          }
      )()
    },[refresh])
    const handleDelete=(id)=>{
      Swal.fire({
        title: 'Are you sure? logout',
        text: "Delete this URL!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#7e3af2',
        cancelButtonColor: '##a8a8a8',
        confirmButtonText: 'Yes, Logout!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.get("/admin/delete/"+id)
          setRefresh(!refresh)
        }
      })
    }
  return (
    <div className='table-container'>
    <div className="menubar">
    <div className="search">
    <MDBInput label='Search Here'  type='text'  value={name} onChange={(e)=>setName(e.target.value)}/>
    <MDBBtn >Search</MDBBtn>
    </div>
    <div className="counts">
    <p>Total Number of Employees:{count}</p>
    </div>
    </div>
    <div className="table">
    <MDBTable align='middle' >
      <MDBTableHead>
        <tr>
          <th scope='col'>Id</th>
          <th scope='col'>Image</th>
          <th scope='col'>Name</th>
          <th scope='col'>Email</th>
          <th scope='col'>Mobile No</th>
          <th scope='col'>Designation</th>
          <th scope='col'>Gender</th>
          <th scope='col'>Course</th>
          <th scope='col'>Create Date</th>
          <th scope='col'>Actions</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
      {
        employeeData.map((item,index)=>{
          return <tr>

          <td>
           {index+1}
          </td>
          <td>
          <img
          src={item.profile.secure_url}
          alt=''
          style={{ width: '45px', height: '45px' }}
          className='rounded-circle'
        />
          </td>
          <td>
           <p>{item.name}</p>
          </td>
          <td><p>{item.email}</p> </td>
          <td>
          <p>{item.phone}</p>
          </td>
          <td><p> {item.designation}</p></td>
          <td><p> {item.gender} </p></td>
          <td><p> {item.qualifications[0]} </p></td>
          <td> <p>{new Date(new Date).toLocaleDateString()}</p> </td>
            <td className='icons'><MDBIcon fas icon="trash"  className='delete' onClick={()=>handleDelete(item._id)} size='lg'/> 
            <MDBIcon fas icon="edit" size='lg' className='edit' onClick={()=>handleEditModal(item._id)} /></td>
          </tr>
        })
      }
        
          
      </MDBTableBody>
      
    </MDBTable>

    <div className="btn">
    <MDBBtn onClick={handleAddModal}  >Add Employee</MDBBtn>
    </div>
    </div>
    {
        showAddModal && <AddEmployee showAddModal={showAddModal} setShowAddModal={setShowAddModal}/>
    }
    {
      showEditModal && <EditEmployee showEditModal={showEditModal} setShowEditModal={setShowEditModal} selectedEmployee={selectedEmployee}/>
  }
    </div>
  )
}

export default Employee