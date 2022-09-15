import BoardAPI from "../api/boardApi.js";
import Column from "./column.js";

export default class Board {
  constructor(root) {
    this.root = root;

    let view;
    const arr = JSON.parse(localStorage.getItem("board"));
    const btn = document.querySelector(".add--list");
	if(btn){
		btn.addEventListener("click", addList);
	}

    function addList() {
      // read()
      const text = document.querySelector(".list--data").value;
      const id = Math.floor(Math.random() * 100000);
      const data = {
        id: id,
        title: text,
      };
      arr.push(data);
      const newColumn = BoardAPI.insertColumn(data.id, data.title);
	  Board.renderList(newColumn)
	  arr.forEach((column) => {
		BoardAPI.getColumns(column.id);
	  })

    //   arr.forEach((column) => {
    //     new Column(column.id, column.title);

    //     // this.root.appendChild(columnView.elements.root);
    //     // this.root.appendChild(view.elements.root);
    //   });
    }
    console.log(arr);

    arr.forEach((column) => {
      const columnView = new Column(column.id, column.title);

      this.root.appendChild(columnView.elements.root);
    });
  }

  static renderList(data) {
	const column = new Column(data.id, data.title);

    this.root.appendChild(column.elements.root);
  }
}
