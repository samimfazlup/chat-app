const expect = require('expect');
const { Users } = require('./user');
describe('Users', ()=>{
  let users;
  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }]; 
  });
  it('should add new user', ()=>{
    const users = new Users();
    const user = {
      id: '1223',
      name: 'samim',
      room: 'The office fans'
    }
    const resUser = users.addUser(user.id, user.name, user.room );
    //console.log(users)
    expect(users.users).toEqual([user]);
  });
  it('should remove a user',()=>{
    const userId = '1';
    const user = users.removeUser(userId);
    expect(user.id).toBe(userId);
    console.log(users)
    expect(users.users.length).toBe(2);
  });
  it('should not remove a user',()=>{
    const userId = '99';
    const user = users.removeUser(userId);
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });
  it('should find user', ()=>{
    const userId = '2';
    const user = users.getUser(userId);
    //console.log(user); 
    expect(user.id).toBe(userId)
  });
  it('should not find user', () => {
    var userId = '99';
    var user = users.getUser(userId);

    expect(user).toNotExist();
  });
  it('should return name for node course', ()=>{
    const userList = users.getUserList('Node Course');
    expect(userList).toEqua;(['Mike', 'Julie'])
  });
  it('should return name for react course', ()=>{
    const userList = users.getUserList('React Course');
    expect(userList).toEqua;(['Jen'])
  });
})