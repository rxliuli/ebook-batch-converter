package i18nUtil

import (
	"encoding/json"
	"github.com/Xuanwo/go-locale"
	"github.com/nicksnyder/go-i18n/v2/i18n"
	"golang.org/x/text/language"
	"strings"
)

var bundle *i18n.Bundle

func init() {
	tag, _ := locale.Detect()
	if strings.Index(strings.ToLower(tag.String()), "zh") != -1 {
		bundle = i18n.NewBundle(language.Chinese)
	} else {
		bundle = i18n.NewBundle(language.English)
	}
	bundle.RegisterUnmarshalFunc("json", json.Unmarshal)
	bundle.MustLoadMessageFile("i18n/en.json")
	bundle.MustLoadMessageFile("i18n/zh.json")
}

func T(key string) string {
	localize := i18n.NewLocalizer(bundle)
	return localize.MustLocalize(&i18n.LocalizeConfig{
		DefaultMessage: &i18n.Message{
			ID: key,
		},
	})
}
