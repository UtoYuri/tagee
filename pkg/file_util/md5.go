package file_util

import (
	"crypto/md5"
	"encoding/hex"
	"io"
	"os"
)

func FileSum(file *os.File) (string, error) {
	var returnMD5String string
	hash := md5.New()
	if _, err := io.Copy(hash, file); err != nil {
		return returnMD5String, err
	}
	hashInBytes := hash.Sum(nil)[:16]
	returnMD5String = hex.EncodeToString(hashInBytes)
	return returnMD5String, nil

}
