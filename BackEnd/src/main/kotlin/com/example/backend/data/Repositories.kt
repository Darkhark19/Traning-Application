package com.example.backend.data

import org.springframework.data.repository.CrudRepository

interface UserRepository: CrudRepository<UserDAO,Long> {


}

interface CourseRepository: CrudRepository<CourseDAO,Long> {

}

interface ModuleRepository: CrudRepository<ModuleDAO, Long> {

}

interface SessionRepository: CrudRepository<SessionDAO,Long> {

}
interface  ProjectRepository: CrudRepository<ProjectDAO,Long>{

}