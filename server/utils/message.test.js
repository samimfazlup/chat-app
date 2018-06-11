const expect = require('expect');
const { generateMessage } = require('./message');
const { generateLocationMessage } = require('./message');

describe('generateMessage',()=>{
  it('should generate correct message object', ()=>{
    const from  = 'Jen';
    const text = 'Some Message';
    const message = generateMessage(from, text);
    expect(message.createAt).toBeA('number');
    expect(message).toInclude({from, text})
  });

});

describe('generateLocationMessage', ()=>{
  it('should generate correct location object', ()=>{
    const from = 'Deb';
    const lat = 15;
    const lng = 19;
    const url = 'https://www.google.com/maps?q=15,19';
    const message = generateLocationMessage(from, lat, lng);
    expect(message.createAt).toBeA('number');
    expect(message).toInclude({
      from,
      url
    });
  });
})

