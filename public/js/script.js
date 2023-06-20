const successDiv = document.getElementById("success");
const errorDiv = document.getElementById("error");
const postButton = document.getElementById('postButton')
const loading = document.getElementById('loadingWrap')

postButton.addEventListener('click', () => {
  const comment = document.getElementById('comment');
  if (comment.value === "") return;

  postButton.disabled = true
  startLoading();

  fetch('/comment', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      comment: comment.value
    })
  }).then(res => {
    if (res.status === 200 || res.status === 204) {
      comment.value = ''
      fadeInOutAnime(successDiv)
    } else {
      fadeInOutAnime(errorDiv)  
    }
  }).catch(error => {
    console.log(error)
    fadeInOutAnime(errorDiv)
  }).finally(() => {
    postButton.disabled = false
    stopLoading();
  })
})

const startLoading = () => {
  loading.style.display = 'block';
}

const stopLoading = () => {
  loading.style.display = 'none';
}

const fadeInOutAnime = elm => {
  elm.classList.add("fadeIn");
  setTimeout(() => {
    elm.classList.remove("fadeIn");
  }, 2000)
}