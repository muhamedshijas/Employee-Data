import axios from 'axios';
import { MDBBtn, MDBDropdown, MDBDropdownItem, MDBDropdownMenu, MDBDropdownToggle, MDBInput } from 'mdb-react-ui-kit'
import { MDBFile } from 'mdb-react-ui-kit';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import './AddEmployee.css'
function EditEmployee({ showEditModal, setShowEditModal, selectedEmployee }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState(0)
    const [designation, setDesignation] = useState("Choose One")
    const [gender, setGender] = useState('')
    const [qualifications, setQualifications] = useState([]);
    const [errMessage, setErrMessage] = useState("")
    const [image, setImage] = useState(null);
    const [finalImage, setFinalImage] = useState(null)
    const dispatch = useDispatch()
    const [refresh, setRefresh] = useState(false)

    const [isLoading, setIsLoading] = useState(false);
    const handleDesignationChange = (event) => {
        setDesignation(event.target.value);
    };
    const _id=selectedEmployee._id
    useEffect(() => {
        if (selectedEmployee) {
            setName(selectedEmployee.name);
            setEmail(selectedEmployee.email);
            setPhone(selectedEmployee.phone);
            setDesignation(selectedEmployee.designation);
            setGender(selectedEmployee.gender);
            setQualifications(selectedEmployee.qualifications);
        }
    }, [selectedEmployee]);

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleQualificationChange = (event) => {
        const qualification = event.target.value;
        if (event.target.checked) {
            setQualifications([...qualifications, qualification]);
        } else {
            setQualifications(
                qualifications.filter((item) => item !== qualification)
            );
        }
    };
    const isValidFileUploaded = (file) => {
        const validExtensions = ['png', 'jpeg', 'jpg']
        const fileExtension = file.type.split('/')[1]
        return validExtensions.includes(fileExtension)
    }
    const handleImage = (e) => {
        if (isValidFileUploaded(e.target.files[0])) {
            setImage(e.target.files[0])
            setErrMessage("")
            ImageTOBase(e.target.files[0])
        } else {
            setErrMessage("Invalid File type")
        }
    }

    const ImageTOBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFinalImage(reader.result)
        }
    }
    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true)
        if (designation == "Choose One") {
            setErrMessage("choose Qualification")
        }
        else {
            try {
                const formData = {
                   _id, name, email, phone, designation, gender, qualifications, profile:finalImage
                }

                const response = await axios.put('/admin/editEmployee', formData, {
                });
                console.log(response);
               if(!response.data.err){
                setShowEditModal(false)
                alert("employee Edited successfully ")
                setIsLoading(false)
                setRefresh(!refresh)
               } else{
                setErrMessage(response.data.message)
               } 

            } catch (error) {
                console.error(error);
            }
        }
    }
    return (
        <div>
            <div className="add-employee">
                <form action="">
                    <h4 className='text-center'>Edit Employee</h4>

                    <MDBInput label='Name' id='typeEmail' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    <MDBInput label='Email' id='typeEmail' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <MDBInput label='Mobile No' id='typeEmail' type='number' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <select name="" id="" onChange={handleDesignationChange}>
                        <option value="">Choose any Option</option>
                        <option value="HR">HR</option>
                        <option value="Manager">Manager</option>
                        <option value="Sales">Sales</option>
                    </select>
                    <div className="gender">

                        <label htmlFor="male">
                            Male
                            <input
                                type="radio"
                                name="gender"
                                id="male"
                                value="male"
                                checked={gender === 'male'}
                                onChange={handleGenderChange}
                            />
                        </label>
                        <label htmlFor="female">
                            Female
                            <input
                                type="radio"
                                name="gender"
                                id="female"
                                value="female"
                                checked={gender === 'female'}
                                onChange={handleGenderChange}
                            />
                        </label>
                    </div>

                    <div className="course">
                        <div className="qualification">
                            <input
                                type="checkbox"
                                id="bca"
                                value="BCA"
                                checked={qualifications.includes('BCA')}
                                onChange={handleQualificationChange}
                            />
                            <label htmlFor="bca">BCA</label>
                        </div>
                        <div className="qualification">
                            <input
                                type="checkbox"
                                id="mca"
                                value="MCA"
                                checked={qualifications.includes('MCA')}
                                onChange={handleQualificationChange}
                            />
                            <label htmlFor="mca">MCA</label>
                        </div>
                        <div className="qualification">
                            <input
                                type="checkbox"
                                id="bsc"
                                value="BSc"
                                checked={qualifications.includes('BSc')}
                                onChange={handleQualificationChange}
                            />
                            <label htmlFor="bsc">BSc</label>
                        </div>
                    </div>
                    <MDBFile label='Choose Image' id='customFile' accept=".jpeg, .jpg, .png" onChange={handleImage} />
                    {
                        errMessage &&
                        <div className="login-row" style={{ justifyContent: "center" }}>
                            <p className='text-danger font-weight-bold'>{errMessage}</p>
                        </div>
                    }
                    {isLoading ? (
                        <BeatLoader color="#007bff" size={12}  /> // Display loading spinner
                    ) : (
                        <MDBBtn onClick={handleSubmit}>Add</MDBBtn> // Display the "Edit" button
                    )}
                </form>

            </div>
        </div>
    )
}

export default EditEmployee