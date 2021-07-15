# ebook-batch-converter

## Introduction

Use ebook-converter to batch convert epub and other files to azw3 utility cli program.

1. 下载程序
2. 将
3. `ebook-batch-converter -i <input> -o <output>`
## Requisites

Install Calibre and add the Calibre directory in your installation directory to your environment variables. The
directory should have the `ebook-convert` command line program in it, and you can check it by entering the following
command when you are done.

```shell
ebook-convert -h
```

## Motivation

Recently, I felt the heavy burden of physical books because of moving, so I got a Kindle, but it only supports azw3/mobi
format, after a simple query, I finally decided to use azw3 format, so I need to convert existing ebooks in epub/pdf/txt
format. I would like to recursively scan all the eBooks in the directory, and then put the converted files into the
output directory while keeping the structure unchanged, but the existing tools for batch conversion cannot meet this
requirement.
