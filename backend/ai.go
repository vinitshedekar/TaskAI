package main

import (
	"context"
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/sashabaranov/go-openai"
)

type TaskSuggestionInput struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

type TaskSuggestion struct {
	Title       string `json:"title"`
	Description string `json:"description"`
	Priority    string `json:"priority"`
	DueDate     string `json:"dueDate"`
	Steps       []Step `json:"steps"`
}

type Step struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}

func GetTaskSuggestions(c *fiber.Ctx) error {
	input := new(TaskSuggestionInput)
	if err := c.BodyParser(input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid input",
		})
	}

	client := openai.NewClient(os.Getenv("OPENAI_API_KEY"))
	prompt := fmt.Sprintf(`Given this task:
Title: %s
Description: %s

Provide a detailed breakdown of this task including:
1. Suggested priority level (high/medium/low)
2. Recommended due date (in YYYY-MM-DD format)
3. A list of 3-5 concrete steps to complete this task

Format the response in JSON:
{
  "priority": "...",
  "dueDate": "...",
  "steps": [
    {
      "title": "...",
      "description": "..."
    }
  ]
}`, input.Title, input.Description)

	resp, err := client.CreateChatCompletion(
		context.Background(),
		openai.ChatCompletionRequest{
			Model: openai.GPT4,
			Messages: []openai.ChatCompletionMessage{
				{
					Role:    openai.ChatMessageRoleUser,
					Content: prompt,
				},
			},
		},
	)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to get AI suggestions",
		})
	}

	return c.JSON(fiber.Map{
		"suggestions": resp.Choices[0].Message.Content,
	})
}