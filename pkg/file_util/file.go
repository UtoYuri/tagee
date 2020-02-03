package file_util

import (
	"os"
	"path/filepath"
	"strings"
)

const (
	FileUnknown = 0
	FileImage   = 1
	FileVoice   = 2
	FileVideo   = 3
)

var kindMap = func() map[string]int {
	originKind := map[int][]string{
		FileImage: {"jpg", "jpeg", "png", "ico", "svg"},
		FileVoice: {"mp3"},
		FileVideo: {"mp4"},
	}

	kind := make(map[string]int)
	for fileKind, suffixs := range originKind {
		for _, suffix := range suffixs {
			kind[suffix] = fileKind
		}
	}
	return kind
}()

func ParseFileSuffix(fileName string) string {
	s := strings.Split(fileName, ".")
	length := len(s)

	if length == 1 {
		return ""
	}
	if length == 2 {
		return s[1]
	}
	return s[length-1]
}

func ParseFileKind(suffix string) int {
	if kind, ok := kindMap[strings.ToLower(suffix)]; ok {
		return kind
	}
	return FileUnknown
}

func ParseFileFormat(fileName string) (int, string) {
	suffix := ParseFileSuffix(fileName)
	kind := ParseFileKind(suffix)
	return kind, suffix
}

func GetAbsPathname(file *os.File) (string, error) {
	var absPathname string

	absPathname, err := filepath.Abs(filepath.Dir(file.Name()))
	if err != nil {
		return absPathname, err
	}

	return absPathname, nil
}
