import React, {useState, useEffect} from "react";
import LessonService from "../../services/lesson.service";
import { useParams } from "react-router-dom";
import GetQuestion from "../questions/getQuestionLesson.component";

export default function ShowLesson(){
    const [lesson, setLesson] = useState([]);
    const { id } = useParams();

    useEffect(()=>{
        getLesson();
    }, [])

    function getLesson(){
        LessonService.getAllLessonCourse(id)
        .then((respone)=> {
            setLesson(respone.data.Lesson);
            console.log(respone.data.Lesson)
        })
        .catch((e)=> {
            console.log(e)
        })
    }
    return (
        <div className="container pt-4 pb-4">
      <h3>Lessons</h3>
      <div className="accordion">
      {lesson.map((text, index) => (
        <div key={index}  className="accordion-item" id="accordionExample">
          
            <h2 className="accordion-header" id="heading">
              <button
                className="accordion-button collapsed"
                style={{backgroundColor: "#4DD4AC"}}
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={"#collapse" + index}
                aria-expanded="false"
                aria-controls={"collapse" + index}
              >
                {index+1 + ". " + text.titleLesson}
              </button>
            </h2>
            <div
              id={"collapse" + index}  
              className="accordion-collapse collapse"
              aria-labelledby="heading"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <p>{text.descriptionLesson}</p>
                <span>
                  <GetQuestion id={text._id} />
                </span>
              </div>
            </div>
          </div>
       
      ))}
      </div>
    </div>
    )
}



