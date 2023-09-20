import ModalVideo from 'modal-video'

export const openModal = videoId => {
  const button = document.createElement('button')
  button.dataset.videoid = videoId
  new ModalVideo([button])
  button.click()
}
