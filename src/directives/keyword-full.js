import isArray from 'lodash/isArray'

const hightLightKeyword = (el, binding) => {
  let { value } = binding
  const { arg } = binding

  try {
    if (!arg || !value) return

    value = value.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    let keywords = (isArray(arg) ? arg : [arg]).filter(Boolean)
    // 单个字符串去重
    const keyList = [...new Set(keywords.reduce((result, keyword) => {
      result.push(...keyword.split(''))
      return result
    }, []))]
    
    const keywordsStr= keywords.join('')
    // 去重后数组长度<keywords长度说明有重复的字符
    if (keyList.length < keywordsStr.length) {
      const add = []
      const keywordsSet = new Set(keywords)
      // 头尾重复
      const duplicatePattern = new RegExp(`^([${keyList.join('')}]+).*\\1$`, 'i')
      for(let i=0; i<keywords.length-1; i++) {
        for (let j=i+1; j<keywords.length; j++) {
          const strLeft = keywords[i] + keywords[j]
          const strRight = keywords[j] + keywords[i]
          const matchLeft = strLeft.match(duplicatePattern)
          const matchRight = strRight.match(duplicatePattern)
          let target = ''
          if (matchLeft) {
            const length = matchLeft[1].length
            target = keywords[j].slice(0, keywords[j].length - length) + matchLeft[1] + keywords[i].slice(length, keywords[i].length)
          }

          if (matchRight) {
            const length = matchRight[1].length
            target = keywords[i].slice(0, keywords[i].length - length) + matchRight[1] + keywords[j].slice(length, keywords[j].length)
          }
          if (target && !keywordsSet.has(target)) {
            keywordsSet.add(target)
            add.push(target)
          }
        }
      }
      
      keywords.push(...add)
    }
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
