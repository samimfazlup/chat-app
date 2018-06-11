
const socket = io();
function scrollToBottom(){
  //selector
  const messages = jQuery('#messages'); 
  const newMessage = messages.children('li:last-child');
  //Heights
  const clientHeight = messages.prop('clientHeight');
  const scrollTop = messages.prop('scrollTop');
  const scrollHeight = messages.prop('scrollHeight');
  const newMessageHeight= messages.innerHeight();
  const lastMessageHeight = newMessage.prev().innerHeight();
  if(clientHeight + scrollTop + newMessageHeight  >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}
 socket.on('connect', ()=>{
  //console.log('Connected to server');

  const params = jQuery.deparam(window.location.serach);
  socket.emit('join', params, function(err){
    if(err){
      alert(err);
      }else{
        console.log('No error');
      }
  });
  socket.on('updateUserList', function( users){
    const ol = jQuery('<ol></ol>');
    users.forEach(user =>{
      ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
  })
  socket.on('newMessage', function(message){
    //console.log('newMessage', message);
    const formattedTime = moment(message.createAt).format('h:mm a');
    const template = jQuery('#message-template').html();
    const html = Mustache.render(template,{
      text: message.text,
      from: message.from,
      createAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
  });
  socket.on('newLocationMessage', function(message){
    const formattedTime = moment(message.createAt).format('h:mm a');
    const template = jQuery('#location-message-template').html();
    const html = Mustache.render(template,{
      from: message.from,
      url:message.url,
      createAt: formattedTime
    });
    jQuery('#messages').append(html);
    scrollToBottom();
  });
  jQuery('#message-form').on('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage', {
     
      text: jQuery('[name=message]').val()
    }, function(){
      jQuery('[name=message]').val('');
    });
  });
  const locationBtn = jQuery('#send-location');
  locationBtn.on('click', function(){
    if(!navigator.geolocation){
      return alert('Geolocation not supported by your browser');
    }
    locationBtn.attr('disabled', 'disabled').text('sending location...');
    navigator.geolocation.getCurrentPosition(function(position){
      locationBtn.removeAttr('disabled').text('send location');
      //console.log(position);
      socket.emit('createLocationMessage',{
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    }, function(){
      locationBtn.removeAttr('disabled').text('send location');
      alert('Unable to fetch Location');
    }
  );
  })
 socket.on('disconnect', ()=>{
   console.log('Disconnected from server')
 })
});
