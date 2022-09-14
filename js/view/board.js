import Column from "./column.js";

export default class Board {
	constructor(root) {
		this.root = root;

		const btn = document.querySelector(".add--list");
		btn.addEventListener("click", addList);

		function addList(){
			// read()
			const text = document.querySelector(".list--data").value;
			const id = Math.floor(Math.random() * 100000);
			
			const data = {
				id: id,
				items: [],
			}
			
			

			// array.push({id, title: text})

			// console.log(array);
			// save(data);
		}


		Board.columns().forEach(column => {
			const columnView = new Column(column.id, column.title);

			this.root.appendChild(columnView.elements.root);
		});
		
	}

	static columns() {
		
		return [
			{
				id: 1,
				title: "Test 1"
			},
			{
				id: 2,
				title: "Test 2"
			},
			{
				id: 3,
				title: "Test 3"
			},
		]
	
	}
}