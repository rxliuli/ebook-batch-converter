package main

import (
	i18nUtil "github.com/rxliuli/ebook-batch-converter/i18n"
	"github.com/rxliuli/ebook-batch-converter/util"
	"github.com/urfave/cli/v2"
	"os"
)

func main() {
	var input string
	var output string
	app := &cli.App{
		Name:  "ebook-batch-converter",
		Usage: i18nUtil.T("cli.description"),
		Flags: []cli.Flag{
			&cli.StringFlag{
				Name:        "input",
				Aliases:     []string{"i"},
				Value:       "",
				Usage:       i18nUtil.T("cli.input"),
				Required:    true,
				Destination: &input,
			},
			&cli.StringFlag{
				Name:        "output",
				Aliases:     []string{"o"},
				Value:       "",
				Usage:       i18nUtil.T("cli.output"),
				Required:    true,
				Destination: &output,
			},
		},
		Action: func(context *cli.Context) error {
			util.BatchConvert(input, output)
			return nil
		},
	}

	_ = app.Run(os.Args)
}
