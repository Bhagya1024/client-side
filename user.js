const userno=document.querySelector('#userno');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('http://localhost:3000/api/usercount');
    const data = await response.json();
    if (response.ok) {
      userno.innerHTML = data.count;
      console.log(data)
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error('Error fetching user count: ', error);
  }
});


const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password');
const loginBtn = document.querySelector('#loginbtn');
const errormsg = document.querySelector('#errormsg');
const modal = document.querySelector('#modal');

loginBtn.addEventListener('click', async () => {
  try {
    console.log('inside login btn click')
    const email = emailInput.value;
    const password = passwordInput.value;

    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();
    if (response.ok) {
      window.location.href = 'index.html';
    } else {
     
      errormsg.style.display='block';
      modal.style.marginTop='40px';
    }
  } catch (error) {
    console.error('Error logging in: ', error);
    alert('Error logging in. Please try again.');
  }
});
