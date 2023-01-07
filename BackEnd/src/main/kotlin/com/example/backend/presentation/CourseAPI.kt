package com.example.backend.presentation

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping


@RequestMapping("/courses")
interface CourseAPI {

    @PostMapping("")
    fun createCourse(@RequestBody course: CourseCreateDTO): CourseDTO

    @GetMapping("")
    fun getAllCourses():
}