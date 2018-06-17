import {
  GENERATE_MAIN_PASSWORD,
  GENERATE_PASSWORD_LIST,
  SET_GENERATION_ERROR
} from './constants';

import generatePassword from '~/app/generatePassword';

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
    if (typeof err === 'string') {
      return setPasswordError(err);
    }

    throw err;
  }
};

export const generatePasswordList = (options, template, amount) => {
  function* createField(fields, total) {
    let i = 0;

    for (; i < fields.length; i++) {
      yield fields[i];
    }

    for (; i < total; i++) {
      yield { name: `name${i+1}`, length: null };
    }
  }

  try {
    const fields = [];

    const gen = createField(template, amount);

    const listLength = Math.max(template.length, amount);

    for (let i = 0; i < listLength; i++) {
      const fieldLength = template[i] ? template[i].length : null;

      options = { ...options, length: fieldLength };
      const password = generate(options);
      const newField = gen.next().value;

      fields.push({
        ...newField,
        value: password
      });
    }

    return {
      type: GENERATE_PASSWORD_LIST,
      payload: fields
    };
  } catch (err) {
    if (typeof err === 'string') {
      return setPasswordError(err);
    }

    throw err;
  }
};

export const setPasswordError = (payload) => ({
  type: SET_GENERATION_ERROR,
  payload
});
