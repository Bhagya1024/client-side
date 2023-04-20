const lessonno = document.querySelector('#lessonno');
const topic = document.querySelector('#topic');
const description = document.querySelector('#description');
const video = document.querySelector('#video');
const addBtn = document.querySelector('#addbtn');
const successmsg = document.querySelector('#successmsg');
const errormsg = document.querySelector('#errormsg');
const lessonsTable = document.querySelector('#lessonsTable tbody');
const lessonsform = document.querySelector('#addLessonForm ');
const lessonnoInput = document.querySelector('#lessonno');
const topicInput = document.querySelector('#topic');
const descriptionInput = document.querySelector('#description');
const videoInput = document.querySelector('#video');

// get all the btn-danger buttons
const deleteButtons = document.querySelectorAll('.deletebtn');


window.onload = async function() {
  try {
    const response = await fetch('http://localhost:3000/api/viewtutorials');
    const data = await response.json();

    console.log(data)
    if (response.ok) {
      const lessons = Object.values(data); // get an array of lesson objects
      lessons.forEach((lesson) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${lesson.lessonno}</td>
          <td colspan="2">${lesson.topic}</td>
          <td colspan="2">${lesson.description}</td>
          <td>${lesson.video}</td>
          <td  colspan="1"><button type="button" class="editbtn btn btn-primary" data-lessonno="${lesson.lessonno}"> <i class="fa-regular fa-pen-to-square"></i></button></td>
          <td  colspan="1"><button type="button" class="deletebtn btn btn-danger" data-lessonno="${lesson.lessonno}" style="margin-left: -46px;"><i class="fa-regular fa-trash-can"></i></button></td>
        `;
        lessonsTable.appendChild(row);
      });

      // get all the btn-danger buttons
      const deleteButtons = document.querySelectorAll('.deletebtn');

      deleteButtons.forEach((button) => {
        button.addEventListener('click', async () => {
         
          const lessonNo = button.dataset.lessonno;

          try {
            const response = await fetch(`http://localhost:3000/api/deletetutorial/${lessonNo}`, {
              method: 'DELETE',
            });
            const data = await response.json();

            if (response.ok) {
              // remove the table row from the UI
              button.closest('tr').remove();
              successmsg.style.display = 'block';
            } else {
              errormsg.style.display = 'block';
            }
          } catch (error) {
            console.error(error);
          }
        });
      });

      const editButtons = document.querySelectorAll('.editbtn');


      editButtons.forEach((button) => {
        button.addEventListener('click', async () => {
         
          const lessonno = button.dataset.lessonno;
          
          window.location.href = `/edittutorial.html?lessonno=${lessonno}`;
      
        });
      });


    } else {
      console.error('Error loading lessons: ', data.error);
    }
  } catch (error) {
    console.error('Error loading lessons: ', error);
  }
};


  
addBtn.addEventListener('click', async () => {


    try {
        const response = await fetch('http://localhost:3000/api/savetutorial', {
          method: 'POST',
          body: JSON.stringify({
            lessonno: lessonno.value,
            topic: topic.value,
            description: description.value,
            video:video.value
          }),
          headers: {
            'Content-Type': 'application/json'
          },
        });
        
        const data = await response.json();
    
        if (response.ok) {
            lessonno.value='';
            topic.value='';
            description.value='';
            video.value='';
            successmsg.style.display='block';
        } else {
            errormsg.style.display='block';
        }
      } catch (error) {
        console.error(error);
      }
    });

