function RequestMapping(subpath,method) {
  console.log('RequestMapping', subpath,method);

  return function decorator(target, name, descriptor) {
    console.log('decorator', name,descriptor);
    if(descriptor){
      // 修饰方法
      let fun = descriptor.value;
      descriptor.value = function newValue() {
        console.log(name, '', arguments);
        let rs = fun.apply(this, [].slice.call(arguments))
        rs.method = method || 'POST';
        rs.path = '/' + (this.url + subpath).split('/').filter(a => a).join('/');
        return this._fetch(rs);
      };
      return descriptor;
    }else{
      // 修饰类
      return function(args){
        return new target(Object.assign({url:subpath},args));
      }
    }
  };
}

function rpc(subpath, method) {
  console.log('rpc', arguments);
  return function decorator(target, name, descriptor) {
    console.log('decorator', arguments);
    let fun = descriptor.value;
    descriptor.value = function newValue() {
      console.log(name, '', arguments);
      let rs = fun.apply(this, [].slice.call(arguments))
      rs.method = method || 'POST';
      rs.path = '/' + (this.url + subpath).split('/').filter(a => a).join('/');
      return this._fetch(rs);
    };
    return descriptor;
  };
}

export { RequestMapping, rpc };
