import { useSelector } from "react-redux";
import HomePropItem from "../HomePropItem";

export default function HomeVetoedProps() {
    const vetoedProps = useSelector(store => store.props.main.filter(prop => prop.status === 'Vetoed'));


    return (
        <div id="recently-passed">
            <h2>Recently Vetoed Proposals</h2>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Proposed By</th>
                        <th>Offically Vetoed on</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {vetoedProps.map(prop => <HomePropItem key={prop.id} prop={prop} />)}
                </tbody>
            </table>
        </div>
    )
}