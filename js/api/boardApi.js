export default class BoardAPI {
	static getItems(columnId) {
		const column = read().find(column => column.id == columnId);

		if (!column) {
			return [];
		}

		return column.items;
	}
	static getColumns(id){
		const list = read().find(column => column.id === id);

		if(!list){
			return [];
		}

		return list;
	}

	static insertColumn(id,title){
		const data = read();

		const column = {
			id,
			items: [],
			title,
		}

		let lists = data;
		lists.push(column);
		save(lists);
	}

	static insertItem(columnId, content) {
		const data = read();
		const column = data.find(column => column.id == columnId);
		const item = {
			id: Math.floor(Math.random() * 100000),
			
			content,
		
		};

		if (!column) {
			throw new Error("Column does not exist.");
		}

		column.items.push(item);
		save(data);

		return item;
	}

	static updateItem(itemId, newProps) {
		const data = read();
		const [item, currentColumn] = (() => {
			for (const column of data) {
				const item = column.items.find(item => item.id == itemId);

				if (item) {
					return [item, column];
				}
			}
		})();

		if (!item) {
			throw new Error("Item not found.");
		}



		item.content = newProps.content === undefined ? item.content : newProps.content;
		// item.content.textBody = newProps.textBody === undefined ? item.content.textBody : newProps.textBody;

		// Update column and position
		if (
			newProps.columnId !== undefined
			&& newProps.position !== undefined
		) {
			const targetColumn = data.find(column => column.id == newProps.columnId);

			if (!targetColumn) {
				throw new Error("Target column not found.");
			}

			// Delete the item from it's current column
			currentColumn.items.splice(currentColumn.items.indexOf(item), 1);

			// Move item into it's new column and position
			targetColumn.items.splice(newProps.position, 0, item);
		}

		save(data);
	}

	static deleteItem(itemId) {
		const data = read();

		for (const column of data) {
			const item = column.items.find(item => item.id == itemId);

			if (item) {
				column.items.splice(column.items.indexOf(item), 1);
			}
		}

		save(data);
	}

}

function read() {
	const json = localStorage.getItem("board");

	// if (!json) {
	// 	[
	// 		{
	// 			id: 1,
	// 			items: []
	// 		},
	// 		{
	// 			id: 2,
	// 			items: []
	// 		},
	// 		{
	// 			id: 3,
	// 			items: []
	// 		},
			
	// 	];
	// }
    console.log(json);
	return JSON.parse(json);
}

function save(data) {
	localStorage.setItem("board", JSON.stringify(data));
}