import BoardAPI from "../api/boardApi.js";
import DropZone from "./dropZone.js";
import Item from "./items.js";

export default class Column {
  constructor(id, title) {
    const topDropZone = DropZone.createDropZone();

    this.elements = {};
    this.elements.root = Column.createRoot();
    this.elements.title = this.elements.root.querySelector(
      ".board__column-title"
    );
    this.elements.items = this.elements.root.querySelector(
      ".board__column-items"
    );
    this.elements.addItem =
      this.elements.root.querySelector(".board__add-item");

    this.elements.root.dataset.id = id;
    this.elements.title.textContent = title;
    this.elements.items.appendChild(topDropZone);

    this.elements.addItem.addEventListener("click", () => {
      const btnItem = document.querySelector("#modal--button");
	  if(btnItem){
		btnItem.addEventListener('click', textFun);
	  }
	  
	  
	  function textFun(){
		  
		  
		const textField = document.querySelector("#name-inp").value;

		const newItem = BoardAPI.insertItem(id, textField);
		this.renderItem(newItem)
		
	  }
    });

    const render = () => BoardAPI.getItems(id).forEach((item) => {
      this.renderItem(item);
    });
	render();
  }

  static createRoot() {
    const range = document.createRange();

    range.selectNode(document.body);

    return range.createContextualFragment(`
			<div class="board__column">
				<div class="board__column-title"></div>
				<div class="board__column-items"></div>
				<button class="board__add-item btn btn-primary" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">+ Add Card</button>
			</div>
		`).children[0];
  }

  renderItem(data) {
    const item = new Item(data.id, data.content);

    this.elements.items.appendChild(item.elements.root);
  }

}
