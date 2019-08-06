/* eslint-disable max-statements */
/* eslint-disable complexity */
const Apify = require('apify')
const {utils: {log}} = Apify

exports.enqueue = async ({$, request}, {requestQueue}) => {
  let page = $
  let pagLink
  //cheerio use $
  //pup use page
  console.log($, request)
  await Apify.utils.enqueueLinks({
    page,
    requestQueue,
    selector: '.product-pod > a',
    baseUrl: request.loadedUrl,
    userData: {
      type: 'detail',
      label: 'host',
      host: 'homedepot'
    }
  })

  await Apify.utils.enqueueLinks({
    page,
    requestQueue,
    selector: '.pod-plp__description > a',
    baseUrl: request.loadedUrl,
    userData: {
      type: 'detail',
      label: 'host',
      host: 'homedepot'
    }
  })

  try {
    pagLink = $('.hd-pagination__current')
      .parent()
      .next()
      .children()[0].attribs.href
    if (pagLink.startsWith('/b/')) {
      console.log("parsing out '/' from '/b/'")
      pagLink = pagLink.split('')
      pagLink.shift()
      pagLink = pagLink.join('')
    }
    await requestQueue.addRequest({
      url: `https://www.homedepot.com/${pagLink}`,
      userData: {
        type: 'enqueue',
        label: 'host',
        host: 'homedepot'
      }
    })
  } catch (err) {
    //for alternate page structure
    console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&', err, page)
    // page = $(".hd-pagination__current").parent()
    // console.log(page)
    // console.log()
    // console.log($(".hd-pagination__current").parent()[0])
    // console.log($(".hd-pagination__current").parent()[0].prev.children[0])
  }
}

exports.detail = async ({$, request}, {requestQueue}) => {
  let page = $
  console.log('in the product single view!!!!!!!')
  let title = await page.eval$('.product-title__title').text()
  //if title is false, scrape w/ alternative page structure
  console.log('title true? ', title == true)
  if (!title) {
    title = $('.product-details__title').text()
  }

  //get price
  let price = Number(
    $('.price__dollars')
      .text()
      .replace(/ {2}|\r\n|\n|\r/gm, '') + $('.price__cents').text()
  )

  if (price == 0) {
    price = Number(
      $('.price-format__main-price').children()[1].children[0].data +
        $('.price-format__main-price').children()[2].children[0].data
    )
    console.log($('.price-format__main-price').children()[1].children[0].data)
    console.log($('.price-format__main-price').children()[2].children[0].data)
  }

  //get description
  let description
  try {
    description = $('.main_description > p')[0].children[0].data.replace(
      / {2}|\r\n|\n|\r/gm,
      ''
    )
  } catch (err) {
    description = $('.product-description__main-description')
      .text()
      .replace(/ {2}|\r\n|\n|\r/gm, '')
  }

  //get imageUrl
  let imageUrl = $('#mainImage').attr('src')

  //get brand
  let brand = $('.product-title__brand .bttn__content').text()
  if (!brand) {
    brand = $(
      '.product-details__brand-collection .product-details__brand-name'
    ).text()
  }

  //get category
  let category
  if (title.toLowerCase().includes('shovel')) {
    category = 'yardShovel'
  }
  if (title.toLowerCase().includes('snow')) {
    category = 'snowShovel'
  }

  if (
    title.toLowerCase().includes('spatula') ||
    title.toLowerCase().includes('ladel')
  ) {
    category = 'kitchenShovel'
  }

  if (title.toLowerCase().includes('spoon')) {
    category = 'mouthShovel'
  }

  if (!category) {
    return
  }

  try {
    await Apify.pushData({
      url: request.url,
      title: title,
      brand: brand,
      category: category,
      price: price,
      description: description,
      imageUrl: imageUrl,
      quantity: Math.floor(Math.random() * (15 - 0 + 1)) + 0
    })
  } catch (err) {
    console.error(err)
  }
}
