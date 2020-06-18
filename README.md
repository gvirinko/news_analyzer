# News Analyzer
## A service to find out what is happening in the world

**Purpose:** This is my final project for the Frontend Development course led by [Yandex](https://praktikum.yandex.ru/).

**Description:**  The service defines how popular are the news on the given topic.
Upon clicking on Search button, two actions are performed:
- searching for all news via [NewsAPI](https://newsapi.org) containing the search word and displaying them as news cards;
- working with statistics: total number of news, total number of mentions in news titles and news distribution during the last seven days.

**Infrastructure:**
The site has been developed according to the BEM methodology, with reusable blocks and semantic tags.
A slider [Swiper](https://swiperjs.com/) is used to display my GitHub commits to this project.
Webpack hashing is supported for enabling auto-refresh when deploying locally.
Thanks to the browserslist plugin, the site is supported by 91.3% of the world browsers.
The project is adapted to different screen resolutions (320px, 768px and 1440px).
Images are optimized with the help of [TinyPNG](https://tinypng.com).

**JavaScript:**
- code is object-oriented and modular
- asynchronous requests to API
- news cards are added to DOM using JS
- preloader spins while waiting for a response from server
- click on a news card leads to opening the news source page
- data is transferred between pages using localStorage.

Production bundle is deployed to Github Pages via Webpack script.

**Instructions how to deploy project:**
- go to the project root in terminal;
- for local display: `npm run build && npm run dev`;
- for deployment on gh-pages: `npm run deploy`.

**Technologies Used:** HTML, CSS, JavaScript, GIT, Webpack.

Webpack minimizes (uglifies) and transpiles code, as well as sets vendor prefixes.
In this regard, the following plugins have been installed:

"devDependencies": {
    "@babel/cli": "^7.7.4",
    "@babel/core": "^7.7.4",
    "@babel/preset-env": "^7.7.4",
    "autoprefixer": "^9.7.2",
    "babel-loader": "^8.0.6",
    "css-loader": "^3.2.0",
    "cssnano": "^4.1.10",
    "file-loader": "^5.0.2",
    "gh-pages": "^2.0.1",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "image-webpack-loader": "^6.0.0",
    "mini-css-extract-plugin": "^0.8.0",
    "optimize-css-assets-webpack-plugin": "^5.0.3",
    "postcss-loader": "^3.0.0",
    "style-loader": "^1.0.0",
    "url-loader": "^3.0.0",
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10",
    "webpack-dev-server": "^3.9.0",
    "webpack-md5-hash": "0.0.6"
  },
  "dependencies": {
    "babel-polyfill": "^6.26.0",
    "browserslist": "^4.8.2",
    "core-js": "^3.4.1",
    "flickity": "^2.2.1",
    "normalize.css": "^8.0.1",
    "swiper": "^5.2.1"
  },
  "browserslist": [
    "defaults",
    "not IE 11",
    "not IE_Mob 11",
    "maintained node versions"
  ]
