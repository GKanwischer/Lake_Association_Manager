import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

export default function UserContactInfo() {
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

    console.log('Client side user:' , user);

    const contactInfo = {
        first_name: firstNameInput,
        last_name: lastNameInput,
        phone_number: phoneNumberInput,
        email: emailInput,
        street_address: streetAddressInput,
        city: cityInput,
        state: stateInput
    }

    function handleUpdate() {
        dispatch({
            type: 'UPDATE_CONTACT_INFO',
            payload: contactInfo
        })
    }

    function submitChanges(){
        dispatch({
            type: 'USER_CONTACT_INFO',
            payload: user
        })

    }

    return (
        <div className="contact-info">
            <h3>Contact Info</h3>
            <button onClick={submitChanges}>Confirm Changes</button>

            {!user.first_name || !user.last_name ?
                <span>Name:
                    <input
                        placeholder="First name"
                        type="text"
                        value={firstNameInput}
                        onChange={e => setFirstNameInput(e.target.value)} />
                    <input
                        placeholder="Last name"
                        type="text"
                        value={lastNameInput}
                        onChange={e => setLastNameInput(e.target.value)} />
                    <button onClick={handleUpdate}>Update</button>
                </span>
                :
                <p>Name: {user.first_name} {user.last_name}</p>}
            {!user.phone_number ?
                <span>Phone Number:
                    <input
                        placeholder="phone number"
                        type="tel"
                        value={phoneNumberInput}
                        onChange={e => setPhoneNumberInput(e.target.value)} />
                    <button onClick={handleUpdate}>Update</button>
                </span>
                :
                <p>Phone Number: {user.phone_number}</p>}
            {!user.email ?
                <span>Email:
                    <input
                        placeholder="Email Address"
                        type="email"
                        value={emailInput}
                        onChange={e => setEmailInput(e.target.value)} />
                    <button onClick={handleUpdate}>Update</button>
                </span>
                :
                <p>Email address: {user.email}</p>}
            {!user.street_address || !user.city || !user.state ?
                <span>Address:
                    <input
                        placeholder="Street Address"
                        type="text"
                        value={streetAddressInput}
                        onChange={e => setStreetAddressInput(e.target.value)} />
                    <input
                        placeholder="City"
                        type="text"
                        value={cityInput}
                        onChange={e => setCityInput(e.target.value)} />
                    <input
                        placeholder="State"
                        type="text"
                        value={stateInput}
                        onChange={e => setStateInput(e.target.value)} />
                    <button onClick={handleUpdate}>Update</button>
                </span>
                :
                <div>
                    <p>Address: {user.street_address}</p>
                    <p>{user.city}, {user.state}</p>
                </div>}
        </div>
    )
}