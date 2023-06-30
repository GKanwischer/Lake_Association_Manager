import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react";
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import FormControl from '@mui/material/FormLabel'
import FormLabel from '@mui/material/FormLabel'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import Button from '@mui/material/Button'
import Swal from "sweetalert2";

export default function MainPropItem({ prop }) {
    const dispatch = useDispatch();
    const userVotes = useSelector(store => store.props.user_votes);
    const existingVote = userVotes.find(vote => vote.proposal_id === prop.id);
    const [selectedVote, setSelectedVote] = useState({
        proposal_id: prop.id,
        vote: existingVote ? existingVote.vote : null
    });
    console.log('selectedVote: ', selectedVote);

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

    const handleChange = (event) => {
        setSelectedVote({
            proposal_id: prop.id,
            vote: event.target.value === "true",
        });
    };

    return (
        <TableRow hover >
            <TableCell>{prop.description}</TableCell>
            <TableCell>{prop.first_name} {prop.last_name}</TableCell>
            <TableCell align="center">
                <FormControl component="fieldset">
                    <RadioGroup
                        row
                        aria-label={`vote-${prop.id}`}
                        name={`vote-${prop.id}`}
                        value={selectedVote.vote}
                        onChange={handleChange}
                    >
                        <FormControlLabel
                            value="true"
                            control={<Radio size="small" />}
                            label="Pass"
                        />
                        <FormControlLabel
                            value="false"
                            control={<Radio size="small" />}
                            label="Veto"
                        />
                    </RadioGroup>
                </FormControl>
            </TableCell>
            <TableCell>
                <Button
                    variant="contained"
                    onClick={() => {handleVoteSubmit(), Swal.fire({
                        icon: 'success',
                        title: 'Your vote has been saved',
                        showConfirmButton: false,
                        timer: 1450
                      })}}

                      
                    >Submit Vote</Button>
            </TableCell>
        </TableRow>
    )
}