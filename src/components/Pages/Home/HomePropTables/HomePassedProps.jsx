import { useSelector } from "react-redux";
import HomePropItem from "../HomePropItem";

export default function HomePassedProps() {
    const passedProps = useSelector(store => store.props.main.filter(prop => prop.status === 'Passed'));

    return (
        <div id="recently-passed">
            <h2>Recently Passed Proposals</h2>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Proposed By</th>
                        <th>Successfully passed on</th>
                    </tr>
                </thead>
                <tbody>
                    {passedProps.map(prop => <HomePropItem key={prop.id} prop={prop} />)}
                </tbody>
            </table>
        </div>
    )
}