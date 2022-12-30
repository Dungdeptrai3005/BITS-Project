import { set } from "mongoose";
import React, { useState } from "react";
import QuestionService from "../../services/question.service";
import NavAdmin from "../nav-bar/NavAdmin"

export default function CreateQuestion({ id }) {
    
    const [aQuestion, setAQuestion] = useState("");
    const [description, setDescription] = useState("");
    const [answers, setAnswers] = useState([""]);
    const [correct, setCorrect] = useState("");
    const [success, setSuccess] = useState(false)
    
    function addAnswer() {
        setAnswers([...answers, ""])
    }

    function removeAnswer() {
        setAnswers((previousAns) => (previousAns.slice(0, -1)))
    }

    function saveQuestion() {
        var data = {
            aQuestion,
            description,
            answers: [...answers, correct],
            correct
        }
        QuestionService.createQuestion(data, id)
        .then((respone)=> {
            setSuccess(true)
            console.log(respone.data)
        })
        .catch((e)=> {
            console.log(e)
        })
    }

    function onChangeAQuestion(e) {
        setAQuestion(e.target.value);
    }

    function onChangeDescription(e) {
        setDescription(e.target.value);
    }

    function onChangeCorrect(e) {
        setCorrect(e.target.value);
    }

    return (
        <div>
      <NavAdmin />
      <div className="container pt-4 pb-4">
        <div className="container border rounded pt-4 pb-4">
          <p>Writing a question</p>
          <input
            className="form-control"
            onChange={onChangeAQuestion}
            value={aQuestion}
          />
          <p>Writing a description of question</p>
          <input
            className="form-control"
            onChange={onChangeDescription}
            value={description}
          />
          <p>Writing wrong answers</p>
          <div className="vstack gap-3">
            {answers.map((text, index) => {
              return (
                <input
                  className="form-control"
                  value={answers[index]}
                  key={index}
                  onChange={(e) => {
                    answers[index] = e.target.value;
                    setAnswers([...answers]);
                  }}
                />
              );
            })}
          </div>
          <button className="btn btn-outline-primary mt-2" onClick={addAnswer}>
            Add answer
          </button>
          <button className="btn btn-outline-danger mt-2" onClick={removeAnswer}>
            Remove answer
          </button>
          <p>Writing a correct question</p>
          <input
            className="form-control"
            value={correct}
            onChange={onChangeCorrect}
          />

          <button className="btn btn-success mt-2" onClick={saveQuestion}>
            Submit
          </button>
        </div>
      </div>
    </div>
    )
}