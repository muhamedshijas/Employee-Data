import React, { useState } from 'react'
import './employee.css'
import { MDBIcon } from 'mdb-react-ui-kit';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import AddEmployee from '../Modal/AddEmployee';

function Employee() {
    const [showAddModal,setShowAddModal]=useState(false)
    function handleAddModal(){
        setShowAddModal(true)
    }
  return (
    <div className='table-container'>
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
        <tr>
          <td>
           1
          </td>
          <td>
          <img
          src='https://mdbootstrap.com/img/new/avatars/8.jpg'
          alt=''
          style={{ width: '45px', height: '45px' }}
          className='rounded-circle'
        />
          </td>
          <td>
           <p>Muhamed Shijas</p>
          </td>
          <td><p>shijushijas157@gmail.com</p> </td>
          <td>
          <p>8943200491</p>
          </td>
          <td><p> HR</p></td>
          <td><p> Male </p></td>
          <td><p> MCA </p></td>
          <td> <p>{new Date(new Date).toLocaleDateString()}</p> </td>
            <td className='icons'><MDBIcon fas icon="trash"  className='delete' size='lg'/> <MDBIcon fas icon="edit" size='lg' className='edit' /></td>
          </tr>
          
      </MDBTableBody>
      
    </MDBTable>

    <div className="btn">
    <MDBBtn onClick={handleAddModal}  >Add Employee</MDBBtn>
    </div>
    </div>
    {
        showAddModal && <AddEmployee/>
    }
    </div>
  )
}

export default Employee