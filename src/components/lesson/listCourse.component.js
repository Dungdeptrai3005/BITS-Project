import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CourseService from "../../services/course.service";
import NavAdmin from "../nav-bar/NavAdmin"
import CreateLesson from "./createLesson.component";

export default function ListCourse() {
    const [course, setCourse] = useState([]);
    const [selected, setSelected] = useState(false)
    const {id} = useParams();
    useEffect(() => {
        getCourse();
    }, [])

    function getCourse(){
        CourseService.getAllCourse()
        .then((respone)=> {
            setCourse(respone.data.Course);
            console.log(respone.data.Course)
        })
        .catch((e)=> {
            console.log(e)
        })
    }

    const handleClick = (event) => {
        setSelected(true)
    }
    return(
        <div>
      <NavAdmin/>
      {course.map((course, index) => (
        <div key={index}>
          <button onClick={handleClick}>{course.title}</button>
          {selected && (
            <div>
              <h3>Create the lesson</h3>
            </div>
          )}
          {selected && <CreateLesson />}
        </div>
      ))}
    </div>
    )
}