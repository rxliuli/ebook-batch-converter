# ebook-batch-converter

## 简介

使用 ebook-converter 批量转换 epub 等文件为 azw3 的实用 cli 程序。

```shell
npm i -g ebook-batch-converter
ebook-batch-converter -i <input> -o <output>
```

## 前置条件

安装 Calibre 并将安装目录下的 Calibre 目录添加至环境变量，目录下应有 `ebook-convert` 命令行程序，完成后你可输入以下命令检查。

```shell
ebook-convert -h
```

## 动机

最近由于搬家的缘故实感实体书之沉重，所以入手了一个 Kindle，但它仅支持 azw3/mobi 格式，经过简单的查询，吾辈最终确定使用 azw3 格式，于是便需要转换现有的 epub/pdf/txt 等格式的电子书。吾辈希望递归扫描目录中所有的电子书，然后将转换后的文件放到输出目录，同时保持结构不变，但现有的工具批量转换无法满足这个需求。
