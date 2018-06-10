import {
  GENERATE_MAIN_PASSWORD,
  GENERATE_PASSWORD_LIST,
  SET_GENERATION_ERROR
} from './constants';

import generatePassword from '../app/generatePassword';

function generate(options) {
  try {
    return generatePassword(options);
  } catch (err) {
    if (typeof err === 'string') {
      throw err;
    } else {
      console.error(err);
    }
  }
}

export const generateMainPassword = (options) => {
  try {
    return {
      type: GENERATE_MAIN_PASSWORD,
      payload: generate(options)
    };
  } catch (err) {
    return setPasswordError(err);
  }
};

export const generatePasswordList = (amount, options) => {
  try {
    const fields = [];

    for (let i=0; i<amount; i++) {
      fields.push({
        name: `name${i+1}`,
        length: 8,
        value: generate(options)
      });
    }

    return {
      type: GENERATE_PASSWORD_LIST,
      payload: fields
    };
  } catch (err) {
    return setPasswordError(err);
  }
};

export const setPasswordError = (payload) => ({
  type: SET_GENERATION_ERROR,
  payload
});
