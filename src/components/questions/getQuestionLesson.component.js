import React, {useState, useEffect} from "react";
import QuestionService from "../../services/question.service"
import DisplayQuestion from "./displayQuestion.component";

export default function GetQuestion({id}) {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getQuestionLesson()
    }, [])

    function getQuestionLesson(){
        QuestionService.getAllQuestionLesson(id)
        .then((respone)=>{
            setQuestions(respone.data.Question)
        })
        .catch((e)=>{
            console.log(e)
        })
    }

    return(
        <div>
        {questions.map(({ aQuestion, answers, correct, _id }) => (
            <DisplayQuestion
            key={_id}
            aQuestion={aQuestion}
            answers={answers}
            correct={correct}
        />
      ))}
    </div>
    )
}

 