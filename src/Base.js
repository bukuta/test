import {ajax} from './ajax';

class Base {
  constructor({url:url}) {
    this._url = url;
    this._params = {};
  }
  get params() {
    return Object.assign({}, this._params);
  }
  setParams(k, v) {
    if (typeof (k) != 'undefined' && typeof (v) != 'undefined') {
      this._params[k] = v;
    } else if (typeof (v) == 'undefined' && typeof (k) == 'object') {
      Object.assign(this._params, k);
    }
  }
  get url() {
    let ps = this.params;
    let url = typeof (this._url) == 'function' ? this._url() : this._url;
    return url;

    let qs = Object.entries(ps).map((k, v) => {
      return encodeURIComponent(k) + '=' + encodeURIComponent(v)
    }).join('&');

    if (qs) {
      return url + '?' + qs;
    } else {
      return url;
    }
  }

  set url(u) {
    this._url = u;
  }

  fetch(options) {
    options = Object.assign({
      path: this.url,
      query: this.params,
      method: 'GET'
    }, options);
    return ajax.request(options);
  }

  _fetch(options) {
    options = Object.assign({
      path: this.url,
      query: this.params,
      method: 'GET'
    }, options);
    return ajax.request(options);
  }
}
export {Base};
