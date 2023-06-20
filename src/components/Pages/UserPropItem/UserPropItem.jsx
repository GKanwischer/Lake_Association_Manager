

export default function UserPropItem({prop}){

    return(
        <tr>
            <td>{prop.description}</td>
            <td>{prop.created_date}</td>
            <td>{prop.status}</td>
            <td><button>Edit</button><button>Delete</button></td>
        </tr>

    )
}