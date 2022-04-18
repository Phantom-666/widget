const widgetOptions = {
  widgetPages: 10,
  options: {
    first: {
      header: { page: 1 },
      content: {
        imageStyle: { top: 8 },
        text: 'You are looking for',
        responses: [
          {
            image: './static/widget/woman.png',
            text: `Women's Styles`,
            value: 5,
          },
          {
            image: './static/widget/man.png',
            text: `Men's Styles`,
            value: 4,
          },
        ],

        skip: {
          text: "I'd like to see both",
          value: null,
        },
      },
    },
    secondMan: {
      header: { page: 2 },
      content: {
        text: 'What type of glasses are you looking for?',
        responses: [
          {
            image: './static/widget/glasses_man_1.png',
            text: `Eyeglasses`,
            value: 210,
          },
          {
            image: './static/widget/glasses_man_2.png',
            text: `Sunglasses`,
            value: 211,
          },
        ],

        skip: {
          text: "I'd like to see both",
          value: null,
        },
      },
    },
    secondWoman: {
      header: { page: 2 },
      content: {
        text: 'What type of glasses are you looking for?',
        responses: [
          {
            image: './static/widget/glasses_woman_1.png',
            text: `Eyeglasses`,
            value: 210,
          },
          {
            image: './static/widget/glasses_woman_2.png',
            text: `Sunglasses`,
            value: 211,
          },
        ],

        skip: {
          text: "I'd like to see both",
          value: null,
        },
      },
    },
    betweenTwoThree: {
      header: { page: 3 },
      content: {
        text: `Let's get to know you!`,
      },

      timeout: 2 * 1000,
    },

    third: {
      header: { page: 3 },
      content: {
        text: 'Do you need vision correction?',
        responses: [
          {
            class: 'widget-single-response',
            text: `Yes`,
            value: true,
          },
          {
            class: 'widget-single-response',
            text: `No`,
            value: false,
          },
        ],

        skip: {
          text: 'Skip',
          value: false,
        },
      },
    },
    threePointTwo: {
      header: { page: 3 },
      content: {
        text: 'What do you need your glasses for?',
        responses: [
          {
            class: 'widget-single-response',
            text: `Near Vision`,
            value: 6,
          },
          {
            class: 'widget-single-response',
            text: `Distance Vision`,
            value: 6,
          },
          {
            class: 'widget-single-response',
            text: `Multifocal / Progressive`,
            value: 7,
          },
        ],

        skip: {
          text: 'Skip',
          value: null,
        },
      },
    },
    fourth: {
      header: { page: 4 },
      content: {
        text: 'What’s your current frame size?',
        image: './static/widget/lensWidth.png',
        responses: [
          {
            class: 'widget-response-small',
            text: `Small`,
            right: '42-48 mm',
            value: 68,
          },
          {
            class: 'widget-response-small',
            text: `Medium`,
            right: '49-53 mm',
            value: 67,
          },
          {
            class: 'widget-response-small',
            text: `Large`,
            right: '54-58 mm',
            value: 66,
          },
        ],

        skip: {
          text: 'I don’t know',
          value: null,
        },
      },
    },
    fourthPointTwo: {
      header: { page: 4 },
      content: {
        text: 'How wide would you say your face is?',
        responses: [
          {
            class: 'widget-single-response',
            text: `Wider Than Average`,
            value: 68,
          },
          {
            class: 'widget-single-response',
            text: `Average`,
            value: 67,
          },
          {
            class: 'widget-single-response',
            text: `Narrower Than Average`,
            value: 66,
          },
        ],

        skip: {
          text: 'I’m not sure',
          value: null,
        },
      },
    },
    betweenFour: {
      header: { page: 4 },
      content: {
        text: `No worries, we’ve got you!`,
      },

      timeout: 2 * 1000,
    },
    fifthEyeglasses: {
      header: { page: 5 },
      content: {
        text: 'Would you like to protect your eyes from light emanating from screens?',
        responses: [
          {
            class: 'widget-single-response',
            text: `Yes`,
            value: true,
          },
          {
            class: 'widget-single-response',
            text: `No`,
            value: false,
          },
        ],
      },
    },
    fifthSunglasses: {
      header: { page: 5 },
      content: {
        text: 'When you’re out and about, which shade of lenses do you prefer?',
        responses: [
          {
            image: './static/widget/darkShade.png',
            class: 'widget-response-image-left',
            text: `Dark Shade`,
            value: 'dark',
          },
          {
            image: './static/widget/lightShade.png',
            class: 'widget-response-image-left',
            text: `Light Shade`,
            value: 'light',
          },
          {
            image: './static/widget/transitioningShade.png',
            class: 'widget-response-image-left',
            text: `Transitioning Shade`,
            value: 'transition',
          },
        ],
      },
    },
    sixthMan: {
      header: { page: 6 },
      content: {
        text: 'When you’re out and about, which shade of lenses do you prefer?',
        responses: [
          {
            image: './static/widget/faceShapes/longFaceMan.png',
            class: 'widget-response-image-left',
            text: `I have a long face`,
            value: 'long',
          },
          {
            image: './static/widget/faceShapes/roundFaceMan.png',
            class: 'widget-response-image-left',
            text: `I have a round face`,
            value: 'round',
          },
          {
            image: './static/widget/faceShapes/inBetweenFaceMan.png',
            class: 'widget-response-image-left',
            text: `In between`,
            value: 'between',
          },
        ],
        skip: {
          text: 'I don’t know',
          value: null,
        },
      },
    },
    sixthWoman: {
      header: { page: 6 },
      content: {
        text: 'When you’re out and about, which shade of lenses do you prefer?',
        responses: [
          {
            image: './static/widget/faceShapes/longFaceWoman.png',
            class: 'widget-response-image-left',
            text: `I have a long face`,
            value: 'long',
          },
          {
            image: './static/widget/faceShapes/longFaceWoman.png',
            class: 'widget-response-image-left',
            text: `I have a round face`,
            value: 'round',
          },
          {
            image: './static/widget/faceShapes/longFaceWoman.png',
            class: 'widget-response-image-left',
            text: `In between`,
            value: 'between',
          },
        ],
        skip: {
          text: 'I don’t know',
          value: null,
        },
      },
    },
    sixthBoth: {
      header: { page: 6 },
      content: {
        text: 'When you’re out and about, which shade of lenses do you prefer?',
        responses: [
          {
            image: './static/widget/faceShapes/longFaceBoth.png',
            class: 'widget-response-image-left',
            text: `I have a long face`,
            value: 'long',
          },
          {
            image: './static/widget/faceShapes/roundFaceBoth.png',
            class: 'widget-response-image-left',
            text: `I have a round face`,
            value: 'round',
          },
          {
            image: './static/widget/faceShapes/inBetweenBoth.png',
            class: 'widget-response-image-left',
            text: `In between`,
            value: 'between',
          },
        ],
        skip: {
          text: 'I don’t know',
          value: null,
        },
      },
    },

    seventh: {
      header: { page: 7 },
      content: {
        text: 'When you’re out and about, which shade of lenses do you prefer?',
        responses: [
          {
            class: 'widget-single-response',
            text: `Sharp`,
            value: 'sharp',
          },
          {
            class: 'widget-single-response',
            text: `Rounded`,
            value: 'rounded',
          },
          {
            class: 'widget-single-response',
            text: `In between`,
            value: 'between',
          },
        ],
        skip: {
          text: 'I don’t know',
          value: null,
        },
      },
    },

    eighth: {
      header: { page: 8 },
      content: {
        images: [
          {
            text: 'Rectangle',
            image: './static/widget/glasses/rectangle.png',
            value: 'rectangle',
          },
          {
            text: 'Browline',
            image: './static/widget/glasses/browline.png',
            value: 'rowline',
          },
          {
            text: 'Aviator',
            image: './static/widget/glasses/aviator.png',
            value: 'aviator',
          },
          {
            text: 'Geometric',
            image: './static/widget/glasses/geometric.png',
            value: 'geometric',
          },
          {
            text: 'Wayframe',
            image: './static/widget/glasses/wayframe.png',
            value: 'wayframe',
          },
          {
            text: 'Round',
            image: './static/widget/glasses/round.png',
            value: 'round',
          },
          {
            text: 'Oval',
            image: './static/widget/glasses/oval.png',
            value: 'oval',
          },
          {
            text: 'Oversized',
            image: './static/widget/glasses/oversized.png',
            value: 'oversized',
          },
          {
            text: 'Cat Eye',
            image: './static/widget/glasses/catEye.png',
            value: 'cat_eye',
          },

          {
            text: 'Rimless',
            image: './static/widget/glasses/rimless.png',
            value: 'rimless',
          },
          {
            text: 'Square',
            image: './static/widget/glasses/square.png',
            value: 'square',
          },
          {
            text: 'Wrap',
            image: './static/widget/glasses/wrap.png',
            value: 'wrap',
          },
        ],
      },
    },

    ninth: {
      header: { page: 9 },

      content: {
        text: 'Are you looking for any particular eyewear brands?',
        responses: [
          {
            class: 'widget-single-response',
            text: `Yes, I have some in mind`,
            value: true,
          },
          {
            class: 'widget-single-response',
            text: `No, brand isn't important`,
            value: false,
          },
        ],
      },
    },

    tenth: {
      header: { page: 10 },
      content: {
        images: [
          {
            image: './static/widget/brands/rayBan.png',
            value: 'ray_ban',
          },
          {
            image: './static/widget/brands/oakley.png',
            value: 'oakley',
          },
          {
            image: './static/widget/brands/gucci.png',
            value: 'gucci',
          },
          {
            image: './static/widget/brands/armaniExchange.png',
            value: 'armani_exchange',
          },
          {
            image: './static/widget/brands/hilaryDuff.png',
            value: 'hilary_duff',
          },
          {
            image: './static/widget/brands/prada.png',
            value: 'prada',
          },
          {
            image: './static/widget/brands/versace.png',
            value: 'versace',
          },
          {
            image: './static/widget/brands/vogue.png',
            value: 'vogue',
          },
          {
            image: './static/widget/brands/michaelKors.png',
            value: 'michael_kors',
          },
          {
            image: './static/widget/brands/coach.png',
            value: 'coach',
          },

          {
            image: './static/widget/brands/toryBurch.png',
            value: 'tory_burch',
          },
          {
            image: './static/widget/brands/burberry.png',
            value: 'burberry',
          },
        ],
      },
    },

    end: {
      header: { page: 10 },
    },
  },
}

export { widgetOptions }
