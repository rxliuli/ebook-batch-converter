package main

import (
	"encoding/json"
	"github.com/gookit/color"
	"github.com/nicksnyder/go-i18n/v2/i18n"
	i18nUtil "github.com/rxliuli/ebook-batch-converter/i18n"
	"golang.org/x/text/language"
	"testing"
)

func TestColor(t *testing.T) {
	color.Redln("错误")
	color.Blueln("信息")
	color.Greenln("成功")
}

func TestI18n(t *testing.T) {
	bundle := i18n.NewBundle(language.Chinese)
	bundle.RegisterUnmarshalFunc("json", json.Unmarshal)
	bundle.MustLoadMessageFile("i18n/en.json")
	bundle.MustLoadMessageFile("i18n/zh.json")
	localize := i18n.NewLocalizer(bundle)
	msg := localize.MustLocalize(&i18n.LocalizeConfig{
		DefaultMessage: &i18n.Message{
			ID: "cli.description",
		},
	})
	println(msg)
}

func TestI18nT(t *testing.T) {
	println(i18nUtil.T("cli.description"))
}
