import { render } from '@testing-library/react'
import App from '../App.js'

// TODO: test close button

jest.setTimeout(60000)

const sleep = async (ms) => new Promise((res) => setTimeout(res, ms))

const testGreetingPage = async (widget) => {
  const startNowButton = widget.querySelector('button[class="widget-button"]')
  expect(startNowButton).toBeInTheDocument()
  startNowButton.click()
  await sleep(500)
}

const testBetweenPage = async (content, expectedText) => {
  const image = content.querySelector('.thumbsup-image')

  expect(image.getAttribute('src').includes('thumbsup.png')).toBe(true)

  const text = content.querySelector('.widget-between-text')

  expect(text.innerText).toBe(expectedText)
  await sleep(2000)
}

const testCloseButton = async (header, widget) => {
  const is = header.querySelectorAll('i')

  const closeButton = is[is.length - 1]

  expect(closeButton).toBeInTheDocument()

  closeButton.click()
  await sleep(500)

  const newContent = widget.querySelector('div.widget-content')

  const startButton = newContent.querySelector('button')

  expect(startButton).toBeInTheDocument()

  expect(startButton.innerText).toBe('Start Now')
}

const testBackButton = async (header, content, prevResponseClass) => {
  const currentFullPageNumber = header.querySelector('p').innerText

  const [pageNumber] = currentFullPageNumber.split('/')

  const backButton = header.querySelector('i')

  expect(backButton).toBeInTheDocument()

  backButton.click()
  await sleep(500)

  const prevFullPageNumber = header.querySelector('p').innerText

  const [prevPageNumber] = prevFullPageNumber.split('/')

  expect((Number(prevPageNumber) + 1).toString()).toBe(pageNumber)

  const responses = content.querySelector(`div[class="${prevResponseClass}"]`)

  responses.click()
  await sleep(500)

  expect(header.querySelector('p').innerText).toBe(currentFullPageNumber)
}

const testPage = async (
  header,
  content,
  {
    responseIndex = 0,
    responseClass = 'widget-response',
    pageNumber,
    allPages,
    responsesLength,
  }
) => {
  expect(header.querySelector('p').innerText).toBe(`${pageNumber}/${allPages}`)

  const responses = content.querySelectorAll(`div[class="${responseClass}"]`)

  expect(responses.length).toBe(responsesLength)

  const response = responses[responseIndex]
  expect(response).toBeInTheDocument()

  response.click()
  await sleep(500)
}

test('test whole functionality', async () => {
  render(<App />)

  const widget = document.querySelector('#glasses-quiz-widget')
  expect(widget).toBeInTheDocument()

  const header = widget.querySelector('div.widget-header')
  expect(header).toBeInTheDocument()

  const content = widget.querySelector('div.widget-content')
  expect(content).toBeInTheDocument()

  await testGreetingPage(widget)

  const allPages = 10

  //   1
  await testPage(header, content, {
    pageNumber: 1,
    allPages,
    responsesLength: 2,
  })

  //   2
  await testPage(header, content, {
    pageNumber: 2,
    allPages,
    responsesLength: 2,
  })

  await testBetweenPage(content, `Let's get to know you!`)

  //   3
  await testPage(header, content, {
    responseClass: 'widget-single-response',
    pageNumber: 3,
    allPages,
    responsesLength: 2,
  })

  await testPage(header, content, {
    responseClass: 'widget-single-response',
    pageNumber: 3,
    allPages,
    responsesLength: 3,
  })

  //   4
  await testPage(header, content, {
    responseClass: 'widget-response-small',
    pageNumber: 4,
    allPages,
    responsesLength: 3,
  })

  await testBetweenPage(content, `No worries, we’ve got you!`)

  await testPage(header, content, {
    responseClass: 'widget-single-response',
    pageNumber: 4,
    allPages,
    responsesLength: 3,
  })

  //   5
  await testPage(header, content, {
    responseClass: 'widget-single-response',
    pageNumber: 5,
    allPages,
    responsesLength: 2,
  })

  await testBackButton(header, content, 'widget-single-response')

  // 6
  await testPage(header, content, {
    responseClass: 'widget-response-image-left',
    pageNumber: 6,
    allPages,
    responsesLength: 3,
  })

  // 7
  await testPage(header, content, {
    responseClass: 'widget-single-response',
    pageNumber: 7,
    allPages,
    responsesLength: 3,
  })

  // 8
  await testPage(header, content, {
    responseClass: 'option-cube',
    pageNumber: 8,
    allPages,
    responsesLength: 12,
  })

  document.querySelector('.widget-button').click()
  await sleep(500)

  // 9
  await testPage(header, content, {
    responseClass: 'widget-single-response',
    pageNumber: 9,
    allPages,
    responsesLength: 2,
  })

  // 10
  await testPage(header, content, {
    responseClass: 'option-cube',
    pageNumber: 10,
    allPages,
    responsesLength: 12,
  })

  document.querySelector('.widget-button').click()
  await sleep(500)

  const sendButton = document.querySelector('.widget-button')

  expect(sendButton).toBeInTheDocument()
  expect(sendButton.innerText).toBe('Send')

  await testCloseButton(header, widget)
})
