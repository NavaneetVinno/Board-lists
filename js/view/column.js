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
    this.elements.deleteBtn = this.elements.root.querySelector(".delete-btn");

    this.elements.root.dataset.id = id;
    this.elements.title.textContent = title;
    this.elements.items.appendChild(topDropZone);

    this.elements.addItem.addEventListener("click", () => {
      const btnItem = document.querySelector("#modal--button");
      if (btnItem) {
        btnItem.addEventListener("click", textFun);
      }

      function textFun() {
        const textField = document.querySelector("#name-inp").value;
        const newItem = BoardAPI.insertItem(id, textField);
        this.renderItem(newItem);
      }
    });

    this.elements.deleteBtn.addEventListener("click", () => {
      BoardAPI.deleteList(id)

      this.elements.root.parentElement.removeChild(this.elements.root);
    });

    const render = () =>
      BoardAPI.getItems(id).forEach((item) => {
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
        <span class="">
        <button class="btn btn-danger delete-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill icon" viewBox="0 0 16 16">
  					<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
					</svg>
        </button>
        </span>
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
