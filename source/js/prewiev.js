const FILE_TYPES = ['gif', 'jpeg', 'jpg', 'png']
const adForm = document.querySelector('.ad-form');
const avatarInput = adForm.querySelector('.ad-form-header__input');
const avatarPreview = adForm.querySelector('.ad-form-header__preview img');
const housePhotoInput = adForm.querySelector('.ad-form__input');
const housePhotoPrewiev = document.createElement('img');

avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if(matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result
      avatarPreview.setAttribute('width', '70');
      avatarPreview.setAttribute('height', '70');
    })

    reader.readAsDataURL(file);
  }
});

housePhotoInput.addEventListener('change', () => {
  const file = housePhotoInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if(matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      housePhotoPrewiev.src = reader.result
      housePhotoPrewiev.setAttribute('width', '70');
      housePhotoPrewiev.setAttribute('height', '70');
      adForm.querySelector('.ad-form__photo').appendChild(housePhotoPrewiev);
    })

    reader.readAsDataURL(file);
  }
});
