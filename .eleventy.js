module.exports = function (eleventyConfig) {

  // Make simple images responsive for production
  if (process.env.NODE_ENV === 'production') {
    const imagesResponsiver = require('eleventy-plugin-images-responsiver');
    const imageSize = require('image-size');
    const site = 'https://demo-11ty-netlify-cloudinary.netlify.app';
    eleventyConfig.addPlugin(imagesResponsiver, {
      default: {
        selector: 'img',
        resizedImageUrl: (src, width) => src.replace(site, `${site}/responsive/${width}`),
        runBefore: (image, document) => {
          // A hook that is run before the transformation

          // Get current image's src value
          let imageSrc = image.getAttribute('src');

          // Compute the image's dimensions and add them to the HTML
          // to prevent layout shift and help compute srcset values
          let imageDimensions = imageSize('./src' + imageSrc);
          image.setAttribute('width', imageDimensions.width);
          image.setAttribute('height', imageDimensions.height);

          image.setAttribute('src', `${site}${imageSrc}`);

          // Get the class value and set it as a preset for Images Responsiver
          image.dataset.responsiver = image.className;
        },
      },
      logo: {
        fallbackWidth: 320,
        minWidth: 90, // width on a 240px viewport with 1dppx density
        maxWidth: 400, // width on a 479px viewport width 2dppx density
        sizes: '(min-width: 47rem) 10rem, (min-width: 30rem) calc((90vw - 1rem) / 4), calc((90vw - 1rem) / 2)',
        attributes: {
          loading: 'lazy'
        },
      }      
    });
  }

  // Add attributes support to Markdown-it
  const markdownIt = require("markdown-it");
  const markdownItAttributes = require('markdown-it-attrs');
  const markdownLib = markdownIt().use(markdownItAttributes);
  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig
    .addPassthroughCopy('src/images')
    .addPassthroughCopy('src/styles.css');

  return {
    passthroughFileCopy: true,
    dir: {
      output: 'dist',
      input: 'src'
    },
  };
};
