import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import MainPropItem from "../MainPropItem/MainPropItem";

export default function MainProps() {
    const inProgressProps = useSelector(store => store.props.main.filter(prop => prop.status === 'In Progress'))
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_PROPS' });
        dispatch({ type: 'FETCH_USER_VOTES' });
      }, []);

    return (
        <div className="main-props">
            <h2>In Progress Proposals</h2>
            <table>
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Proposed By</th>
                        <th>Status</th>
                        <th>Vote</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {inProgressProps.map(prop => <MainPropItem key={prop.id} prop={prop} />)}
                </tbody>
            </table>
        </div>
    )

}