const qs = (e) => document.querySelector(e);
const ce = (e) => document.createElement(e);

const form = document.querySelector('form');

const message = {
  verify() {
    let messageText = form.querySelector('textarea');
    if (!messageText.value.length > 0) {
      return false;
    }
    return true;
  },
  send() {

  },
  make(text, type="me") {
    let time = new Date();
    let hour = time.getHours();
    let minute = time.getMinutes();

    hour = String(hour).length == 1 ? `0${hour}` : hour;
    minute = String(minute).length == 1 ? `0${minute}` : minute;

    time = `${hour}:${minute}`;
    let divMessageBox = ce('div');
    let divMessage = ce('div');
    let messageText = ce('p');
    let spanHour = ce('span');
    divMessageBox.classList.add('message_box')
    divMessageBox.classList.add(type)
    divMessage.classList.add('message')
    messageText.classList.add('message_text')
    spanHour.classList.add('hour_message_text')

    messageText.innerText = text;
    spanHour.innerText = time;

    divMessage.appendChild(messageText);
    divMessage.appendChild(spanHour);
    divMessageBox.appendChild(divMessage);

    return divMessageBox;
  },
  render(message) {
    let boxMessages = document.querySelector('.messages_view');
    boxMessages.appendChild(message)
    form.querySelector('textarea').value = ''
    boxMessages.scrollBy(0, boxMessages.scrollHeight)
  }
}

const contacts = {
  async get() {
    let contacts = await fetch(
      'http://localhost:4000/getcontacts', {
      method: 'POST',
      headers: {
      'Access-Control-Allow-Origin': 'http://localhost:4000'
    }
  })

    return await contacts.json();
  },
  make({name, hour="", lastMessage=""}) {
    let contactItem = ce('div')
    let divLeft = ce('div')
    let divName = ce('div')
    let h4Name = ce('h4')
    let spanLastMessage = ce('span')
    let spanHourMessage = ce('span')
    let p1 = ce('p')
    let p2 = ce('p')

    contactItem.classList.add('contact_item')
    divLeft.classList.add('left')
    divName.classList.add('contact_name')
    spanLastMessage.classList.add('last_message');
    spanHourMessage.classList.add('hour_message');

    h4Name.innerText = name;
    p1.innerText = lastMessage;
    p2.innerText = hour

    divName.appendChild(h4Name)
    spanLastMessage.appendChild(p1)
    spanHourMessage.appendChild(p2)
    divLeft.appendChild(divName)
    divLeft.appendChild(spanLastMessage)
    contactItem.appendChild(divLeft)
    contactItem.appendChild(spanHourMessage)

    return contactItem;
  },
  render(contact) {
    let contactList = qs('.contacts_list')
    contactList.appendChild(contact);
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let messageText = form.querySelector('textarea').value;
  if (message.verify()) {
    message.render(message.make(messageText));
  }
})

contacts.get()
  .then(contactList => {
    contactList = contactList.contacts
    contactList.forEach(contact => {
      contacts.render(contacts.make(contact));
    })
  })

const sbm = qs('.messages_view');
sbm.scrollBy(0, sbm.scrollHeight)