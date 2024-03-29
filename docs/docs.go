// GENERATED BY THE COMMAND ABOVE; DO NOT EDIT
// This file was generated by swaggo/swag at
// 2020-02-03 22:54:31.786649 +0800 +08 m=+0.760532082

package docs

import (
	"bytes"
	"encoding/json"
	"strings"

	"github.com/alecthomas/template"
	"github.com/swaggo/swag"
)

var doc = `{
    "schemes": {{ marshal .Schemes }},
    "swagger": "2.0",
    "info": {
        "description": "{{.Description}}",
        "title": "{{.Title}}",
        "contact": {
            "name": "yuri",
            "url": "https://utohub.com",
            "email": "yuri@utohub.com"
        },
        "license": {
            "name": "Apache 2.0",
            "url": "http://www.apache.org/licenses/LICENSE-2.0.html"
        },
        "version": "{{.Version}}"
    },
    "host": "{{.Host}}",
    "basePath": "{{.BasePath}}",
    "paths": {
        "/media": {
            "get": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "Media"
                ],
                "summary": "Get bulk media",
                "responses": {
                    "200": {
                        "description": "Media infos",
                        "schema": {
                            "type": "array",
                            "items": {
                                "$ref": "#/definitions/models.MediaReadonly"
                            }
                        }
                    },
                    "400": {
                        "description": "Wrong params",
                        "schema": {
                            "$ref": "#/definitions/handlers.FailedResponse"
                        }
                    },
                    "500": {
                        "description": "Other",
                        "schema": {
                            "$ref": "#/definitions/handlers.FailedResponse"
                        }
                    }
                }
            },
            "post": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "Media"
                ],
                "summary": "Create media",
                "parameters": [
                    {
                        "description": "Media info",
                        "name": "media",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/handlers.CreateParams"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Media info",
                        "schema": {
                            "$ref": "#/definitions/models.MediaReadonly"
                        }
                    },
                    "400": {
                        "description": "Wrong params",
                        "schema": {
                            "$ref": "#/definitions/handlers.FailedResponse"
                        }
                    },
                    "500": {
                        "description": "Other",
                        "schema": {
                            "$ref": "#/definitions/handlers.FailedResponse"
                        }
                    }
                }
            }
        },
        "/media/{id}": {
            "get": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "Media"
                ],
                "summary": "Get media by id",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Media ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Media info",
                        "schema": {
                            "$ref": "#/definitions/models.MediaReadonly"
                        }
                    },
                    "400": {
                        "description": "Wrong params",
                        "schema": {
                            "$ref": "#/definitions/handlers.FailedResponse"
                        }
                    },
                    "404": {
                        "description": "Record not found",
                        "schema": {
                            "$ref": "#/definitions/handlers.FailedResponse"
                        }
                    },
                    "500": {
                        "description": "Other",
                        "schema": {
                            "$ref": "#/definitions/handlers.FailedResponse"
                        }
                    }
                }
            },
            "put": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "Media"
                ],
                "summary": "Update media",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Media ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "Media info",
                        "name": "media",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/handlers.UpdateParams"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Media info",
                        "schema": {
                            "$ref": "#/definitions/models.MediaReadonly"
                        }
                    },
                    "400": {
                        "description": "Wrong params",
                        "schema": {
                            "$ref": "#/definitions/handlers.FailedResponse"
                        }
                    },
                    "500": {
                        "description": "Other",
                        "schema": {
                            "$ref": "#/definitions/handlers.FailedResponse"
                        }
                    }
                }
            },
            "patch": {
                "consumes": [
                    "application/json"
                ],
                "tags": [
                    "Media"
                ],
                "summary": "Patch media",
                "parameters": [
                    {
                        "type": "integer",
                        "description": "Media ID",
                        "name": "id",
                        "in": "path",
                        "required": true
                    },
                    {
                        "description": "Media info",
                        "name": "media",
                        "in": "body",
                        "required": true,
                        "schema": {
                            "$ref": "#/definitions/handlers.PatchParams"
                        }
                    }
                ],
                "responses": {
                    "200": {
                        "description": "Media info",
                        "schema": {
                            "$ref": "#/definitions/models.MediaReadonly"
                        }
                    },
                    "400": {
                        "description": "Wrong params",
                        "schema": {
                            "$ref": "#/definitions/handlers.FailedResponse"
                        }
                    },
                    "500": {
                        "description": "Other",
                        "schema": {
                            "$ref": "#/definitions/handlers.FailedResponse"
                        }
                    }
                }
            }
        }
    },
    "definitions": {
        "handlers.CreateParams": {
            "type": "object",
            "required": [
                "md5",
                "title",
                "url"
            ],
            "properties": {
                "customRelativePathname": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "kind": {
                    "type": "integer"
                },
                "lastModifiedAt": {
                    "type": "integer"
                },
                "md5": {
                    "type": "string"
                },
                "originRelativePathname": {
                    "type": "string"
                },
                "size": {
                    "type": "integer"
                },
                "suffix": {
                    "type": "string"
                },
                "thumbnailUrl": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                },
                "url": {
                    "type": "string"
                }
            }
        },
        "handlers.FailedResponse": {
            "type": "object",
            "properties": {
                "err_code": {
                    "type": "integer"
                },
                "err_msg": {
                    "type": "string"
                }
            }
        },
        "handlers.PatchParams": {
            "type": "object",
            "properties": {
                "customRelativePathname": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "kind": {
                    "type": "integer"
                },
                "lastModifiedAt": {
                    "type": "integer"
                },
                "md5": {
                    "type": "string"
                },
                "originRelativePathname": {
                    "type": "string"
                },
                "size": {
                    "type": "integer"
                },
                "suffix": {
                    "type": "string"
                },
                "thumbnailUrl": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                },
                "url": {
                    "type": "string"
                }
            }
        },
        "handlers.UpdateParams": {
            "type": "object",
            "properties": {
                "customRelativePathname": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "kind": {
                    "type": "integer"
                },
                "lastModifiedAt": {
                    "type": "integer"
                },
                "md5": {
                    "type": "string"
                },
                "originRelativePathname": {
                    "type": "string"
                },
                "size": {
                    "type": "integer"
                },
                "suffix": {
                    "type": "string"
                },
                "thumbnailUrl": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                },
                "url": {
                    "type": "string"
                }
            }
        },
        "models.MediaReadonly": {
            "type": "object",
            "properties": {
                "createdAt": {
                    "type": "integer"
                },
                "customRelativePathname": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "id": {
                    "type": "integer"
                },
                "kind": {
                    "type": "integer"
                },
                "lastModifiedAt": {
                    "type": "integer"
                },
                "md5": {
                    "type": "string"
                },
                "originRelativePathname": {
                    "type": "string"
                },
                "size": {
                    "type": "integer"
                },
                "status": {
                    "type": "integer"
                },
                "suffix": {
                    "type": "string"
                },
                "thumbnailUrl": {
                    "type": "string"
                },
                "title": {
                    "type": "string"
                },
                "updatedAt": {
                    "type": "integer"
                },
                "url": {
                    "type": "string"
                }
            }
        }
    }
}`

type swaggerInfo struct {
	Version     string
	Host        string
	BasePath    string
	Schemes     []string
	Title       string
	Description string
}

// SwaggerInfo holds exported Swagger Info so clients can modify it
var SwaggerInfo = swaggerInfo{
	Version:     "1.0",
	Host:        "",
	BasePath:    "",
	Schemes:     []string{},
	Title:       "Gin swagger",
	Description: "Learning Go",
}

type s struct{}

func (s *s) ReadDoc() string {
	sInfo := SwaggerInfo
	sInfo.Description = strings.Replace(sInfo.Description, "\n", "\\n", -1)

	t, err := template.New("swagger_info").Funcs(template.FuncMap{
		"marshal": func(v interface{}) string {
			a, _ := json.Marshal(v)
			return string(a)
		},
	}).Parse(doc)
	if err != nil {
		return doc
	}

	var tpl bytes.Buffer
	if err := t.Execute(&tpl, sInfo); err != nil {
		return doc
	}

	return tpl.String()
}

func init() {
	swag.Register(swag.Name, &s{})
}
