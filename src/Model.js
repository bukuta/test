import {Base} from './Base';

class Model extends Base {
  constructor({url, item,idAttribute='id'}) {
    super({
      url: url
    });
    this.idAttribute=idAttribute||'id';
    this._item = item;
  }
  get id() {
    return this._item && this._item[this.idAttribute];
  }
  fetch() {
    return super.fetch().then(rs => {
      this._item = rs;
      return rs;
    });
  }
  _getDiff(newObject, oldObject) {
    let diff = {};
    let originItem = this._item || {};
    Object.entries(payload).forEach(([k, v]) => {
      if (originItem[k] != v) {
        diff[k] = v;
      }
    });
    return diff;
  }
  update(payload) {
    delete payload.id;
    delete payload.creator;
    let data = payload;

    return ajax.request({
      path: this.url,
      //query: this.params,
      method: 'patch',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then(rs => {
      return rs;
    });
  }
  destory() {
    console.warn('model.destory', this.url);
    return ajax.request({
      path: this.url,
      //query: this.params,
      method: 'delete',
    }).then(rs => {
      return rs;
    });
  }
}

export {Model};
