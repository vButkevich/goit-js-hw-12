'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function showInfo(message, position = 'center') {
  iziToast.info({
    title: 'Info',
    message: message,
    position: position,
  });
}
export function showError(message, position = 'center') {
  iziToast.error({
    title: 'Error',
    message: message,
    position: position, //'topCenter',
  });
}
