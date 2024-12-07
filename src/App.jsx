import React, { useState } from 'react';

import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const [visibleGoods, setVisibleGoods] = useState(goodsFromServer);
  const [isReversed, setIsReversed] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [showReset, setShowReset] = useState(false);
  const [sortedByLength, setSortedByLength] = useState(false);
  const [reverseCount, setReverseCount] = useState(0);

  const SortA = () => {
    const sorted = [...visibleGoods].sort((good1, good2) => {
      const alphabeticly = good1.localeCompare(good2);
      return alphabeticly;
    }
    );

    if (isReversed) {
      setVisibleGoods(sorted.reverse());
    } else {
      setVisibleGoods(sorted);
    }

    setActiveButton('SortA'); // Активуємо кнопку сортування
    setShowReset(true); // Показуємо кнопку Reset
    setSortedByLength(false); // Скидаємо флаг сортування за довжиною
  };

  // Функція сортування за довжиною
  const SortByLength = () => {
    if (sortedByLength) return; // Якщо вже сортували за довжиною, нічого не робимо

    const sorted = [...visibleGoods].sort((good1, good2) => {
      // Спочатку порівнюємо за довжиною
      const lengthComparison = good1.length - good2.length;

      // Якщо довжина однакова, порівнюємо за алфавітом
      if (lengthComparison === 0) {
        return good1.localeCompare(good2);
      }

      // Якщо довжина різна, повертаємо результат порівняння за довжиною
      return lengthComparison;
    });

    // Якщо масив вже був перевернутий, відновлюємо порядок після сортування
    if (isReversed) {
      setVisibleGoods(sorted.reverse());
    } else {
      setVisibleGoods(sorted);
    }

    setActiveButton('SortByLength'); // Активуємо кнопку сортування
    setShowReset(true); // Показуємо кнопку Reset
    setSortedByLength(true); // Встановлюємо флаг, що сортування за довжиною виконано
  };

  const Reverse = () => {
    setReverseCount(prevCount => prevCount + 1); // Збільшуємо лічильник натискань реверсу

    const newGoods = [...visibleGoods].reverse(); // Перевертаємо поточний порядок

    setVisibleGoods(newGoods); // Оновлюємо видимий масив
    setIsReversed(!isReversed); // Перемикаємо стан перевертання
    setSortedByLength(false); // Скидаємо флаг сортування за довжиною

    // Якщо не активні інші кнопки сортування, то після другого натискання реверсу приховуємо кнопку Reset
    if (reverseCount % 2 === 1 && !activeButton) {
      setShowReset(false); // Ховаємо кнопку Reset після другого натискання реверсу
    } else if (reverseCount % 2 === 1) {
      setShowReset(true); // Показуємо кнопку Reset, якщо були активні кнопки сортування
    } else {
      setShowReset(true); // Показуємо кнопку Reset після першого натискання
    }
  };

  const Reset = () => {
    setVisibleGoods(goodsFromServer); // Відновлюємо початковий масив
    setActiveButton(null); // Деактивуємо всі кнопки
    setIsReversed(false); // Скидаємо стан перевертання
    setShowReset(false); // Ховаємо кнопку Reset
    setSortedByLength(false); // Скидаємо флаг сортування за довжиною
    setReverseCount(0); // Скидаємо лічильник натискань реверсу
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${activeButton === 'SortA' ? '' : 'is-light'}`}
          onClick={SortA}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${activeButton === 'SortByLength' ? '' : 'is-light'}`}
          onClick={SortByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={Reverse}
        >
          Reverse
        </button>

        {showReset && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={Reset}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li data-cy="Good">{good}</li>
        ))}
      </ul>
    </div>
  );
};
