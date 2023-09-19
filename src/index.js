import h from 'hyperscript'
import { fetchPopular, fetchHighestRated, fetchTrending } from './api'
import CarouselItem from './CarouselItem'

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

  const options = {
    rootMargin: '10px',
    threshold: 0.2,
  }
  const imagesObserver = new IntersectionObserver(elements => {
    elements.forEach(entry => {
      const image = entry.target.querySelector('img')
      if (entry.isIntersecting) {
        image.style.display = 'block'
        imagesObserver.unobserve(image)
      } else {
        image.style.display = 'none'
      }
    })
  }, options)
  carouselItems.forEach(img => imagesObserver.observe(img))
  console.log(carouselItems)
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
})
