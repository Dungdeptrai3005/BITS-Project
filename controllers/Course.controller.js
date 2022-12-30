const Course = require("../models/Courses.model");
const mongoose = require("mongoose");


// 1. Create courses
exports.createCourse = (req, res) => {
  const course = new Course({
    title: req.body.title,
    description: req.body.description,
  });
  course
    .save()
    .then((newCourse) => {
      return res.status(201).json({
        success: true,
        message: "New course created successfully",
        Course: newCourse,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: error.message,
      });
    });
};

// 2. Get access to courses
exports.getCourses = (req, res) => {
  Course.aggregate([
    {
      $lookup: {
        from: "questions",
        localField: "questions",
        foreignField: "_id",
        as: "questions",
      },
    },
    {
      $lookup: {
        from: "lessons",
        localField: "lessons",
        foreignField: "_id",
        as: "lessons",
      },
    },
  ])
    .then((allCourses) => {
      return res.status(200).json({
        success: true,
        message: "List all courses",
        Course: allCourses,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error. Please try again.",
        error: err.message,
      });
    });
};

// 3. Get access to a specific course
exports.getACourse = (req, res) => {
  const id = req.params.courseId;
  // Course.findById(id);
  Course.aggregate([
    {
      $lookup: {
        from: "questions",
        localField: "questions",
        foreignField: "_id",
        as: "questions",
      },
    },
    {
      $lookup: {
        from: "lessons",
        localField: "lessons",
        foreignField: "_id",
        as: "lessons",
      },
    },
    {
      $match: {
        _id: mongoose.Types.ObjectId(id),
      },
    },
  ])
    .then((aCourse) => {
      res.status(200).json({
        success: true,
        message: `More on ${aCourse.title}`,
        Course: aCourse[0] || null,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This course does not exist",
        error: err.message,
      });
    });
};

// 4. Update course
exports.updateCourse = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.courseId;
  const updateObject = req.body;
  Course.findByIdAndUpdate(id, updateObject, { useFindAndModify: false })
    .then((newCourse) => {
      res.status(200).json({
        success: true,
        message: "This course was updated successfully",
        updateCourse: updateObject,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "This course does not exist",
        error: err.message,
      });
    });
};

// 5. Delete course
exports.deleteCourse = (req, res) => {
  const id = req.params.courseId;
  Course.findByIdAndRemove(id)
    .exec()
    .then(() =>
      res.status(204).json({
        success: true,
      })
    )
    .catch((err) =>
      res.status(500).json({
        success: false,
      })
    );
};
