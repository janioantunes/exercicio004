// Query e visualização de Update

function onUpdate(Item){
	var id = document.itemForm.id.value;
	var cliente = Item.getCliente();
	var bebida = Item.getBebida();
	var quantidade = Item.getQuantidade();
	var valor = Item.getValor();
	if(cliente == "" || bebida == "" || quantidade == "" || valor == "") {
		updateStatus("'cliente', 'bebida', 'quantidade' e 'valor' são campos obrigatórios!");
	}
	else {
		var query = "update drink set cliente=?, bebida=?, quantidade=?, valor=? where id=?;";
		try {
			localDB.transaction(function(transaction){
				transaction.executeSql(query, [cliente, bebida, quantidade, valor, id], function(transaction, results){
					if (!results.rowsAffected) {
						updateStatus("Erro: Update não realizado.");
					}
					else {
						updateForm("", "", "", "", "");
						updateStatus("Update realizado:" + results.rowsAffected);
						queryAndUpdateOverview();
					}
				}, errorHandler);
			});
		} 
		catch (e) {
			updateStatus("Erro: UPDATE não realizado " + e + ".");
		}
	}
	total();
}

function onDelete(Item){
	var id = Item.getId();

	var query = "delete from drink where id=?;";
	try {
		localDB.transaction(function(transaction){

			transaction.executeSql(query, [id], function(transaction, results){
				if (!results.rowsAffected) {
					updateStatus("Erro: Delete não realizado.");
				}
				else {
					updateForm("", "", "", "", "");
					updateForm("", "", "", "", "");
					updateStatus("Linhas deletadas:" + results.rowsAffected);
					queryAndUpdateOverview();
				}
			}, errorHandler);
		});
	} 
	catch (e) {
		updateStatus("Erro: DELETE não realizado " + e + ".");
	}
	total();
}

function onCreate(Item){
	var cliente = Item.getCliente();
	var bebida = Item.getBebida();
	var valor = Item.getValor();
	var quantidade = Item.getQuantidade();
	
	if (cliente == "" || bebida == "" || quantidade == "" || valor == "") {
		updateStatus("Erro: 'cliente', 'bebida', 'quantidade' e 'valor' são campos obrigatórios!");
	}
	else {
		var query = "insert into drink (cliente, bebida, quantidade, valor) VALUES (?, ?, ?, ?);";
		try {
			localDB.transaction(function(transaction){
				transaction.executeSql(query, [cliente, bebida, quantidade, valor], function(transaction, results){
					if (!results.rowsAffected) {
						updateStatus("Erro: Inserção não realizada");
					}
					else {
						updateForm("", "", "", "");
						updateStatus("Inserção realizada, linha id: " + results.insertId);
						queryAndUpdateOverview();
					}
				}, errorHandler);
			});
		} 
		catch (e) {
			updateStatus("Erro: INSERT não realizado " + e + ".");
		}
	}
	total();
}


function onSelect(htmlLIElement){
	var id = htmlLIElement.getAttribute("id");
	
	query = "SELECT * FROM drink where id=?;";
	try {
		localDB.transaction(function(transaction){

			transaction.executeSql(query, [id], function(transaction, results){

				var row = results.rows.item(0);

				updateForm(row['id'], row['cliente'], row['bebida'], row['quantidade'], row['valor']);

			}, function(transaction, error){
				updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
			});
		});
	} 
	catch (e) {
		updateStatus("Error: SELECT não realizado " + e + ".");
	}
}

function queryAndUpdateOverview(){

	//Remove as linhas existentes para inserção das novas
	var dataRows = document.getElementById("itemData").getElementsByClassName("data");
	
	while (dataRows.length > 0) {
		row = dataRows[0];
		document.getElementById("itemData").removeChild(row);
	};

	//Realiza a leitura no banco e cria novas linhas na tabela.
	var query = "SELECT * FROM drink;";
	try {
		localDB.transaction(function(transaction){
        
			transaction.executeSql(query, [], function(transaction, results){
				for (var i = 0; i < results.rows.length; i++) {
					var row = results.rows.item(i);
					var li = document.createElement("li");
						li.setAttribute("id", row['id']);
						li.setAttribute("class", "data");
						li.setAttribute("onclick", "onSelect(this);$('#btnInserir').attr('disabled','disabled');");

						var liText = document.createTextNode(row['cliente'] + " - "+ row['bebida'] + " - "+ row['quantidade'] + " - "+ row['valor']);
						li.appendChild(liText);

					document.getElementById("itemData").appendChild(li);
				}
			}, function(transaction, error){
				updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
			});
		});
	} 
	catch (e) {
		updateStatus("Error: SELECT não realizado " + e + ".");
	}
}

// 3. Funções de tratamento e status.

// Tratando erros

errorHandler = function(transaction, error){
	updateStatus("Erro: " + error.message);
	return true;
}

nullDataHandler = function(transaction, results){
}

// Funções de update

function updateForm(id, cliente, bebida, quantidade, valor){
	document.itemForm.id.value = id;
	document.itemForm.cliente.value = cliente;
	document.itemForm.bebida.value = bebida;
	document.itemForm.quantidade.value = quantidade;
	document.itemForm.valor.value = valor;
}

function updateStatus(status){
    document.getElementById('status').innerHTML = status;
}

function total() {
	var query = "SELECT quantidade,valor FROM drink;";
	try {
		localDB.transaction(function(transaction){
			var soma = 0;
			transaction.executeSql(query, [], function(transaction, results){
				for (var i = 0; i < results.rows.length; i++) {
					var row = results.rows.item(i);
					soma += parseFloat(row['valor'].replace(',','.')) * parseFloat(row['quantidade'].replace(',','.'));
				}
				$("#total").html("TOTAL R$: "+soma.toFixed(2).replace('.',','));
			}, function(transaction, error){
				updateStatus("Erro: " + error.code + "<br>Mensagem: " + error.message);
			});
		});
	} 
	catch (e) {
		updateStatus("Error: SELECT não realizado " + e + ".");
	}
}
