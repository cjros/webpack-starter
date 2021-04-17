import '../styles/index.scss';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

class TestModel {
  constructor() {

    const baseUrl = window.location.origin;
    const hashedUrl = window.location.hash;
    
    this._urlDataStore = window.localStorage;

    this.shortenButton = document.querySelector('#shortenUrl-btn');
    this.urlTextBox = document.querySelector('#rawUrlText');
    this.shortenedUrlReadOnly = document.querySelector('#shortenedUrl');

    if (hashedUrl !== '') {
      this.returnShortenUrl(hashedUrl);
    }

    this.shortenButton.addEventListener('click', (event) => {
      event.stopPropagation();
      const safeUrl = encodeURIComponent(this.urlTextBox.value);

      let shortUrlGenerated = this.generateShortUrl();
      this._urlDataStore.setItem(shortUrlGenerated, safeUrl);

      this.shortenedUrlReadOnly.value = `${baseUrl}${shortUrlGenerated}`;
    });

    window.addEventListener('hashchange', (event) => {
      console.log(event);
      this.returnShortenUrl(window.location.hash);
    });
  }

  generateShortUrl(encodedRawUrlText) {
      return '#' + Math.random().toString(16).substr(2, 8);
  }

  returnShortenUrl(hashedUrl) {
    const retrievedShortenedUrl = this._urlDataStore.getItem(hashedUrl);
    window.location.replace(decodeURIComponent(retrievedShortenedUrl));
  }
}

const made = new TestModel();
