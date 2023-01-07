package com.example.backend.presentation

data class CourseCreateDTO(
    val title :String,
    val subject: String,
    val owner: String
)

data class CourseDTO(
    val title: String,
    val subject: String,
    val owner:String,
    val id: Long,

)