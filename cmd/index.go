package main

import (
	"fmt"
	"os"
	"path/filepath"
	"tagee/internal/models"
	"tagee/pkg/config"
	"tagee/pkg/file_util"
)

type Files map[string]os.FileInfo

func traversalFolder(folder string) (Files, error) {
	var files = make(Files)
	err := filepath.Walk(folder, func(pathname string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if info.IsDir() {
			return nil
		}

		files[pathname] = info
		return nil
	})
	return files, err
}

func createMedia(fileInfo os.FileInfo, pathname string) error {
	kind, suffix := file_util.ParseFileFormat(fileInfo.Name())
	file, err := os.Open(pathname)
	if err != nil {
		return fmt.Errorf("Create media<%s> failed while opening file, error is %v\n", pathname, err)
	}

	defer file.Close()

	md5, err := file_util.FileSum(file)
	if err != nil {
		return fmt.Errorf("Create media<%s> failed while calcuating sum, error is %v\n", pathname, err)
	}

	absPathname, err := file_util.GetAbsPathname(file)

	media := &models.Media{
		Title:                  fileInfo.Name(),
		Kind:                   kind,
		Suffix:                 suffix,
		Size:                   uint64(fileInfo.Size()),
		Url:                    absPathname, // TODO: change to the path which relative to LOCAL_RESOURCE_DIR
		LastModifiedAt:         fileInfo.ModTime(),
		OriginRelativePathname: absPathname,
		CustomRelativePathname: absPathname,
		MD5:                    md5,
	}

	err = models.CreateMedia(media)
	if err != nil {
		return fmt.Errorf("Create media<%s> failed while insert db, error is %v\n", pathname, err)
	}

	return nil
}

func main() {
	if err := config.Init(); err != nil {
		fmt.Println("Init failed,", err)
		return
	}

	localResourceDir := os.Getenv("LOCAL_RESOURCE_DIR")
	if localResourceDir == "" {
		fmt.Println("LOCAL_RESOURCE_DIR not provided")
		return
	}

	files, err := traversalFolder(localResourceDir)
	if err != nil {
		fmt.Println("Index failed,", err)
		return
	}

	for pathname := range files {
		err := createMedia(files[pathname], pathname)

		if err != nil {
			fmt.Println(err.Error())
		} else {
			fmt.Printf("Index media success, <%s>\n", pathname)
		}
	}
}
