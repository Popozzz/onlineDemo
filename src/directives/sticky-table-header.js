import '@/styles/sticky-table-header.scss'

export default {
  bind(el, binding) {
    el.setAttribute('is-sticky', true)
    updateStickyTop(el, binding)
  },
  update(el, binding) {
    updateStickyTop(el, binding)
  }
}

const updateStickyTop = (el, binding) => {
  const { value, oldValue } = binding
  if (value === oldValue) return

  const top = Number(value)
  if (!isNaN(top)) {
    el.style.setProperty('--sticky-top', `${top}px`)
  }
}
