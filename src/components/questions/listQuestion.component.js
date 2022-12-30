import React, { useEffect, useState} from "react";
import QuestionService from "../../services/question.service";
import GetQuestion from "./getQuestionLesson.component";
import NavAdmin from "../nav-bar/NavAdmin"
import Question from "./Question.component";

export default function ListQuestion({id}) {

    const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        getQuestion();
    }, [])

    function getQuestion() {
        QuestionService.getAllQuestionCourse(id)
        .then((respone) => {
            setQuestions(respone.data.Question);
            console.log(respone.data.Question);
        }) 
        .catch((e)=>{
            console.log(e);
        })
        console.log(id)
    }

    function computeScore() {
        setScore(score + 1);
    }

    return(
        <div>
      <NavAdmin/>
      {questions.map(({ aQuestion, answers, correct, _id }) => (
        <Question
          computeScore={computeScore}
          aQuestion={aQuestion}
          answers={answers}
          correct={correct}
          key={_id}
        />
      ))}
      <p>{score}</p>
    </div>
    )
}
