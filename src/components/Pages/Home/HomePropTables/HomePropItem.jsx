import moment from "moment";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

// this component constructs each item for the recently passed and vetoed proposal tables on the home page

export default function HomePropItem({ prop }) {

    return (
        <TableRow>
            <TableCell>{prop.description}</TableCell>
            <TableCell>{prop.first_name} {prop.last_name}</TableCell>
            <TableCell align="center" >{moment(prop.status_updated_date).format('ll')}</TableCell>
        </TableRow>
    )
}