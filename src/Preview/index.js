import React, { PropTypes } from 'react'
import FileDetails from './FileDetails'
import styles from './styles.css'
import { SmartIcon } from '@cerebroapp/cerebro-ui'

const Preview = ({ path, name, icon }) => (
  <div>
    {icon &&
      <div className={styles.previewIcon}>
        <SmartIcon path={icon} />
      </div>
    }
    <div className={styles.previewName}>{name}</div>
    <FileDetails path={path} key={path} skipName />
  </div>
)

Preview.propTypes = {
  path: PropTypes.string,
  name: PropTypes.string,
  icon: PropTypes.string
}

export default Preview
