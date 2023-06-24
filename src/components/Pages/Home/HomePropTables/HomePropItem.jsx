import moment from "moment";

export default function HomePropItem({ prop }) {

    return (
        <tr>
            <td>{prop.description}</td>
            <td>{prop.first_name} {prop.last_name}</td>
            <td>{moment(prop.status_updated_date).format('ll')}</td>
        </tr>
    )
}