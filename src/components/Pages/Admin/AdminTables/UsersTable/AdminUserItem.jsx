import { useDispatch, useSelector } from "react-redux"

export default function AdminUserItem({ user }) {
    const dispatch = useDispatch();
    const loggedInUser = useSelector(store => store.user)

    function userLevelChange() {
        dispatch({ type: 'ADMIN_USER_LEVEL', payload: user.id })
        // dispatch({ type: 'ADMIN_FETCH_USERS' })
    }

    function deleteUser() {
        dispatch({ type: 'ADMIN_DELETE_USER', payload: user.id })
        // dispatch({ type: 'ADMIN_FETCH_USERS' })
    }

    return (
        <tr>
            <td>{user.is_admin
                ? 'Admin'
                : 'User'}
            </td>
            <td>{user.username}</td>
            <td>{(user.first_name || user.last_name)
                ? user.first_name + ' ' + user.last_name
                : 'N/A'}
            </td>
            <td>{(!user.phone_number || user.phone_number === '0')
                ? 'N/A'
                : user.phone_number}
            </td>
            <td>{user.email
                ? user.email
                : 'N/A'}
            </td>
            <td>{(user.street_address || user.city || user.state)
                ? (`${user.street_address} ${user.city}, ${user.state}`)
                : 'N/A'}
            </td>
            <td className="user-actions">
                <button onClick={userLevelChange}>{user.is_admin ? 'Remove Admin' : 'Make Admin'}</button>
                <button onClick={deleteUser}>Delete</button>
            </td>
        </tr>
    )
}