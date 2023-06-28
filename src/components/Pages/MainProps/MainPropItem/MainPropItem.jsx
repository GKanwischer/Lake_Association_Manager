import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react";

export default function MainPropItem({ prop }) {
    const dispatch = useDispatch();
    const userVotes = useSelector(store => store.props.user_votes);
    const existingVote = userVotes.find(vote => vote.proposal_id === prop.id);
    const [selectedVote, setSelectedVote] = useState({ proposal_id: prop.id,
        vote: existingVote ? existingVote.vote : null
    });
    
    useEffect(() => {
        dispatch({ type: 'FETCH_USER_VOTES'});
    }, [])

    useEffect(() => {
        if (existingVote) {
            setSelectedVote((prevSelectedVote) => ({
              ...prevSelectedVote,
              vote: existingVote.vote,
            }));
          }
        }, [existingVote]);

    function handleVoteSubmit() {
        const existingVote = userVotes.find(vote => vote.proposal_id === prop.id);
        console.log("existing vote:", existingVote);

        if (existingVote) {
            if (existingVote.vote !== selectedVote.vote) {
                dispatch({ type: 'FETCH_USER_VOTES' });
            }
        }
        // checks if a user's vote exists for the specific proposal and then allows them to update the value of their vote
        if (existingVote) {
            if (existingVote.vote !== selectedVote.vote) {
                const updatedVote = { proposal_id: existingVote.proposal_id, vote: selectedVote.vote };
                dispatch({ type: 'UPDATE_VOTE', payload: updatedVote });
                // dispatch({ type: 'FETCH_USER_VOTES' });
            } else {
                console.log(`Vote value hasn't changed`);
            }
        } else {
            // if the user doesn't already have a vote cast on the proposal their selected value is sent to the db in a POST request
            dispatch({ type: 'CAST_VOTE', payload: selectedVote })
            // dispatch({ type: 'FETCH_USER_VOTES' });
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
                        value={true}
                        checked={selectedVote.vote === true}
                        onChange={() => setSelectedVote({ proposal_id: prop.id, vote: true })} /> Pass
                </label>
                <label>
                    <input
                        type="radio"
                        name={prop.id}
                        value={false}
                        checked={selectedVote.vote === false}
                        onChange={() => setSelectedVote({ proposal_id: prop.id, vote: false })} /> Veto
                </label>
            </td>
            <td><button onClick={handleVoteSubmit}>Submit Vote</button></td>
        </tr>
    )
}