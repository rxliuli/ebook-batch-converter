import fetch from 'node-fetch'
import pkgJson from '../../package.json'
import { mkdirp, writeFile } from 'fs-extra'
import path from 'path'

export interface Release {
  url: string
  assets_url: string
  upload_url: string
  html_url: string
  id: number
  node_id: string
  tag_name: string
  target_commitish: string
  name: string
  draft: boolean
  author: Author
  prerelease: boolean
  created_at: Date
  published_at: Date
  assets: Asset[]
  tarball_url: string
  zipball_url: string
  body: string
}

export interface Asset {
  url: string
  id: number
  node_id: string
  name: string
  label: string
  uploader: Author
  content_type: string
  state: string
  size: number
  download_count: number
  created_at: Date
  updated_at: Date
  browser_download_url: string
}

export interface Author {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export async function getReleaseByTag(options: {
  owner: string
  repo: string
  tag: string
}): Promise<Release> {
  const url = `https://api.github.com/repos/${options.owner}/${options.repo}/releases/tags/${options.tag}`
  const resp = await fetch(url)
  return await resp.json()
}

async function download(url: string): Promise<Buffer> {
  const resp = await fetch(url)
  return await resp.buffer()
}

/**
 * 下载 release
 */
export async function downloadRelease(
  platformAndArch: string,
): Promise<string> {
  const options = {
    owner: 'rxliuli',
    repo: 'ebook-batch-converter',
    tag: 'v' + pkgJson.version,
  }
  const release = await getReleaseByTag(options)
  const findAsset = release.assets.find((asset) =>
    asset.name.includes(platformAndArch),
  )
  if (!findAsset) {
    throw new Error('找不到要下载的链接')
  }
  const buffer = await download(findAsset.browser_download_url)
  const file = path.resolve(__dirname, '.cache', findAsset.name)
  await mkdirp(path.dirname(file))
  await writeFile(file, buffer)
  return file
}
