package main

import (
	"github.com/gookit/color"
	"testing"
)

func TestColor(t *testing.T) {
	color.Redln("错误")
	color.Blueln("信息")
	color.Greenln("成功")
}
