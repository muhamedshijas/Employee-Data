import { MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBInput } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import './AddEmployee.css'
function AddEmployee() {
    const [name, setName] = useState("")
    const [designation, setDesignantion] = useState("Choose One")
    const handleVisa = (newVisaType) => {
        setDesignantion(newVisaType)
    }
    return (
        <div>
            <div className="add-employee">
                <form action="">
                    <h4 className='text-center'>Add Employee</h4>
                    <MDBInput label='Name' id='typeEmail' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    <MDBInput label='Email' id='typeEmail' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    <MDBInput label='Mobile No' id='typeEmail' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                   <select name="" id="">
                   
                   </select>
                </form>

            </div>
        </div>
    )
}

export default AddEmployee