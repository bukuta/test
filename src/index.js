//import Vue from 'vue/dist/vue.js';
//import Vuex from 'vuex';

import {Collection} from './Collection';
import {Model} from './Model';
import {RequestMapping,rpc} from './rpc';

@RequestMapping('/users')
class Users extends Collection{

  @RequestMapping('/login','POST')
  login(){
    return {};
  }
}

@RequestMapping('/config')
class Config extends Model{

  @RequestMapping('/sync','PUT')
  sync(data){
    return {body:JSON.stringify(data)};
  }
}


let users = new Users();
console.log(users.url);
console.log(users.login());


let config = new Config();
console.log(config.url);
config.sync({name:'123'});
