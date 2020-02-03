package main

import (
	"fmt"
	"os"
	"path/filepath"
	"tagee/internal/models"
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

func buildMedia(fileInfo os.FileInfo, pathname string) (*models.Media, error) {
	kind, suffix := file_util.ParseFileFormat(fileInfo.Name())

	if kind == file_util.FileUnknown {
		return nil, fmt.Errorf("Ignore unknown media<%s>\n", pathname)
	}

	file, err := os.Open(pathname)
	if err != nil {
		return nil, fmt.Errorf("Create media<%s> failed while opening file, error is %v\n", pathname, err)
	}

	defer file.Close()

	md5, err := file_util.FileSum(file)
	if err != nil {
		return nil, fmt.Errorf("Create media<%s> failed while calcuating sum, error is %v\n", pathname, err)
	}

	absPathname, err := file_util.GetAbsPathname(file)

	media := &models.Media{
		Title:                  fileInfo.Name(),
		Kind:                   kind,
		Suffix:                 suffix,
		Size:                   uint64(fileInfo.Size()),
		Url:                    pathname,
		ThumbnailUrl:           pathname,
		LastModifiedAt:         fileInfo.ModTime(),
		OriginRelativePathname: absPathname,
		CustomRelativePathname: absPathname,
		MD5:                    md5,
	}

	return media, nil
}

func main() {
	files, err := traversalFolder("./bucket")
	if err != nil {
		fmt.Println("Index failed,", err)
		return
	}

	for pathname := range files {
		media, err := buildMedia(files[pathname], pathname)
		if err != nil {
			fmt.Print(err)
			continue
		}

		isExist, existMedia := models.IsMediaExist(media.MD5)

		if isExist {
			existMedia.Kind = media.Kind
			existMedia.Suffix = media.Suffix
			existMedia.Url = media.Url
			existMedia.ThumbnailUrl = media.ThumbnailUrl
			existMedia.OriginRelativePathname = media.OriginRelativePathname
			existMedia.CustomRelativePathname = media.CustomRelativePathname

			err = existMedia.Update()

			if err != nil {
				fmt.Printf("Update media<%s> failed while insert db, error is %v\n", pathname, err)
				continue
			}

			fmt.Printf("[UPDATE] Index media success, <%s>\n", pathname)
		} else {
			err = models.CreateMedia(media)
			if err != nil {
				fmt.Printf("Create media<%s> failed while insert db, error is %v\n", pathname, err)
				continue
			}

			fmt.Printf("[CREATE] Index media success, <%s>\n", pathname)
		}
	}
}
