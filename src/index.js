import React from 'react'
import Preview from './Preview'
import { search } from 'cerebro-tools'
import uniq from 'lodash/uniq'
import uniqBy from 'lodash/uniqBy'

import initialize from './initializeAsync'
import { openApp, toString } from './platform'

export const initializeAsync = initialize

let appsList = []

export const fn = ({ term, actions, display }) => {
  const result = search(appsList, term, app => app.searchString)
    .sort((a, b) => (b.selectCount || 0) - (a.selectCount || 0))
    .map(app => {
      const { id, path, name, description, icon, exec, source } = app
      return {
        icon,
        id: id || path,
        command: exec || source,
        title: name,
        term: name,
        subtitle: description || path,
        clipboard: path,
        onKeyDown: (event) => {
          if ((event.ctrlKey || event.metaKey) && event.keyCode === 82) {
            // Show application by ctrl+R shortcut
            actions.reveal(path)
            event.preventDefault()
          }
        },
        onSelect: () => {
          const application = app
          application.selectCount = application.selectCount ? application.selectCount + 1 : 1
          openApp(application)
        },
        getPreview: () => <Preview name={name} path={path} icon={icon} />
      }
    })
  display(uniqBy(result, app => app.command))
}

export const onMessage = (apps) => {
  appsList = uniq([...appsList, ...apps])
  appsList.forEach(app => {
    app.searchString = toString(app)
  })
}

