package config

import (
	"github.com/joho/godotenv"
	"os"
)

func Get(name, defaultValue string) string {
	value := os.Getenv(name)

	if value == "" {
		return defaultValue
	}

	return value
}

func init() {
	if err := godotenv.Load(); err != nil {
		panic(err)
	}
}
