import {Base} from './Base';

import {Model as BaseModel} from './Model';

class Collection extends Base {
  constructor(options = {}) {
    super({
      url: options.url || 'todo'
    });
    this._items = null;
    this._page = 1;
    this._pagesize = 20;
    this._Model = options && options.model || BaseModel;
    this._idAttribute = options && options.idAttribute || 'id';
  }
  set page(pg) {
    this._page = pg;
  }
  get page() {
    return this._page;
  }
  set pageSize(ps) {
    this._pageseize = ps;
  }
  get pageSize() {
    return this._pagesize;
  }
  get total() {
    return thiks._total;
  }

  get idAttribute() {
    return this._idAttribute || 'id';
  }
  get params() {
    let limit = this.pageSize;
    let offset = Math.max(this.page - 1, 0) * this.pageSize;
    return Object.assign({}, this._params, {
      //page: this.page,
      //pagesize: this.pageSize,
      limit,
      offset,
    });
  }

  fetch() {
    return super.fetch().then(rs => {
      this._items = rs.items;
      this._total = rs.total;
      return rs;
    });
  }
  create(payload) {
    return ajax.request({
      path: this.url,
      query: this.params,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      //payload: JSON.stringify(payload),
      body: JSON.stringify(payload),
    }).then(rs => {
      return rs;
    });
  }
  destory(payload) {
    return ajax.request({
      path: this.url + '/',
      query: this.params,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      //payload: JSON.stringify(payload),
      body: JSON.stringify(payload),
    }).then(rs => {
      return rs;
    });
  }
  select(id) {
    let idAttribute = this.idAttribute;
    let rs = (this._items || []).filter(it => it[idAttribute] == id)
    let target = rs && rs[0];
    let url = `${this.url}/${id}`;
    let model = new this._Model({
      url: url,
      item: target
    });
    return model;
  }
}

export {Collection};
