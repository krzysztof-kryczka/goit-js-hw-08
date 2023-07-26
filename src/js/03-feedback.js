import throttle from 'lodash.throttle';

const KEY_FEEDBACK_FORM_STATE = 'feedback-form-state';
const THROTTLE_TIME = 500;
const form = document.querySelector('.feedback-form');
const { email, message } = form.elements;
const formData = getSavedFormData();

fillFormFromLocalStorage();
form.addEventListener('input', throttle(onInputForm, THROTTLE_TIME));
form.addEventListener('submit', onFormSubmit);

function getSavedFormData() {
  try {
    return JSON.parse(localStorage.getItem(KEY_FEEDBACK_FORM_STATE)) || {};
  } catch (error) {
    console.log(
      `${error.name}: ${error.message}\nLocal storage is probably corrupted and has been deleted, try again.`
    );
  }
  localStorage.removeItem(KEY_FEEDBACK_FORM_STATE);
}

function fillFormFromLocalStorage() {
  if (formData) {
    email.value = formData.email || '';
    message.value = formData.message || '';
  }
}

function onInputForm(e) {
  saveFormData(e.target.name, e.target.value);
}

function saveFormData(key, value) {
  formData[key] = value;
  localStorage.setItem(KEY_FEEDBACK_FORM_STATE, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();

  if (!email.value || !message.value) {
    return alert(`Please fill in all required fields.`);
  }

  console.log(formData);

  localStorage.removeItem(KEY_FEEDBACK_FORM_STATE);
  e.currentTarget.reset();
}
