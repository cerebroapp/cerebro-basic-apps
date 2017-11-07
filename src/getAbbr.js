import lowerCase from 'lodash/lowerCase'

const abbreviation_rx = /([^\s])[^\s]*\s?/g
/**
 * Get app name abbreviation, i.e.
 *   League of Legends -> lol
 *   AudioBookBinder -> abb
 * @param  {String} name
 * @return {String}
 */
export default (name) => (
  lowerCase(name).replace(abbreviation_rx, '$1')
)
