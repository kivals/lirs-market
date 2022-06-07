const TIMER_DELAY = 300;
const btnStart = document.querySelector('.map-black__start');

btnStart.addEventListener('click', btnStartClick);

function btnStartClick() {
  const countries = getCountriesData();
  [].concat(...Object.values(countries)).forEach(el => el.classList.remove('active'));
  showCountriesLight(Object.values(countries), TIMER_DELAY);
}

/**
 * render-функция анимации с заданной задержкой
 * @param elements массив элементов анимации
 * @param delay задержка
 */
function showCountriesLight(elements, delay) {
  let i = 0;
  const activeClassName = 'active';

  function startLight() {
    if (i === elements.length) {
      return;
    }
    elements[i].forEach(el => el.classList.add(activeClassName));
    i++;
    setTimeout(startLight, delay);
  }

  setTimeout(startLight, delay);
}

/**
 * Сформировать объект хранения всех элементов анимации
 * @returns Объект html элементов, где свойство - название страны, значение - массив элементов этой страны
 */
function getCountriesData() {
  const countryElements = Array.from(document.querySelectorAll('path.country'));

  return countryElements.reduce((result, current) => {
    const name = current.dataset.country;
    result[name] = result[name] ? [...result[name], current] : [current];
    return result;
  }, {})
}

function removeClass(styleClass, elements) {

}





