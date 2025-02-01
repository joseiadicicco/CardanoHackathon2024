const Results = ({ score, onRetake, onVotePage }) => {
    return (
      <div>
        <h2>Your Results</h2>
        <p>
          You have {score} votes.
        </p>
        <button
          onClick={onRetake}
          style={{ padding: '10px 20px', fontSize: '16px', marginRight: '10px' }}
        >
          Retake Quiz
        </button>
        <button
          onClick={onVotePage}
          style={{ padding: '10px 20px', fontSize: '16px' }}
        >
          Go to Voting Page
        </button>
      </div>
    );
  };

  export default Results;