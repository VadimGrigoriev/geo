export default function parseCoordinates(input) {
  input = input.replace(/[\[\]]/g, '').trim();
  const regex = /^\s*(-?\d+(\.\d+)?)\s*,\s*(-?\d+(\.\d+)?)\s*$/;
  const match = input.match(regex);

  if (match) {
    return {
      latitude: parseFloat(match[1]),
      longitude: parseFloat(match[3]),
    };
  } else {
    console.error('Ошибка: введенные данные не соответствуют формату координат.');
    throw new Error('Недопустимый формат координат.');
  }
}
