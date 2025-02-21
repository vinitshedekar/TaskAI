package main

import (
	"github.com/gofiber/fiber/v2"
)

func GetTasks(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(uint)
	var tasks []Task
	
	if err := db.Where("user_id = ?", userID).Find(&tasks).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Could not fetch tasks",
		})
	}

	return c.JSON(tasks)
}

func CreateTask(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(uint)
	task := new(Task)
	
	if err := c.BodyParser(task); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid input",
		})
	}

	task.UserID = userID

	if err := db.Create(&task).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Could not create task",
		})
	}

	return c.JSON(task)
}

func UpdateTask(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(uint)
	taskID := c.Params("id")
	
	var task Task
	if err := db.Where("id = ? AND user_id = ?", taskID, userID).First(&task).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Task not found",
		})
	}

	if err := c.BodyParser(&task); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid input",
		})
	}

	db.Save(&task)
	return c.JSON(task)
}

func DeleteTask(c *fiber.Ctx) error {
	userID := c.Locals("user_id").(uint)
	taskID := c.Params("id")
	
	var task Task
	if err := db.Where("id = ? AND user_id = ?", taskID, userID).First(&task).Error; err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"error": "Task not found",
		})
	}

	db.Delete(&task)
	return c.SendStatus(fiber.StatusNoContent)
}