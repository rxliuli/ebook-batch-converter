package util

import (
	"github.com/stretchr/testify/assert"
	"path/filepath"
	"testing"
)

func TestPathExists(t *testing.T) {
	assert.True(t, PathExists(dirname()))
	assert.False(t, PathExists(filepath.Join(dirname(), "test")))
}

func TestReplaceExt(t *testing.T) {
	assert.Equal(t, ReplaceExt("index.user.js", ".ts"), "index.user.ts")
}
