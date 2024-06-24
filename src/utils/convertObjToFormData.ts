export const objectToFormData = (obj: Record<string, any>) => {
  const formData = new FormData();

  Object.keys(obj).forEach(key => {
    formData.append(key, obj[key]);
  });

  return formData;
};
