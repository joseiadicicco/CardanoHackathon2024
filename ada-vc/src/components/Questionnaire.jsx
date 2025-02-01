import React, { useState } from 'react';

const Questionnaire = ({ questions, onSubmit }) => {
    const [answers, setAnswers] = useState({});
  
    const handleChange = (e, questionId) => {
      setAnswers({ ...answers, [questionId]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(answers); // Pass the answers object to the parent
    };
  
    return (
      <form onSubmit={handleSubmit}>
        {questions.map((q) => (
          <div key={q.id} style={{ marginBottom: '20px' }}>
            <h3>{q.question}</h3>
            {q.options.map((option) => (
              <label key={option} style={{ display: 'block', marginBottom: '5px' }}>
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  value={option}
                  onChange={(e) => handleChange(e, q.id)}
                  required
                />
                {option}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
          Submit
        </button>
      </form>
    );
  };
  

  export default Questionnaire;