/**
 * Метод устанавливает необходимые по условию аттрибуты таблице
 * @param {Element} table
 */
function highlight(table) {
  for (let i = 1; i < table.rows.length; i++) {
    let currentRow = table.rows[i];
    let rowClass = currentRow.classList;
    let isAvailable = currentRow.cells[3].dataset.available;
    let gender = currentRow.cells[2].textContent;
    let age = currentRow.cells[1].textContent;

    if(!isAvailable) {
      currentRow.hidden = true;
    } else {
      isAvailable === 'true' ? rowClass.add('available') : rowClass.add('unavailable');
    }

    gender === 'm' ? rowClass.add('male') : rowClass.add('female');

    if(age < 18) {
      currentRow.setAttribute('style', 'text-decoration: line-through');
    }
  }
}
