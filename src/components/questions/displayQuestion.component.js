import React, {useState} from "react";

export default function DisplayQuestion({ aQuestion, answer, correct}) {
    const [message, setMessage] = useState();
    const [answered, setAnswered] = useState(false);
    const [selected, setSelected] = useState();
    
    function checkAnswer(answer, correctAns) {
        setSelected(answer);
        if(answer === correctAns) {
            setMessage("Correct answer")
        }else {
            setMessage("Incorrect answer")
        }
        setAnswered(true);
    }
    return(
        <div>
      {aQuestion}
      {answer.map((text, _id) => (
        <div key={_id}>
          {console.log(text === correct)}
          <div className="container mt-2">
            <button
              disabled={answered}
              className={
                "btn btn-outline-primary " +
                (correct === selected && answered && selected === text
                  ? "btn-outline-success"
                  : "") +
                (selected !== correct && text === selected && answered
                  ? "btn-outline-danger"
                  : "")
              }
              onClick={() => {
                checkAnswer(text, correct);
              }}
            >
              {text}
            </button>
          </div>
        </div>
      ))}
      <p>{message}</p>
    </div>
    )
}