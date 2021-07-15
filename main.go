package main

import (
	"github.com/rxliuli/ebook-batch-converter/util"
	"github.com/urfave/cli/v2"
	"os"
)

func main() {
	var input string
	var output string
	app := &cli.App{
		Name:  "ebook-batch-converter",
		Usage: "使用 ebook-converter 批量转换 epub 等文件为 azw3",
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:        "input",
				Aliases:     []string{"i"},
				Value:       "",
				Usage:       "输入目录",
				Required:    true,
				Destination: &input,
			},
			&cli.StringFlag{
				Name:        "output",
				Aliases:     []string{"o"},
				Value:       "",
				Usage:       "输出目录",
				Required:    true,
				Destination: &output,
			},
		},
		Action: func(context *cli.Context) error {
			util.BatchConvert(input, output)
			return nil
		},
	}

	app.Run(os.Args)
}
