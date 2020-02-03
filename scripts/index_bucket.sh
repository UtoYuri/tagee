# !/usr/bash

if [[ $1 == "-f" ]]
then
    rm ./database.sqlite
fi
go run cmd/index.go
