package util

import (
	"errors"
	"os"
	"path/filepath"
)

// PathExists 判断路径是否存在于文件系统上
func PathExists(path string) bool {
	_, err := os.Stat(path)
	return !errors.Is(err, os.ErrNotExist)
}

// ReplaceExt 替换后缀名
func ReplaceExt(path string, ext string) string {
	r := len(path) - len(filepath.Ext(path))
	return path[0:r] + ext
}
