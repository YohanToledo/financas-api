const password =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

const hexColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

const mysqlDate = /^\d{4}-\d{2}-\d{2}$/g;

export const RegExHelper = {
  password,
  hexColor,
  mysqlDate,
};
