import DropZone from "./dropZone.js";
import BoardAPI from "../api/boardApi.js";


export default class Item {
	constructor(id, content, textBody) {
		const bottomDropZone = DropZone.createDropZone();

		this.elements = {};
		this.elements.root = Item.createRoot();
		this.elements.input = this.elements.root.querySelector(".board__item-input")
		this.elements.inp = this.elements.root.querySelector(".body-inp");
		this.elements.editBtn = this.elements.root.querySelector("#edit-btn");
		this.elements.deleteBtn = this.elements.root.querySelector("#delete-btn");

		// this.content = {
		// 	textTitle: textTitle,
		// 	textBody: textBody
		// }
		this.elements.root.dataset.id = id;
		this.elements.input.textContent = content;
		// this.elements.inp.textContent = textBody;
		this.content = content
		// this.textBody = textBody
		
		
		this.elements.root.appendChild(bottomDropZone);

		
		const onEdit = () => {
			const done = document.getElementById("done-btn");
			done.classList.toggle("disabled")
			// console.log(done.classList.length);
			if(done.classList.length === 3){
				this.elements.input.contentEditable = true;
				this.elements.inp.contentEditable = true;
				const newContent = this.elements.input.textContent.trim();
				const newContent2 = this.elements.inp.textContent.trim();
	
				if (newContent == this.content 
					// || newContent2 == this.textBody
					) {
					return;
				}
				this.content = newContent;
				// this.textBody = newContent2;
	
				BoardAPI.updateItem(id, {
					content: this.content,
					// textBody: this.textBody,
				}
				);
			}
			this.elements.input.contentEditable = false;
			this.elements.inp.contentEditable = false;
			
			done.addEventListener("click", () => {
				this.elements.input.contentEditable = false;
				const btn = document.querySelector("#done-btn")
				btn.classList.add("disabled");

				// this.elements.editBtn.removeEventListener("click", onEdit);
				
			})
			
		};
		
		
		this.elements.editBtn.addEventListener("click", onEdit);
		
		this.elements.deleteBtn.addEventListener("click", () => {
				BoardAPI.deleteItem(id);

				this.elements.root.parentElement.removeChild(this.elements.root);
			
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
					<div class="card-text"></div>
					<div class="card-footer">
						<button class="btn btn-sm btn-primary" id="edit-btn">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
								<path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
					  		</svg>
						</button>
						<button class="btn btn-sm btn-outline-primary disabled" id="done-btn"></button>
						<button class="btn btn-sm btn-danger" id="delete-btn">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  								<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
							</svg>
						</button>
					</div>
				</div>
			</div>
		`).children[0];
	}
}