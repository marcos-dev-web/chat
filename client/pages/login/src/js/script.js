const form = document.querySelector('form[action^="http://"]');
const button = document.querySelector('.go');
const inputs = [
  form.querySelector('#name'),
  form.querySelector('#pass')
]

const input = {
  block() {
    inputs.forEach(input => {
      input.setAttribute('disabled', '')
      input.classList.add('bloqued')
    });
    button.style.cursor = 'not-allowed';
    button.setAttribute('disabled', '')
  },
  unblock() {
    inputs.forEach(input => {
      input.removeAttribute('disabled')
      input.classList.remove('bloqued')
    });
    button.removeAttribute('style')
    button.removeAttribute('disabled')
  }
}

const verify = async () => {
  let usersGet = await fetch('http://localhost:4000/users', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:4000'
    }
  })
  let users = await usersGet.json()
  
  let inputName = form.querySelector('#name')
  let inputPass = form.querySelector('#pass')
  if (inputName.value.length < 3) {
    return [false, 'seu nome deve ter no minimo 3 caracters']
  }
  else if (inputPass.value.length < 8) {
    return [false, 'sua senha deve ter no minimo 3 caracters']
  }
  else if (!(users.every(user => user.name != inputName.value.toLowerCase()))) {
    return [false, 'esse nome de usuario ja existe!']
  }

  return [true];
}

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  input.block()
  let trying = await verify();
  console.log(trying)
  if (!trying[0]) {
    alert(trying[1])
    input.unblock() 
  } else {
    input.unblock()
    form.submit()
  }
})