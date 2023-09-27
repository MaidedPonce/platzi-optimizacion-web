import h from 'hyperscript'
import { fetchPopular, fetchHighestRated, fetchTrending } from './api'
import CarouselItem from './CarouselItem'
import { modalListener } from './modal'

const SectionTitle = title => h('h3.carousel-title', title)

const Carousel = ({ itemsList = [] }) => {
  const carouselItems = itemsList.map(
    ({
      attributes: { titles, posterImage, slug, youtubeVideoId, startDate },
    }) =>
      CarouselItem({
        imageUrl: posterImage.medium,
        title: titles.en,
        subtitle: titles.ja_jp,
        slug,
        youtubeVideoId,
        startDate,
      })
  )
  return h('section.carousel', h('div', carouselItems))
}
window.addEventListener('DOMContentLoaded', async () => {
  const mountReference = document.querySelector('.main').lastElementChild

  if (!mountReference) {
    return 0
  }

  const trending = await fetchTrending()
  const popular = await fetchPopular()
  const highestRated = await fetchHighestRated()

  mountReference
    .insertAdjacentElement('afterend', SectionTitle('Trending Anime'))
    .insertAdjacentElement(
      'afterend',
      Carousel({
        itemsList: trending,
      })
    )
    .insertAdjacentElement('afterend', SectionTitle('Highest Rated Anime'))
    .insertAdjacentElement(
      'afterend',
      Carousel({
        itemsList: highestRated,
      })
    )
    .insertAdjacentElement('afterend', SectionTitle('Most Popular Anime'))
    .insertAdjacentElement(
      'afterend',
      Carousel({
        itemsList: popular,
      })
    )

  const carouselItems = document.querySelectorAll('.carousel-item .image')
  const imagesObserver = new IntersectionObserver(elements => {
    elements.forEach(entry => {
      const image = entry.target.querySelector('img')
      if (entry.isIntersecting) {
        let imagen = entry.target
        imagen.src = imagen.dataset.src
      } else {
        if (image && image.dataset) {
          image.src = image.dataset.src
        }
      }
    })
  })
  carouselItems.forEach(img => imagesObserver.observe(img))
  document.body.addEventListener('click', event => {
    const tagName = event.target.tagName
    if (['IMG', 'A'].includes(tagName)) {
      modalListener(event)
    }
  })
  /*   const allYoutubeLinks = document.querySelectorAll('.js-video-link')
    allYoutubeLinks.forEach((link) => {
      link.addEventListener('click', modalListener)
    }) */
})
