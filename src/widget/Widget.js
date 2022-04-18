import { widgetOptions } from './options'
import {
  widgetContentClass,
  widgetHeaderClass,
  widgetMainClass,
} from './config.js'

class Widget {
  constructor(widgetId, iconSrc) {
    this.widgetId = widgetId
    this.iconSrc = iconSrc

    this.params = {}

    const widget = document.querySelector(this.widgetId)

    if (!widget) throw new Error(`Can't find widget`)

    this.widget = widget

    const dataSource = this.widget.getAttribute('data-source')

    if (!dataSource) throw new Error(`Can't find dataSource`)

    this.dataSource = dataSource
  }

  createIcon = (src) => {
    const image = document.createElement('img')
    image.src = src
    image.classList.add('widget-icon')

    return image
  }

  createMaterializeIcon = (func, direction, style = null) => {
    const arrow = document.createElement('i')
    arrow.classList.add('material-icons')
    arrow.innerHTML = direction

    if (style) arrow.style = style

    arrow.style.cursor = 'pointer'

    if (func) arrow.onclick = () => func()

    return arrow
  }

  createHeader = () => {
    const header = document.createElement('div')

    header.classList.add(widgetHeaderClass)
    header.classList.add('one-edge-shadow')

    return header
  }

  createMain = () => {
    const main = document.createElement('div')

    main.classList.add(widgetMainClass)

    return main
  }

  toStart = () => {
    this.widget.innerHTML = ''

    this.append()
  }

  renderHeader = (current, prevFunc, toStart = this.toStart) => {
    const header = document.querySelector(`.${widgetHeaderClass}`)

    header.innerHTML = ''

    const backArrow = this.createMaterializeIcon(
      prevFunc,
      'chevron_left',
      'margin-top:4%;margin-left: 3%; margin-bottom : 4%'
    )

    const counter = document.createElement('p')
    counter.innerText = `${current.page}/${widgetOptions.widgetPages}`

    counter.style = 'position : absolute; left : 45%; top : 1%'

    const closeButton = this.createMaterializeIcon(
      toStart,
      'clear',
      'position : absolute; right : 5%; margin-top:4%'
    )

    const indicator = document.createElement('div')

    indicator.classList.add('indicator')

    const indicatorLine = document.createElement('div')

    indicatorLine.classList.add('indicator-line')

    indicatorLine.style.width = `${
      (current.page * 100) / widgetOptions.widgetPages
    }%`

    indicator.appendChild(indicatorLine)

    header.appendChild(backArrow)
    header.appendChild(counter)
    header.appendChild(closeButton)

    header.appendChild(indicator)
  }

  renderContent = (current) =>
    new Promise((res) => {
      const content = document.querySelector(`.${widgetContentClass}`)

      content.innerHTML = ''

      content.style.removeProperty('background')

      const text = document.createElement('p')

      text.innerText = current.text

      text.classList.add('widget-response-text')

      content.appendChild(text)

      if (current.image) {
        const image = document.createElement('img')

        image.src = current.image

        image.classList.add('content-image')

        content.appendChild(image)
      }

      for (const response of current.responses) {
        const divResponse = document.createElement('div')

        if (response.image) {
          const image = document.createElement('img')

          image.src = response.image

          if (current.imageStyle) {
            image.style.marginTop = `${current.imageStyle.top}%`
          }

          divResponse.appendChild(image)
        }

        const text = document.createElement('p')

        text.innerText = response.text

        divResponse.appendChild(text)

        if (response.right) {
          text.style.setProperty('float', 'left')

          const rightText = document.createElement('p')

          rightText.innerText = response.right

          rightText.classList.add('right')

          rightText.style.setProperty('float', 'right')

          divResponse.appendChild(rightText)
        }

        if (!response.class) {
          response.class = 'widget-response'
        }

        divResponse.classList.add(response.class)

        divResponse.onclick = () => res(response.value)

        content.appendChild(divResponse)
      }

      if (current.skip) {
        const skipButton = document.createElement('p')

        skipButton.classList.add('skip-button')
        skipButton.innerText = current.skip.text

        skipButton.onclick = () => {
          res(current.skip.value)
        }

        content.appendChild(skipButton)
      }
    })

  addScrolling = (el) => {
    const toRightButton = document.createElement('button')
    const toLeftButton = document.createElement('button')

    const step = 304

    toRightButton.classList.add('scroll-to-right')
    toLeftButton.classList.add('scroll-to-left')

    toRightButton.classList.add('btn')
    toLeftButton.classList.add('btn')

    toRightButton.innerHTML = '<i class="material-icons">arrow_forward</i>'
    toLeftButton.innerHTML = '<i class="material-icons">arrow_back</i>'

    toRightButton.onclick = () => {
      el.scrollLeft += step
    }

    toLeftButton.onclick = () => {
      el.scrollLeft -= step
    }

    el.appendChild(toRightButton)
    el.appendChild(toLeftButton)
  }

  renderImagePicker = (
    current,
    imageOptions = { height: '64px', width: '129px' }
  ) =>
    new Promise((res) => {
      const content = document.querySelector(`.${widgetContentClass}`)

      content.innerHTML = ''

      const rowLines = document.createElement('div')

      rowLines.classList.add('row-lines')

      this.addScrolling(rowLines)

      let rowBlock = document.createElement('div')

      rowBlock.classList.add('row')

      const button = document.createElement('button')

      let picked = []

      for (
        let times = 0;
        times < Math.ceil(current.images.length / 4);
        ++times
      ) {
        for (let i = 4 * times; i < (times + 1) * 4; ++i) {
          const image = current.images[i]

          if (!image) break

          const block = document.createElement('div')

          block.classList.add('option-cube')

          let isPicked = false

          block.onclick = () => {
            if (isPicked) {
              isPicked = false

              block.classList.remove('active')

              picked = picked.filter((value) => value !== image.value)

              if (picked.length === 0) {
                button.classList.add('widget-button-disabled')
                button.classList.remove('widget-button')
              }
            } else {
              isPicked = true

              picked.push(image.value)

              block.classList.add('active')

              if (picked.length === 1) {
                button.classList.remove('widget-button-disabled')
                button.classList.add('widget-button')
              }
            }
          }

          const img = document.createElement('img')

          img.src = image.image

          img.style.setProperty('height', imageOptions.height)
          img.style.setProperty('width', imageOptions.width)

          block.appendChild(img)

          if (image.text) {
            const text = document.createElement('p')

            text.innerText = image.text

            block.appendChild(text)
          }

          rowBlock.appendChild(block)
        }

        rowLines.appendChild(rowBlock)
        rowBlock = document.createElement('div')

        rowBlock.classList.add('row')
      }

      button.innerText = 'Continue'

      button.onclick = () => {
        if (picked.length > 0) {
          res(picked)
        }
      }

      button.classList.add('widget-button-disabled')

      content.appendChild(rowLines)

      content.appendChild(button)
    })

  renderBetweenContent = (current) => {
    const content = document.querySelector(`.${widgetContentClass}`)

    content.innerHTML = ''

    const image = document.createElement('img')

    image.src = './static/widget/thumbsup.png'

    image.classList.add('thumbsup-image')

    const text = document.createElement('p')

    text.innerText = current.text
    text.classList.add('widget-between-text')

    content.appendChild(image)

    content.appendChild(text)
  }

  renderBeetween = (current) =>
    new Promise((res) => {
      this.renderHeader(
        current.header,
        () => {},
        () => {}
      )

      this.renderBetweenContent(current.content)

      setTimeout(() => {
        res()
      }, current.timeout)
    })

  startQuestions = async () => {
    this.params = {}

    const greeting = () =>
      new Promise((res) => {
        this.createGreetingHeader(res)

        this.createGreetingContent(res)
      })

    const first = () =>
      new Promise(async (res, rej) => {
        const { first } = widgetOptions.options

        this.renderHeader(first.header, rej)
        const gender = await this.renderContent(first.content)
        this.params['gender'] = gender

        res()
      })

    const second = () =>
      new Promise(async (res, rej) => {
        let second = null

        const { secondMan, secondWoman, betweenTwoThree } =
          widgetOptions.options

        if (this.params['gender'] === 5) second = secondWoman
        else second = secondMan

        this.renderHeader(second.header, rej)
        const eyewear_type = await this.renderContent(second.content)
        this.params['eyewear_type'] = eyewear_type

        await this.renderBeetween(betweenTwoThree)

        res()
      })

    const third = () =>
      new Promise(async (res, rej) => {
        const { third } = widgetOptions.options

        this.params['lenstype'] = null

        this.renderHeader(third.header, rej)
        const eyeCorrection = await this.renderContent(third.content)

        if (eyeCorrection) {
          const { threePointTwo } = widgetOptions.options

          this.renderHeader(threePointTwo.header, rej)
          const lenstype = await this.renderContent(threePointTwo.content)

          this.params['lenstype'] = lenstype
        }

        res()
      })

    const fourth = () =>
      new Promise(async (res, rej) => {
        const { fourth, fourthPointTwo, betweenFour } = widgetOptions.options

        this.renderHeader(fourth.header, rej)
        const frame_size = await this.renderContent(fourth.content)

        this.params['frame_size'] = frame_size

        await this.renderBeetween(betweenFour)

        this.renderHeader(fourthPointTwo.header, rej)
        const frame_size_average = await this.renderContent(
          fourthPointTwo.content
        )

        this.params['frame_size_average'] = frame_size_average

        res()
      })

    const fifth = () =>
      new Promise(async (res, rej) => {
        this.params['shade'] = null
        this.params['blue_light'] = null

        if (this.params['eyewear_type'] === 211) {
          const { fifthSunglasses } = widgetOptions.options

          this.renderHeader(fifthSunglasses.header, rej)
          const shade = await this.renderContent(fifthSunglasses.content)

          this.params['shade'] = shade
        } else {
          const { fifthEyeglasses } = widgetOptions.options

          this.renderHeader(fifthEyeglasses.header, rej)
          const blue_light = await this.renderContent(fifthEyeglasses.content)

          this.params['blue_light'] = blue_light
        }

        res()
      })

    const sixth = () =>
      new Promise(async (res, rej) => {
        if (this.params['gender'] === 4) {
          // men
          const { sixthMan } = widgetOptions.options

          this.renderHeader(sixthMan.header, rej)
          const face_shape = await this.renderContent(sixthMan.content)

          this.params['face_shape'] = face_shape
        } else if (this.params['gender'] === 5) {
          // women
          const { sixthWoman } = widgetOptions.options

          this.renderHeader(sixthWoman.header, rej)
          const face_shape = await this.renderContent(sixthWoman.content)

          this.params['face_shape'] = face_shape
        } else {
          // both
          const { sixthBoth } = widgetOptions.options

          this.renderHeader(sixthBoth.header, rej)
          const face_shape = await this.renderContent(sixthBoth.content)

          this.params['face_shape'] = face_shape
        }

        res()
      })

    const seventh = () =>
      new Promise(async (res, rej) => {
        const { seventh } = widgetOptions.options

        this.renderHeader(seventh.header, rej)
        const facial_features = await this.renderContent(seventh.content)

        this.params['facial_features'] = facial_features

        res()
      })

    const eighth = () =>
      new Promise(async (res, rej) => {
        const { eighth } = widgetOptions.options

        this.renderHeader(eighth.header, rej)

        const shape = await this.renderImagePicker(eighth.content)

        this.params['shape'] = shape

        res()
      })

    const ninth = () =>
      new Promise(async (res, rej) => {
        const { ninth } = widgetOptions.options

        this.renderHeader(ninth.header, rej)
        const brandPreference = await this.renderContent(ninth.content)

        this.params['brandPreference'] = brandPreference

        res()
      })

    const tenth = () =>
      new Promise(async (res, rej) => {
        this.params['brand'] = null

        if (this.params['brandPreference']) {
          const { tenth } = widgetOptions.options

          this.renderHeader(tenth.header, rej)

          const brand = await this.renderImagePicker(tenth.content, {
            height: '103px',
            width: '160px',
          })

          this.params['brand'] = brand
        }

        res()
      })

    const functions = [
      greeting,
      first,
      second,
      third,
      fourth,
      fifth,
      sixth,
      seventh,
      eighth,
      ninth,
      tenth,
    ]

    for (let i = 0; i < functions.length; ++i) {
      const func = functions[i]

      try {
        await func()
      } catch (error) {
        i -= 2
      }
    }

    const { end } = widgetOptions.options
    this.renderHeaderEnd(end.header)
    this.renderContentEnd()
  }

  renderHeaderEnd = (current) => {
    const header = document.querySelector(`.${widgetHeaderClass}`)

    header.innerHTML = ''

    const icon = this.createIcon(this.iconSrc)

    const closeButton = this.createMaterializeIcon(
      this.toStart,
      'clear',
      'position : absolute; right : 5%; margin-top:4%'
    )

    const indicator = document.createElement('div')

    indicator.classList.add('indicator')

    const indicatorLine = document.createElement('div')

    indicatorLine.classList.add('indicator-line')

    indicatorLine.style.width = `${
      (current.page * 100) / widgetOptions.widgetPages
    }%`

    indicator.appendChild(indicatorLine)

    header.appendChild(icon)
    header.appendChild(closeButton)

    header.appendChild(indicator)
  }

  renderContentEnd = () => {
    const content = document.querySelector(`.${widgetContentClass}`)

    content.innerHTML = ''

    const image = document.createElement('img')

    image.src = './static/widget/gift.png'

    image.style.width = '100%'

    const header = document.createElement('h2')

    header.innerText = `We've found some awesome frames for you!`

    header.classList.add('header-end')

    header.style.color = '#2196F3'

    const text = document.createElement('p')

    text.innerText =
      'Send the results to your email to receive special discounts.'

    text.style =
      "font-family: 'Roboto';font-style: normal;font-weight: 700;font-size: 16px;line-height: 150%;"

    const disclaimer = document.createElement('p')

    disclaimer.innerText =
      'By clicking ‘Send’ you agree to our Terms of Use & Privacy Policy and receiving promotion emails'

    disclaimer.classList.add('disclaimer')

    const button = document.createElement('button')

    button.innerText = 'Send'

    button.classList.add('widget-button')

    button.onclick = () => {
      const url = this.resume()

      console.log(url)
    }

    content.appendChild(image)
    content.appendChild(header)
    content.appendChild(text)

    content.appendChild(button)

    content.appendChild(disclaimer)
  }

  resume = () => {
    const result = []

    const keys = Object.keys(this.params)

    for (let i = 0; i < keys.length; ++i) {
      const key = keys[i]

      const sample = this.params[key]

      if (Array.isArray(sample)) {
        //array

        const values = []

        for (let j = 0; j < sample.length; ++j) {
          const value = sample[j]

          values.push(value)
        }

        result.push({ key, value: values.join(',') })
      } else {
        // variable

        const value = sample

        result.push({ key, value })
      }
    }

    return (
      `URL: ${this.dataSource}` +
      result
        .filter((s) => {
          if (s.value) return true
          return false
        })
        .map((s) => `${s.key}=${s.value}`)
        .join('&')
    )
  }

  createGreetingHeader = (res) => {
    const header = document.querySelector(`.${widgetHeaderClass}`)

    header.innerHTML = ''

    const icon = this.createIcon(this.iconSrc)
    const nextArrow = this.createMaterializeIcon(
      res,
      'chevron_right',
      'position:absolute; right:0px;;margin-top: 20px;margin-right: 15px;'
    )

    header.append(icon)
    header.append(nextArrow)
  }

  createGreetingContent = (res) => {
    const content = document.querySelector(`.${widgetContentClass}`)

    content.innerHTML = ''

    content.style.setProperty(
      'background',
      'linear-gradient(180deg, #E8F0F2 0%, rgba(232, 240, 242, 0) 100%)'
    )

    const startedImage = document.createElement('img')

    startedImage.src = './static/widget/happytoseeyou.png'

    startedImage.classList.add('started-image')

    const greetingHeader = document.createElement('h2')

    greetingHeader.innerText = 'Let’s find your perfect pair!'

    greetingHeader.classList.add('greeting-header-text')

    const greetingText = document.createElement('p')

    greetingText.innerText =
      'Take the quiz to easily discover your perfect fit from thousands of styles'

    greetingText.classList.add('widget-font')

    const button = document.createElement('button')

    button.innerText = 'Start Now'

    button.classList.add('widget-button')

    button.onclick = () => res()
    content.appendChild(startedImage)

    content.appendChild(greetingHeader)
    content.appendChild(greetingText)

    content.appendChild(button)
  }

  createContent = () => {
    const content = document.createElement('div')

    content.classList.add(widgetContentClass)
    content.classList.add('center')

    return content
  }

  append = () => {
    const main = this.createMain()
    const header = this.createHeader()
    const content = this.createContent()

    main.appendChild(header)
    main.append(content)

    this.widget.appendChild(main)

    this.startQuestions()
  }
}

const ActivateWidget = () => {
  const widgetId = '#glasses-quiz-widget'

  const iconSrc = './static/widget/icon.png'

  const widget = new Widget(widgetId, iconSrc)

  widget.append()
}

export { ActivateWidget }
