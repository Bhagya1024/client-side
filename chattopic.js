// get references to the input field and button
const inputField = document.querySelector('#ctopic');
const addBtn = document.querySelector('#addbtn');
const successmsg = document.querySelector('#successmsg');
const errormsg = document.querySelector('#errormsg');
// add event listener to the button
addBtn.addEventListener('click', () => {
  // retrieve the input value
  const topic = inputField.value;

  // send the topic to the server using fetch
  fetch('http://localhost:3000/api/savechattopic', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ topic:inputField.value })
  })
  .then(response => {
    if (response.ok) {
        inputField.value='';
        successmsg.style.display='block';
    } else {
        errormsg.style.display='block';
    }
  })
  .catch(error => {
    // handle network error
  });
});
