import { execPromise } from './execPromise'

export interface ConvertOptions {
  input: string
  output: string
}

export async function convert(options: ConvertOptions) {
  const command = `ebook-convert "${options.input}" "${options.output}"`
  return await execPromise(command)
}
