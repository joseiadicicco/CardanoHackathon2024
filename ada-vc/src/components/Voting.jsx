import React, { useState } from 'react';

const Voting = ({ onVoteSubmit, results }) => {
    const [vote, setVote] = useState('');
    const [voted, setVoted] = useState(false);
  
    const handleVoteChange = (e) => {
      setVote(e.target.value);
    };
  
    const handleVoteSubmit = (e) => {
      e.preventDefault();
      onVoteSubmit(vote);
      setVoted(true);
    };
  
    return (
      <div>
        {!voted ? (
          <form onSubmit={handleVoteSubmit}>
            <h2>Vote for Your Favorite Option</h2>
            <label>
              <input
                type="radio"
                name="vote"
                value="Option 1"
                onChange={handleVoteChange}
                required
              />
              Option 1
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="vote"
                value="Option 2"
                onChange={handleVoteChange}
                required
              />
              Option 2
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="vote"
                value="Option 3"
                onChange={handleVoteChange}
                required
              />
              Option 3
            </label>
            <br />
            <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
              Submit Vote
            </button>
          </form>
        ) : (
          <div>
            <h2>Voting Results</h2>
            <ul>
              {Object.keys(results).map((key) => (
                <li key={key}>
                  {key}: {results[key]} votes
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  export default Voting;