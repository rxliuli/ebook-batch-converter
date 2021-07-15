package util

import (
	"github.com/gobwas/glob"
	"github.com/gookit/color"
	i18nUtil "github.com/rxliuli/ebook-batch-converter/i18n"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

func convert(input string, output string) error {
	_, err := exec.Command("ebook-convert", input, output).Output()
	if err != nil {
		return err
	}
	return nil
}

func globFiles(dir string, pattern string) []string {
	var files []string
	g := glob.MustCompile(pattern)
	_ = filepath.Walk(dir, func(path string, f os.FileInfo, err error) error {
		match := g.Match(strings.ReplaceAll(path, "\\", "/"))
		if match {
			files = append(files, path)
		}
		return nil
	})
	return files
}

func BatchConvert(inputDir string, outputDir string) {
	list := globFiles(inputDir, "**/*.{epub,pdf,txt}")
	for _, path := range list {
		rel, err := filepath.Rel(inputDir, path)
		if err != nil {
			continue
		}
		dest := ReplaceExt(filepath.Join(outputDir, rel), ".azw3")
		if PathExists(dest) {
			color.Blueln(i18nUtil.T("msg.skip"), rel)
			continue
		}
		_ = os.MkdirAll(filepath.Dir(dest), 0700)
		err = convert(path, dest)
		if err != nil {
			color.Redln(i18nUtil.T("msg.error"), rel)
			continue
		}
		color.Greenln(i18nUtil.T("msg.success"), rel)
	}
}
