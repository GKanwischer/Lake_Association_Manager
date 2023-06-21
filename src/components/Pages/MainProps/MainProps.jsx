import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import MainPropItem from "../MainPropItem/MainPropItem";

export default function MainProps() {
    const proposals = useSelector(store => store.props.main)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_PROPS' });
      }, []);

    return (
        <div className="main-props">
            <h2>Proposals</h2>
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
                    {proposals.map(prop => <MainPropItem key={prop.id} prop={prop} />)}
                </tbody>
            </table>
        </div>
    )

}