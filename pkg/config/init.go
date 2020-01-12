package config

import (
	"github.com/joho/godotenv"
	"tagee/internal/models"
	"tagee/pkg/database"
	"tagee/web/utils"
	"os"
)

func Init() error {
	if err := godotenv.Load(); err != nil {
		return err
	}

	dbDialect := utils.ValidOrDefault(os.Getenv("DB_DIALECT"), "sqlite3")
	dbUrl := utils.ValidOrDefault(os.Getenv("DB_URL"), "./database.sqlite")

	// connect db
	if err := database.Init(&database.Config{ Dialect: dbDialect.(string), Url: dbUrl.(string) }); err != nil {
		return err
	}

	// migrate db
	models.AutoMigrate()

	return nil
}
