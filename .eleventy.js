module.exports = function (eleventyConfig) {
  
  // Make simple images responsive for production
  if (process.env.NODE_ENV === 'production') {
    const imagesResponsiver = require('eleventy-plugin-images-responsiver');
    eleventyConfig.addPlugin(imagesResponsiver, {
      
    });
  }

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
