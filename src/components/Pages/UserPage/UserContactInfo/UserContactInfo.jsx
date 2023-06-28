import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';

export default function ContactInfoTest() {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    // local input states
    const [firstNameInput, setFirstNameInput] = useState(user.first_name)
    const [lastNameInput, setLastNameInput] = useState(user.last_name)
    const [phoneNumberInput, setPhoneNumberInput] = useState(user.phone_number)
    const [emailInput, setEmailInput] = useState(user.email)
    const [streetAddressInput, setStreetAddressInput] = useState(user.street_address)
    const [cityInput, setCityInput] = useState(user.city)
    const [stateInput, setStateInput] = useState(user.state)
    const [editMode, setEditMode] = useState(false)

    // console.log('Client side user:', user);

    const contactInfo = {
        first_name: firstNameInput,
        last_name: lastNameInput,
        phone_number: Number(phoneNumberInput),
        email: emailInput,
        street_address: streetAddressInput,
        city: cityInput,
        state: stateInput
    }

    console.log('updated contact info: ', contactInfo);

    function handleUpdate() {
        dispatch({
            type: 'USER_CONTACT_INFO',
            payload: contactInfo
        })
        setEditMode(false);
    }

    return (
        <Card elevation={6} className="contact-info">
            <div>
                <div className="contact-header">
                    <h3>Contact Info</h3>
                    {!editMode ? <Button variant="contained" onClick={() => setEditMode(true)}>Edit</Button>
                        : <Button variant="contained" onClick={handleUpdate}>Update</Button>}
                </div>
                <div className="contact-body">
                    {editMode
                        ? <span>Name:
                            <TextField
                                variant='filled'
                                placeholder="First name"
                                type="text"
                                value={firstNameInput}
                                onChange={e => setFirstNameInput(e.target.value)} />
                            <TextField
                                variant='filled'
                                placeholder="Last name"
                                type="text"
                                value={lastNameInput}
                                onChange={e => setLastNameInput(e.target.value)} />
                        </span>
                        : (!user.first_name || !user.last_name)
                            ? <span>Name: Not Given</span>
                            : <span>Name: {user.first_name} {user.last_name}</span>}
                    {editMode
                        ? <span>Phone Number:
                            <TextField
                                variant='filled'
                                placeholder="phone number"
                                type="tel"
                                value={phoneNumberInput === '0' ? '' : phoneNumberInput}
                                onChange={e => setPhoneNumberInput(e.target.value)} />
                        </span>
                        : (!user.phone_number || user.phone_number === '0')
                            ? <span>Phone Number: Not Given</span>
                            : <span>Phone Number: {user.phone_number}</span>}
                    {editMode
                        ? <span>Email:
                            <TextField
                                variant='filled'
                                placeholder="Email Address"
                                type="email"
                                value={emailInput}
                                onChange={e => setEmailInput(e.target.value)} />
                        </span>
                        : (!user.email)
                            ? <span>Email: Not Given</span>
                            : <span>Email address: {user.email}</span>}
                    {editMode
                        ? <span>Address:
                            <TextField
                                variant='filled'
                                placeholder="Street Address"
                                type="text"
                                value={streetAddressInput}
                                onChange={e => setStreetAddressInput(e.target.value)} />
                            <TextField
                                variant='filled'
                                placeholder="City"
                                type="text"
                                value={cityInput}
                                onChange={e => setCityInput(e.target.value)} />
                            <TextField
                                variant='filled'
                                placeholder="State"
                                type="text"
                                value={stateInput}
                                onChange={e => setStateInput(e.target.value)} />
                        </span>
                        : (!user.street_address || !user.city || !user.state)
                            ? <span>Address: Not Given</span>
                            : <div><span>Address: {user.street_address} - { }
                                {user.city}, {user.state}</span>
                            </div>}
                </div>
            </div>
        </Card>
    )
}