import { useDispatch } from "react-redux"
import { useState } from "react";

export default function MainPropItem({ prop }) {
    const dispatch = useDispatch();
    const [selectedVote, setSelectedVote] = useState({proposal_id: prop.id, vote: null});

    console.log(`prop id: ${prop.id}`, prop);

    console.log(`selected vote value: ${prop.id}`, selectedVote);

    function handleVoteSubmit() {
        dispatch({ type: 'CAST_VOTE', payload: selectedVote })
    }

    return (
        <tr>
            <td>{prop.description}</td>
            <td>{prop.first_name} {prop.last_name}</td>
            <td>{prop.status}</td>
            <td>
                <label>
                    <input
                        type="radio"
                        name={prop.id}
                        value={selectedVote}
                        onChange={() => setSelectedVote({proposal_id: prop.id, vote: true})} /> Pass
                </label>
                <label>
                    <input
                        type="radio"
                        name={prop.id}
                        value={selectedVote} 
                        onChange={() => setSelectedVote({proposal_id: prop.id,vote: false})}/> Veto
                </label>
            </td>
            <td><button onClick={handleVoteSubmit}>Submit Vote</button></td>
        </tr>
    )
}