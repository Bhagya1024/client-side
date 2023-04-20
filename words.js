const word = document.querySelector('#word');
const meaning = document.querySelector('#meaning');
const pronunciation = document.querySelector('#pronunciation');
const addBtn = document.querySelector('#addbtn');
const successmsg = document.querySelector('#successmsg');
const errormsg = document.querySelector('#errormsg');



addBtn.addEventListener('click', async () => {
  try {
    const response = await fetch('http://localhost:3000/api/saveword', {
      method: 'POST',
      body: JSON.stringify({
        word: word.value,
        meaning: meaning.value,
        pronunciation: pronunciation.value,
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    
    const data = await response.json();

    if (response.ok) {
        word.value='';
        meaning.value='';
        pronunciation.value='';
        successmsg.style.display='block';
    } else {
        errormsg.style.display='block';
    }
  } catch (error) {
    console.error(error);
  }
});
