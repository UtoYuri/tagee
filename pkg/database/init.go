package database

import (
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/sqlite"
	"tagee/pkg/config"
)

type Config struct {
	Dialect string
	Url string
}

var DB *gorm.DB

func init() {
	dbDialect := config.Get("DB_DIALECT", "sqlite3")
	dbUrl := config.Get("DB_URL", "./database.sqlite")

	db, err := gorm.Open(dbDialect, dbUrl)
	if err != nil {
		panic(err)
	}

	DB = db
}
