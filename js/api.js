const getData = function (onSuccess, onError) {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => response.json())
    .then((json) => {
      onSuccess(json);
    })
    .catch(() => {
      onError('Произошла ошибка во время загрузки данных');
    })
}

const sendData = function (onSuccess, onError, body)  {
  fetch(
    'https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      //type: 'multipart/form-data',
      body: body,
    },
  )
    .then((response) => {
      if(response.ok) {
        onSuccess();
        return true;
      } else {
        onError();
      }
    })
    .catch(() => {
      onError();
    })

  return false;
}

export {getData, sendData}
