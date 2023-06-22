import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";

export default function MainPropItem({ prop }) {
    const dispatch = useDispatch();
    const userVotes = useSelector(store => store.props.user_votes);
    const [selectedVote, setSelectedVote] = useState({ proposal_id: prop.id, vote: userVotes.vote });

    // console.log('User votes: ', userVotes);
    // console.log(`prop id: ${prop.id}`, prop);
    console.log(`selected vote value: ${prop.id}`, selectedVote);

    function handleVoteSubmit() {
        const existingVote = userVotes.find(vote => vote.proposal_id === prop.id);
        console.log("existing vote:", existingVote);

        
        if (existingVote) {
            if (existingVote.vote !== selectedVote.vote) {
                dispatch({ type: 'FETCH_USER_VOTES' });
            }
        }

        if (existingVote) {
            if (existingVote.vote !== selectedVote.vote) {
                const updatedVote = { proposal_id: existingVote.proposal_id, vote: selectedVote.vote };
                console.log(`updated vote for proposal id: ${existingVote.proposal_id}: `, updatedVote);
                dispatch({ type: 'UPDATE_VOTE', payload: updatedVote });
                dispatch({ type: 'FETCH_USER_VOTES' });
            } else {
                console.log(`Vote value hasn't changed`);
            }
        } else {
            dispatch({ type: 'CAST_VOTE', payload: selectedVote })
        }
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
                        value={selectedVote.vote}
                        onChange={() => setSelectedVote({ proposal_id: prop.id, vote: true })} /> Pass
                </label>
                <label>
                    <input
                        type="radio"
                        name={prop.id}
                        value={selectedVote.vote}
                        onChange={() => setSelectedVote({ proposal_id: prop.id, vote: false })} /> Veto
                </label>
            </td>
            <td><button onClick={handleVoteSubmit}>Submit Vote</button></td>
        </tr>
    )
}