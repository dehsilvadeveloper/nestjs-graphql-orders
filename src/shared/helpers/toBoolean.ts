export const toBoolean = (value: string | number | boolean): boolean => {
  const truthyValues: (string | number | boolean)[] = [true, 'true', 'True', 'TRUE', '1', 1];

  return truthyValues.includes(value);
};
