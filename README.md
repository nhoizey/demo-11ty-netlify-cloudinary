# demo-11ty-netlify-cloudinary

This is a demonstration of how to get an optimized performance with responsive images while letting content author writing simple Markdown.

It uses:

- [Eleventy](https://11ty.dev/) as Static Site Generator, with my responsive images plugin [eleventy-plugin-images-responsiver](https://nhoizey.github.io/images-responsiver/eleventy-plugin-images-responsiver/)
- [Cloudinary](https://nho.io/cloudinary-signup) to resize and optimize images,
- and [Netlify](https://netlify.com/) for building and hosting the site, and proxying requests to Cloudinary, as shown by [Phil Hawksworth](https://twitter.com/philhawksworth/status/1328340868726726656) and [Tim Kadlec](https://timkadlec.com/remembers/2020-11-17-netlify-proxy-requests/).

After configuring the plugin, I "just" had to write this in the Markdown content:

```markdown
![Eleventy](/images/eleventy.png){.logo}
```

To get this responsive image in the HTML:

```html
<img
  src="https://demo-11ty-netlify-cloudinary.netlify.app/responsive/320/images/eleventy.png"
  alt="Eleventy"
  class="logo"
  srcset="
    https://demo-11ty-netlify-cloudinary.netlify.app/responsive/90/images/eleventy.png   90w,
    https://demo-11ty-netlify-cloudinary.netlify.app/responsive/168/images/eleventy.png 168w,
    https://demo-11ty-netlify-cloudinary.netlify.app/responsive/245/images/eleventy.png 245w,
    https://demo-11ty-netlify-cloudinary.netlify.app/responsive/323/images/eleventy.png 323w,
    https://demo-11ty-netlify-cloudinary.netlify.app/responsive/400/images/eleventy.png 400w
  "
  sizes="(min-width: 47rem) 10rem, (min-width: 30rem) calc((90vw - 1rem) / 4), calc((90vw - 1rem) / 2)"
  data-pristine="https://demo-11ty-netlify-cloudinary.netlify.app/images/eleventy.png"
  loading="lazy"
  width="480"
  height="400"
/>
```
