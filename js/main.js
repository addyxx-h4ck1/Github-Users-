const form = document.querySelector('form')
const input = document.getElementById('username')
const errMsg = document.getElementById('err-msg')
const submit = document.querySelector('.submit')
let parent = document.querySelector('main')
const error = document.querySelector('.err-block')
const loader = document.querySelector('.loader')
////get the user///////////
const getUser = (username) => {
  fetch(`https://api.github.com/users/${username}`).then((res) => {
    if (!res.ok) {
      error.style.display = 'flex'
      parent.innerHTML = error.innerHTML
      console.log(res)
    } else {
      const resJson = res.json()
      const userArr = [resJson]
      let userHtml = userArr.map((user) => {
        return `<section class="user-info">
        <div class="user-info-wrapper">
          <article class="col-1">
            <div class="image">
              <img
                src=${user.avatar_url}
                alt=${user.name}
              />
              <div class="github-banner">
                <img
                  src="https://i.pinimg.com/736x/b5/1b/78/b51b78ecc9e5711274931774e433b5e6.jpg"
                  alt="Github"
                />
              </div>
            </div>

            <h2 class="name">${user.name || `User ${user.id}`}</h2>
            <p class="bio">
              ${user.bio || `UserName ${user.login}`}
            </p>
            <div class="buttons">
              <button><a href=${user.html_url}>Follow User</a></button>
            </div>
          </article>
          <article class="col-2">
            <section class="basic-info">
              <div>
                <p class="info-txt-1">${user.followers}</p>
                <p class="info-txt">Followers</p>
              </div>
              <div>
                <p class="info-txt-1">${user.public_repos}</p>
                <p class="info-txt">Repos</p>
              </div>
              <div>
                <p class="info-txt-1">${user.following}</p>
                <p class="info-txt">Following</p>
              </div>
            </section>
            <section class="about-user">
              <p><strong>Name : </strong> ${user.name || `${user.login}`}</p>
              <p><strong>Works at : </strong> ${user.avatar_url || ''}</p>
              <p><strong>Email : ${user.email || ``}</strong></p>
              <p><strong>GitHub User-ID : </strong> ${user.id}</p>
              <p><strong>GitHub UserName : </strong> ${user.login}</p>
              <p><strong>location : </strong> ${user.location || ``}</p>
              <p><strong>Created on: </strong> ${user.created_at}</p>
              <p><strong>Updated on: </strong> ${user.updated_at}</p>
            </section>
          </article>
        </div>
      </section>`
      })
      userHtml.join('')
      parent.innerHTML = userHtml[0]
    }
  })
}

/////handle submit/////////////////
const handleSubmit = () => {
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    getUser(input.value)
  })
}

//////////if value is invalid don't submit else call  handle submit///////////
submit.addEventListener('click', () => {
  if (input.value === '') {
    submit.type = 'button'
    errMsg.style.display = 'block'
  } else {
    submit.type = 'submit'
    errMsg.style.display = 'none'
    handleSubmit()
  }
})
