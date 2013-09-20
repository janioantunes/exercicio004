// Inicialização
var localDB = null;
function checkDB(){
	try {
		if(!window.openDatabase) {
			updateStatus("Erro: Seu navegador não permite banco de dados.");
		}else{
			initDB(); 
			createTables();
			queryAndUpdateOverview();
			total(); // atualiza o total dos gastos
		}
	}
	catch(e) {
		if(e == 2) {
			updateStatus("Erro: Versão de banco de dados inválida.");
		}else {
			updateStatus("Erro: " + e + ".");
		}
		return;
	}
}

function initDB(){
	localDB = window.openDatabase('drinkDB', '1.0', 'MydrinkDB', 65536);
}

function createTables(){
	varquery = 'CREATE TABLE IF NOT EXISTS drink(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, cliente VARCHAR NOT NULL, bebida VARCHAR NOT NULL, quantidade VARCHAR NOT NULL, valor VARCHAR NOT NULL);';
	try{
		localDB.transaction(function(transaction){
			transaction.executeSql(varquery, [], nullDataHandler, errorHandler);
			updateStatus("Tabela 'drink' status: OK.");
		});
	}catch (e) {
		updateStatus("Erro: Data base 'drink' não criada " + e + ".");
		return;
		}
}

