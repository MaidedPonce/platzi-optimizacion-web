// import { openModal } from './open-modal'

export const modalListener = event => {
  event.preventDefault()
  const img = event.target
  const link = img.parentElement
  const videoID = link.dataset.videoId

  if (link && link.classList.contains('js-video-link')) {
    import(/* webpackChunkName: "modal-library" */ './open-modal').then(
      ({ openModal }) => {
        openModal(videoID)
      }
    )
  }
}
