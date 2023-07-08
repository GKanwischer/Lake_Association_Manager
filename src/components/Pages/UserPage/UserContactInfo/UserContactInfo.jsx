import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from "@mui/material/CardHeader";
import CardContent from '@mui/material/CardContent';

// this component constructs the contact info section of the user page

export default function ContactInfoTest() {
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const [editMode, setEditMode] = useState(false)
    // local input states
    const [firstNameInput, setFirstNameInput] = useState(user.first_name)
    const [lastNameInput, setLastNameInput] = useState(user.last_name)
    const [phoneNumberInput, setPhoneNumberInput] = useState(user.phone_number)
    const [emailInput, setEmailInput] = useState(user.email)
    const [streetAddressInput, setStreetAddressInput] = useState(user.street_address)
    const [cityInput, setCityInput] = useState(user.city)
    const [stateInput, setStateInput] = useState(user.state)

    // local object to be sent when a user updates their contact info
    const contactInfo = {
        first_name: firstNameInput,
        last_name: lastNameInput,
        phone_number: phoneNumberInput,
        email: emailInput,
        street_address: streetAddressInput,
        city: cityInput,
        state: stateInput
    }

    // function that sends the contactInfo object so the information can be updated in the db
    function handleUpdate() {
        dispatch({
            type: 'USER_CONTACT_INFO',
            payload: contactInfo
        })
        setEditMode(false);
    }

    return (
        <Card
            elevation={6}
            className="contact-info"
            sx={{
                height: 500,
                border: 4,
                borderRadius: '16px',
                borderColor: 'rgb(114, 162, 245)'
            }}
        >
            <CardHeader
                title="Contact Info"
                action={
                    <Button
                        variant="contained"
                        onClick={editMode
                                    ? handleUpdate
                                    : () => setEditMode(true)}
                    >
                        {!editMode
                            ? 'Edit'
                            : 'Update'}
                    </Button>
                }
            />
            <div>
                <CardContent className="contact-body" >
                    {editMode
                        ? <span>
                            <input
                                placeholder="First name"
                                type="text"
                                label="First Name"
                                value={firstNameInput}
                                className="contact-input"
                                onChange={e => setFirstNameInput(e.target.value)} />
                            <input
                                placeholder="Last name"
                                type="text"
                                label="Last Name"
                                value={lastNameInput}
                                className="contact-input"
                                onChange={e => setLastNameInput(e.target.value)} />
                        </span>
                        : (!user.first_name || !user.last_name)
                            ? <p><strong>Name:</strong> Not Given</p>
                            : <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>}
                    {editMode
                        ? <span>
                            <input
                                placeholder="phone number"
                                type="text"
                                label="Phone Number"
                                value={phoneNumberInput === '0' ? '' : phoneNumberInput}
                                className="contact-input"
                                onChange={e => setPhoneNumberInput(e.target.value)} />
                        </span>
                        : (!user.phone_number || user.phone_number === '0')
                            ? <p><strong>Phone Number:</strong> Not Given</p>
                            : <p><strong>Phone Number:</strong> {user.phone_number}</p>}
                    {editMode
                        ? <span>
                            <input
                                placeholder="Email Address"
                                type="email"
                                label="Email"
                                value={emailInput}
                                className="contact-input"
                                onChange={e => setEmailInput(e.target.value)} />
                        </span>
                        : (!user.email)
                            ? <p><strong>Email:</strong> Not Given</p>
                            : <p><strong>Email:</strong> {user.email}</p>}
                    {editMode
                        ? <span>
                            <input
                                placeholder="Street Address"
                                type="text"
                                label="Street Address"
                                value={streetAddressInput}
                                className="contact-input"
                                onChange={e => setStreetAddressInput(e.target.value)} />
                            <input
                                placeholder="City"
                                type="text"
                                label="City"
                                value={cityInput}
                                className="contact-input"
                                onChange={e => setCityInput(e.target.value)} />
                            <input
                                placeholder="State"
                                type="text"
                                label="State"
                                value={stateInput}
                                className="contact-input"
                                onChange={e => setStateInput(e.target.value)} />
                        </span>
                        : (!user.street_address || !user.city || !user.state)
                            ? <p><strong>Address:</strong> Not Given</p>
                            : <div><p><strong>Address:</strong> {user.street_address} - { }
                                {user.city}, {user.state}</p>
                            </div>}
                </CardContent>
            </div>
        </Card>
    )
}