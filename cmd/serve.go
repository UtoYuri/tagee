package main

import (
	"fmt"
	"strconv"
	_ "tagee/docs"
	"tagee/pkg/config"
	"tagee/web"
)

// @title Gin swagger
// @version 1.0
// @description Learning Go

// @contact.name yuri
// @contact.url https://utohub.com
// @contact.email yuri@utohub.com

// @license.name Apache 2.0
// @license.url http://www.apache.org/licenses/LICENSE-2.0.html
func main() {
	var port int64
	port, err := strconv.ParseInt(config.Get("PORT", "80"), 10, 64)
	if err != nil {
		port = 8000
	}

	server := &web.Server{
		Config: &web.Config{
			Port: int(port),
		},
	}
	if err := server.Run(); err != nil {
		fmt.Println("Run server failed,", err)
	}
}
