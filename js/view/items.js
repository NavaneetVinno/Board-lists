import DropZone from "./dropZone.js";
import BoardAPI from "../api/boardApi.js";


export default class Item {
	constructor(id, content) {
		const bottomDropZone = DropZone.createDropZone();

		this.elements = {};
		this.elements.root = Item.createRoot();
		this.elements.input = this.elements.root.querySelector(".board__item-input");
		this.elements.editBtn = this.elements.root.querySelector("#edit-btn");
		this.elements.deleteBtn = this.elements.root.querySelector("#delete-btn");

		this.elements.root.dataset.id = id;
		this.elements.input.textContent = content;
		this.content = content;
		this.elements.root.appendChild(bottomDropZone);

		
		const onEdit = () => {
			const done = document.getElementById("done-btn");
			done.classList.toggle("disabled")
			// console.log(done.classList.length);
			if(done.classList.length === 3){
				this.elements.input.contentEditable = true;
				const newContent = this.elements.input.textContent.trim();
	
				if (newContent == this.content) {
					return;
				}
				this.content = newContent;
	
				BoardAPI.updateItem(id, {
					content: this.content
				});
			}
			this.elements.input.contentEditable = false;
			
			done.addEventListener("click", () => {
				this.elements.input.contentEditable = false;
				const btn = document.querySelector("#done-btn")
				btn.classList.add("disabled");

				// this.elements.editBtn.removeEventListener("click", onEdit);
				
			})
			
		};
		
		
		this.elements.editBtn.addEventListener("click", onEdit);
		
		this.elements.deleteBtn.addEventListener("click", () => {
			// const check = confirm("Are you sure you want to delete this item?");

			// if (check) {
				BoardAPI.deleteItem(id);

				// this.elements.editBtn.removeEventListener("dblclick", onBlur);
				this.elements.root.parentElement.removeChild(this.elements.root);
			// }
		});

		this.elements.root.addEventListener("dragstart", e => {
			e.dataTransfer.setData("text/plain", id);
		});

		this.elements.input.addEventListener("drop", e => {
			e.preventDefault();
		});
	}

	static createRoot() {
		const range = document.createRange();

		range.selectNode(document.body);

		return range.createContextualFragment(`
			<div class="board__item card" draggable="true">
				<div class="card-body">
					<div class="board__item-input card-title" ></div>
					<div class="card-footer">
						<button class="btn btn-sm btn-primary" id="edit-btn">Edit</button>
						<button class="btn btn-sm btn-outline-primary disabled" id="done-btn"></button>
						<button class="btn btn-sm btn-danger" id="delete-btn">Delete</button>
					</div>
				</div>
			</div>
		`).children[0];
	}
}
