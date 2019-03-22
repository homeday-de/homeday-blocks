export function email(string) {
  // eslint-disable-next-line
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(string.toLowerCase());
}

export function date(string) {
  // eslint-disable-next-line
  const regex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
  return regex.test(string);
}

export default {
  email,
  date,
};
