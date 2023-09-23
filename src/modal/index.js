// import { openModal } from "./open-modal";

export const modalListener = event => {
  event.preventDefault()
  const img = event.target
  const link = img.parentElement
  const videoId = link.dataset.videoid

  if (link && link.classList.contains('js-link-link')) {
    import(/* webpackChunkName: "modal" */ './open-modal').then(
      ({ openModal }) => {
        openModal(videoId)
      }
    )
  }
  console.log(link.href)
}
