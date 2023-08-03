import isArray from 'lodash/isArray'

const hightLightKeyword = (el, binding) => {
  let { value } = binding
  const { arg } = binding

  try {
    if (!arg || !value) return

    value = value.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    let keywords = (isArray(arg) ? arg : [arg]).filter(Boolean)
    keywords.sort((a, b) => b.length - a.length)

    keywords = keywords.map(k => {
      // eslint-disable-next-line no-useless-escape
      return k.replace(/[<>*.?+&$^(){}|\\/\[\]]/g, (match) => {
        switch (match) {
          case '<':
            return '&lt;'
          case '>':
            return '&gt;'
          default:
            return `\\${match}`
        }
      })
    })
    
    if (!keywords.length) return
    const keyword = keywords.join('|')
    var pattern = new RegExp(`(${keyword})`, 'gi')
    
    value = value.replace(pattern, `<span class="hight-light_text">$1</span>`)
  } catch (error) {
    console.log('keyword error', error)
  } finally {
    el.innerHTML = value || ''
  }
}
export default {
  inserted(el, binding) {
    hightLightKeyword(el, binding)
  },
  update(el, binding) {
    hightLightKeyword(el, binding)
  }
}
