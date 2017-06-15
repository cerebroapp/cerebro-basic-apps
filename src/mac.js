import path from 'path'
import getAbbr from './getAbbr'
import { shell } from 'electron'
import os from 'os'

const homepath = os.homedir()

export const DIRECTORIES = []

export const PATTERNS = [
  // Apps in root applications folder
  '/Applications/*.app',
  // Apps inside other apps
  '/Applications/*.app/Contents/Applications/*.app',
  // Apps in folders
  '/Applications/!(*.app)/**.app',
  // System preferences
  '/System/Library/PreferencePanes/*.prefPane',
  path.join(homepath, 'Applications', '*.app'),
];

export const EXTENSIONS = ['prefPane', 'app']

export const openApp = (app) => shell.openItem(app.source)

export const toString = (app) => `${app.name} ${app.filename} ${getAbbr(app.name)}`

export const formatPath = (filePath) => ({
  id: filePath,
  path: filePath,
  description: filePath,
  icon: filePath,
  source: filePath,
  // TODO: check if file is hidden or not
  hidden: false,
  filename: path.basename(filePath),
  name: path.basename(filePath).replace(/\.(prefPane|app)$/, ''),
})
