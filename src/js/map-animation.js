const TIMER_DELAY = 150;
const ANIMATION_ACTIVE_CLASS = 'active'
const MAX_COUNTRY_COUNT = 52;

const startAnimationElement = document.querySelector('.map-black__wrapper');
const countElement = document.querySelector('.map-black__count');

const countriesData = getCountriesData();

const mapObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const countryElements = Object.values(countriesData);
    entry.isIntersecting ? goAnimation(countryElements) : clearAnimation(countryElements);
  })
})

mapObserver.observe(startAnimationElement);

function clearAnimation(elements) {
  [].concat(...elements).forEach(el => el.classList.remove(ANIMATION_ACTIVE_CLASS));
}

/**
 * render-функция анимации с заданной задержкой
 * @param elements массив элементов анимации
 */
function goAnimation(elements) {
  let i = 0;

  function startLight() {
    countElement.innerHTML = (i + 1).toString();
    if (i === elements.length) {
      countElement.innerHTML = MAX_COUNTRY_COUNT.toString();
      return;
    }
    elements[i].forEach(el => el.classList.add(ANIMATION_ACTIVE_CLASS));
    i++;
    setTimeout(startLight, TIMER_DELAY);
  }

  setTimeout(startLight, TIMER_DELAY);
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
