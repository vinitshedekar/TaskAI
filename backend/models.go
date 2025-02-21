package main

import (
	"time"

	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string `json:"name"`
	Email    string `json:"email" gorm:"unique"`
	Password string `json:"-"` // Password will not be included in JSON responses
	Tasks    []Task `json:"tasks"`
}

type Task struct {
	gorm.Model
	Title       string    `json:"title"`
	Description string    `json:"description"`
	DueDate     time.Time `json:"dueDate"`
	Status      string    `json:"status"`
	Priority    string    `json:"priority"`
	UserID      uint      `json:"userId"`
	User        User      `json:"-"`
}