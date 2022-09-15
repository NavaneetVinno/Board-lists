import DropZone from "./dropZone.js";

export default class List {
  constructor(root) {
    this.root = root;
    const topDropZone = DropZone.createDropZone();
    const lists = JSON.parse(localStorage.getItem("board"));
    console.log(lists);
    this.elements = {};
    this.elements.root = List.createRoot();
    this.elements.title = this.elements.root.querySelector(
      ".board__column-title"
    );
    this.elements.items = this.elements.root.querySelector(
      ".board__column-items"
    );
    this.elements.addItem =
      this.elements.root.querySelector(".board__add-item");

    lists.forEach(list => {
        this.elements.root.dataset.id = list.id;
        this.elements.title.textContent = list.title;
        this.elements.items.appendChild(topDropZone);
    });

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
}
