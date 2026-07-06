export const HEADER_SCROLL_OFFSET = 120

export const scrollToHashElement = (
  id: string,
  behavior: ScrollBehavior = 'smooth',
) => {
  const target = document.getElementById(id)

  if (!target) {
    return false
  }

  const top =
    target.getBoundingClientRect().top + window.scrollY - HEADER_SCROLL_OFFSET

  window.scrollTo({
    top: Math.max(top, 0),
    behavior,
  })

  return true
}
