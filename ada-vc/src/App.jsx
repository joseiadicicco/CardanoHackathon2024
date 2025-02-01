//import * as Cardano from "@emurgo/cardano-serialization-lib-browser";
//import initCardano, * as Cardano from "@emurgo/cardano-serialization-lib-browser/wasm?init";

//await initCardano(); // Ensure the WASM module is initialized before using

import React, { useState } from 'react';
import Questionnaire from './components/Questionnaire';
import Results from './components/Results';
import Voting from './components/Voting';
import Login from './components/Login';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    // Puedes registrar el error en un servicio de monitoreo aquí
  }

  render() {
    if (this.state.hasError) {
      return <h1>Algo salió mal.</h1>;
    }

    return this.props.children;
  }
}
/* const questions = [
  { id: 1, question: 'What is the best blockchain?', options: ['Cardano', 'Polygon', 'Avalanche', 'Ethereum'], answer: 'Cardano' },
  { id: 2, question: 'In which city does the Cardano Week take place this year?', options: ['New York', 'Buenos Aires', 'Berlin', 'Madrid'], answer: 'Buenos Aires' },
  { id: 3, question: 'With what programming language can you write Smart Contracts for the Cardano Blockchain?', options: ['Solidity', 'Rust', 'Aiken', 'JavaScript'], answer: 'Aiken' },
]; */


const App = () => {
  const questions = [
    { id: 1, question: 'What is the best blockchain?', options: ['Cardano', 'Polygon', 'Avalanche', 'Ethereum'], answer: 'Cardano' },
    { id: 2, question: 'In which city does the Cardano Week take place this year?', options: ['New York', 'Buenos Aires', 'Berlin', 'Madrid'], answer: 'Buenos Aires' },
    { id: 3, question: 'With what programming language can you write Smart Contracts for the Cardano Blockchain?', options: ['Solidity', 'Rust', 'Aiken', 'JavaScript'], answer: 'Aiken' },
  ];

  const [user, setUser] = useState(null);
  const [page, setPage] = useState('login');
  const [score, setScore] = useState(0);
  const [votes, setVotes] = useState({ 'Option 1': 0, 'Option 2': 0, 'Option 3': 0 });
  const [transactionStatus, setTransactionStatus] = useState("");
  const [cardanoInitialized, setCardanoInitialized] = useState(false);

/*   useEffect(() => {
    const initializeWasm = async () => {
      await initCardano();
      setCardanoInitialized(true);
    };
    initializeWasm();
  }, []);

  if (!cardanoInitialized) {
    return <div>Loading...</div>; // Show a loading indicator until WASM is initialized
  } */
  

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    setPage('quiz');
  };

  const handleQuizSubmit = async (answers) => {
    // Ensure answers is processed correctly
    let correctAnswers = 0;
    questions.forEach((question) => {
      if (answers[question.id] === question.answer) {
        correctAnswers++;
      }
    });
  
    const updatedUser = { ...user, score: correctAnswers };
    setUser(updatedUser);
    setScore(correctAnswers);

    
    setPage('results');
  
    /* // Attempt to connect to Cardano wallet
    try {
      if (!window.cardano || !window.cardano.nami) {
        setTransactionStatus("Nami wallet is not installed. Please install it.");
        return;
      }

      const api = await window.cardano.nami.enable();
      const address = await api.getUsedAddresses(); // Get user's wallet address
      
      // Mock transaction logic (Cardano-specific implementation here)
      const txHash = await createAndSubmitTransaction(api, address);
      if (txHash) {
        setTransactionStatus("Transaction successful!");
        setPage("results");
      } else {
        setTransactionStatus("Transaction failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setTransactionStatus("Transaction failed. Please check your wallet.");
    } */

    // Update user score in the database
    fetch(`http://localhost:3001/users/${user.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score: correctAnswers }),
    });
  };
  

  const createAndSubmitTransaction = async (api, address) => {
    // Cardano transaction creation logic (simplified example)
    try {
      const txBuilder = Cardano.TransactionBuilder.new();
      // Add mock transaction details (e.g., amount, receiver, metadata)
      // Example: Metadata to record score on the blockchain
      const metadata = {
        "quiz-app": { user: user.username, score: score },
      };
      const encodedMetadata = Cardano.encode_json_str_to_metadatum(
        JSON.stringify(metadata)
      );

      // Attach metadata to the transaction
      txBuilder.add_json_metadatum(encodedMetadata);

      const unsignedTx = txBuilder.build();
      const signedTx = await api.signTx(unsignedTx.to_hex(), true);
      const txHash = await api.submitTx(signedTx);

      return txHash; // Returns transaction hash if successful
    } catch (err) {
      console.error("Error creating or submitting transaction:", err);
      return null;
    }
  };

  const handleRetakeQuiz = () => {
    setScore(0);
    setPage('quiz');
  };

  const handleVoteSubmit = (vote) => {
    setVotes({ ...votes, [vote]: votes[vote] + 1 });
  };


  return (
    <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>ADA VR - Qualified Voters</h1>
      {page === 'login' && <Login onLogin={handleLogin} />}
      {user && page === 'quiz' && (
        <Questionnaire
          questions={questions}
          onSubmit={(answers) => {
            console.log(answers)

            //const correctAnswers = answers.filter((ans) => ans.correct).length;
            handleQuizSubmit(answers);
          }}
        />
      )}
      {user && page === 'results' && (
        <Results
          score={score}
          totalQuestions={2}
          onRetake={handleRetakeQuiz}
          onVotePage={() => setPage('voting')}
        />
      )}
      {user && page === 'voting' && <Voting onVoteSubmit={handleVoteSubmit} results={votes} />}
    </div>
  );
};

export default App;