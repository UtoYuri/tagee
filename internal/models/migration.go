package models

import (
	"tagee/pkg/database"
)

func AutoMigrate() {
	database.DB.AutoMigrate(&Media{})
}