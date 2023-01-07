package com.example.backend.data

import com.fasterxml.jackson.annotation.JsonSubTypes
import jakarta.persistence.*
import org.hibernate.annotations.CreationTimestamp
import org.hibernate.annotations.DialectOverride.ColumnDefault
import org.hibernate.annotations.UpdateTimestamp
import java.sql.Timestamp


@Entity
@Inheritance(strategy = InheritanceType.JOINED)
open class UserDAO(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Long,
    @Column(unique = true) open val email: String,
    open val username: String,
    open val password: String,
    open val name: String
)

@Entity
data class StudentDAO(
    override val email: String,
    override val username: String,
    override val password: String,
    override val name: String,
    val _class: String,
    @ManyToMany(mappedBy = "students",fetch= FetchType.EAGER) val courses: List<CourseDAO>,
    @OneToMany(mappedBy = "students",fetch= FetchType.EAGER) val sessions: List<SessionDAO>
) : UserDAO(0,email,username,password,name)

@Entity
data class ProfessorDAO(
    override val email: String,
    override val username: String,
    override val password: String,
    override val name: String,
    @OneToMany(mappedBy = "owner",fetch= FetchType.EAGER) val courses: List<CourseDAO>,
    @OneToMany(mappedBy = "coordinator",fetch= FetchType.EAGER) val sessions: List<SessionDAO>,
    @OneToMany(mappedBy = "owner",fetch= FetchType.EAGER) val projects: Set<ProjectDAO>,
) : UserDAO(0,email, username, password,name)

data class CourseDAO(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Long,
    val name:String,
    val subject:String,
    @ManyToOne val owner: UserDAO,
    @ManyToMany(fetch= FetchType.EAGER) val students: Set<StudentDAO>,
    @OneToMany(mappedBy = "course",fetch= FetchType.EAGER) val modules: Set<ModuleDAO>
)

data class ModuleDAO(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Long,
    val content:String,
    @ManyToOne val course:CourseDAO,
    @OneToMany(mappedBy = "module",fetch= FetchType.EAGER) val sessions: List<SessionDAO>
)

data class SessionDAO(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Long,
    @CreationTimestamp val created_at:Timestamp,
    @UpdateTimestamp val ended_at: Timestamp,
    @ManyToOne val coordinator:  UserDAO,
    @ManyToOne val student: StudentDAO,

    @ManyToOne val module : ModuleDAO,
    @ManyToOne val project: ProjectDAO?
)

data class ProjectDAO(
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) val id: Long,
    val title: String,
    val closed: Boolean = false,
    val content: String,
    @CreationTimestamp val created_at:Timestamp,
    @UpdateTimestamp val ended_at: Timestamp,
    @ManyToOne val owner:UserDAO,
    @OneToMany(mappedBy = "project",fetch= FetchType.EAGER) val sessions: List<SessionDAO>

)