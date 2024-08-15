import parseCoordinates from '../utils/parse-coordinates';

describe('parseCoordinates', () => {
  test('корректно обрабатывает координаты с пробелом', () => {
    const result = parseCoordinates('51.50851, -0.12572');
    expect(result).toEqual({ latitude: 51.50851, longitude: -0.12572 });
  });

  test('корректно обрабатывает координаты без пробела', () => {
    const result = parseCoordinates('51.50851,-0.12572');
    expect(result).toEqual({ latitude: 51.50851, longitude: -0.12572 });
  });

  test('корректно обрабатывает координаты в квадратных скобках', () => {
    const result = parseCoordinates('[51.50851, -0.12572]');
    expect(result).toEqual({ latitude: 51.50851, longitude: -0.12572 });
  });

  test('генерирует исключение при неправильном формате', () => {
    expect(() => {
      parseCoordinates('неправильный формат');
    }).toThrow('Недопустимый формат координат.');
  });

  test('генерирует исключение при отсутствии запятой', () => {
    expect(() => {
      parseCoordinates('51.50851 -0.12572');
    }).toThrow('Недопустимый формат координат.');
  });

  test('генерирует исключение при неполных координатах', () => {
    expect(() => {
      parseCoordinates('51.50851');
    }).toThrow('Недопустимый формат координат.');
  });
});
