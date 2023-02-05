const authorizationForm = document.getElementById('authorization-user')
const wrapForm = document.getElementById('form-container')
const loginForm = document.getElementById('login')
const passwordForm = document.getElementById('password')
const btnForm = document.getElementById('btn-form')
let validMessage = document.querySelector('.message-valid')

function toggleLoader(boolean) {
    const loader = document.getElementById('loader')
    btnForm.disabled = boolean;
    loader.classList.toggle('show')
}

authorizationForm.addEventListener('submit', (e) => {
e.preventDefault()
async function testFun() {
    let expectation = fetch(`https://test-works.pr-uni.ru/api/login/index.php?login=${loginForm.value}&password=${passwordForm.value}`)
    toggleLoader(true)
    let pending = await expectation
    toggleLoader(false)
    return expectation
}
testFun().then((response) => response.json())
.then((json) => {
  if(json.status == 'error'){
      validMessage.textContent = json.errorMessage
      validMessage.style.display = 'block'
      loginForm.classList.add('mistake')
      passwordForm.classList.add('mistake')
  }else if(json.status == 'ok'){
      validMessage.style.display = 'none'
      loginForm.classList.remove('mistake')
      passwordForm.classList.remove('mistake')
      document.cookie = `token=${json.token}`
      authorizationForm.style.display = 'none'
      wrapForm.insertAdjacentHTML('beforeEnd',`<p class="success-message">${json.user.name}, Вы успешно авторизованы!</p>`)
  }
});
})

