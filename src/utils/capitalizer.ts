/**
 * Convierte la primera letra de un string en mayúscula.
 * @param str Recibe un string.
 * @returns Retorna el string con la primera letra en mayúscula.
 */
const capitalizer = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export default capitalizer;
