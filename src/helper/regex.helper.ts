const password =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

const hexColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export const RegExHelper = {
  password,
  hexColor,
};
