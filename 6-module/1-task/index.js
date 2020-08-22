/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
     *          name: '',
     *          age: 25,
     *          salary: '1000',
     *          city: 'Petrozavodsk'
     *   },
 *
 * @constructor
 */
/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      },ы
 *
 * @constructor
 */
export default class UserTable {
  get elem() {
    return this._elem;
  }

  constructor(rows) {
    this.createTable(rows);
    this._elem.addEventListener('click', (event) => this.clickDelete(event));
  }

  createTable(rows) {
    let table = document.createElement('table');
    let thead = `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>  
      </thead>
    `;
    table.insertAdjacentHTML('afterBegin', thead);

    let tableRows = rows.map(item => {
      let row = document.createElement('tr');
      for (let key in item){
        row.insertAdjacentHTML('beforeend', `<td>${item[key]}</td>`);
      }
      row.insertAdjacentHTML('beforeend', `<td><button>X</button></td>`)
      return row.outerHTML;
    }).join('');
    
    let tbody = `
      <tbody>
        ${tableRows}
      </tbody>
    `;

    table.insertAdjacentHTML('beforeEnd', tbody);
    this._elem = table;
  }

  clickDelete(event) {
    if(event.target.closest('button')) {
      event.target.closest('tr').remove();
    }
  }
}
