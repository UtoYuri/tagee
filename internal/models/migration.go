package models

import (
	"tagee/pkg/database"
)

func init() {
	database.DB.AutoMigrate(&Media{})
}