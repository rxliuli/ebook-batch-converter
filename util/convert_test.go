package util

import (
	"github.com/gobwas/glob"
	"path"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
)

func TestFilepathGlob(t *testing.T) {
	glob, err := filepath.Glob("./*.go")
	if err != nil {
		return
	}
	for i, s := range glob {
		println(i, s)
	}
}

func dirname() string {
	_, filename, _, _ := runtime.Caller(0)
	return path.Dir(filename)
}

func TestDirname(t *testing.T) {
	println("dirname: ", dirname())
}

func TestConvert(t *testing.T) {
	_ = convert(filepath.Join(dirname(), "temp/前端架构设计.epub"), filepath.Join(dirname(), "temp/前端架构设计.azw3"))
}

func fileMatch(pattern string, path string) bool {
	match, err := filepath.Match(pattern, path)
	if err != nil {
		return false
	}
	return match
}

func TestGlobPkg(t *testing.T) {
	pattern := "**/*.{epub,pdf,txt}"
	println("match1: ", glob.MustCompile(pattern).Match("util/temp/前端架构设计.epub"))
	println("match2: ", glob.MustCompile(pattern).Match("input/网络小说/《事象的宏图》[sxdht.icoc.in专属网版本].epub"))
	println("match3: ", glob.MustCompile(pattern).Match("input\\网络小说\\《事象的宏图》[sxdht.icoc.in专属网版本].epub"))
	println("match4: ", fileMatch(pattern, "input\\网络小说\\《事象的宏图》[sxdht.icoc.in专属网版本].epub"))
	//match, err := filepath.Match("**/*.{epub}", "C:\\Users\\rxliuli\\Code\\golang\\demo\\ebook-batch-converter\\util\\temp\\input\\网络小说\\《事象的宏图》[sxdht.icoc.in专属网版本].epub")
	//if err != nil {
	//	return
	//}
	//println("match2: ", match)
}

func TestGlobFiles(t *testing.T) {
	files := globFiles(dirname(), "*.go")
	println(strings.Join(files, "\n"))
}

func TestBatchConvert(t *testing.T) {
	BatchConvert(filepath.Join(dirname(), "temp/input"), filepath.Join(dirname(), "temp/output"))
}
