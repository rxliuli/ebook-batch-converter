package i18nUtil

import (
	"embed"
	"encoding/json"
	"github.com/Xuanwo/go-locale"
	"github.com/nicksnyder/go-i18n/v2/i18n"
	"golang.org/x/text/language"
	"strings"
)

var bundle *i18n.Bundle

//go:embed en.json zh.json
var i18nES embed.FS

func addLocale(path string) {
	bytes, err := i18nES.ReadFile(path)
	if err != nil {
		panic(err)
	}
	bundle.MustParseMessageFileBytes(bytes, path)
}

func init() {
	tag, _ := locale.Detect()
	if strings.Index(strings.ToLower(tag.String()), "zh") != -1 {
		bundle = i18n.NewBundle(language.Chinese)
	} else {
		bundle = i18n.NewBundle(language.English)
	}
	bundle.RegisterUnmarshalFunc("json", json.Unmarshal)
	addLocale("en.json")
	addLocale("zh.json")
}

func T(key string) string {
	localize := i18n.NewLocalizer(bundle)
	return localize.MustLocalize(&i18n.LocalizeConfig{
		DefaultMessage: &i18n.Message{
			ID: key,
		},
	})
}
