import {Collection,Model,RequestMapping} from '../src';

@RequestMapping('/users')
class Users extends Collection{ }


let users = new Users();
