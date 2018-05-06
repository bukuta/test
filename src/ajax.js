/**
 * fetch as default
 */
//import ajax from '$foreground/server/services/ajax';
let ajax = {
  request(options) {
    console.log('ajax.request',options);
    return Promise.resolve({});
  }
};

let _request = ajax.request;
ajax.request = function() {
  return _request.call(ajax, ...arguments).then(rs => {
    if (rs instanceof Error) {
      throw rs;
    }
    return rs;
  }, err => {
    throw err;
  });
}

export { ajax };
