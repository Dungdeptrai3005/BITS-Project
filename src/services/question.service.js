import axios from "axios"

const API_URL = "http://localhost:5000/api/"

class QuestionService {
    createQuestion( data, courseId) {
        return axios.post(API_URL + `question?courseId=${courseId}`, data)
    }

    getAllQuestion(){
        return axios.get(API_URL + "question")
    }

    getAllQuestionLesson(lessonId){
        return axios.get(API_URL + `lesson/${lessonId}/question`)
    }

    getAllQuestionCourse(courseId){
        return axios.get(API_URL + `course/${courseId}/question`)
    }
}

export default new QuestionService();