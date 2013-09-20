function insertItem(cliente,bebida,quantidade,valor){
	var objItem = new Item();

	objItem.setCliente(cliente);
	objItem.setBebida(bebida);
	objItem.setQuantidade(quantidade);
	objItem.setValor(valor);

	onCreate(objItem);
}

function updateItem(id,cliente,bebida,quantidade,valor){
	var objItem = new Item();
	objItem.setId(id);
	objItem.setCliente(cliente);
	objItem.setBebida(bebida);
	objItem.setQuantidade(quantidade);
	objItem.setValor(valor);

	onUpdate(objItem);
}
  
function deleteItem(id){
	var objItem = new Item();
	objItem.setId(id);

	onDelete(objItem);
}
  
function displayResult(){
	var x=document.getElementById("selCliente");
	var option=document.createElement("option");
	option.text=document.getElementById("cadCliente").value;
	try{// for IE earlier than version 8
		x.add(option,x.options[null]);
	}
	catch (e){
		x.add(option,null);
	}
	$("#popupBasic").popup('close');
	PassaValor();
}

function PassaValor(){
	var Select = document.getElementById('selCliente');
	var Alvo = document.getElementById('cliente');
	var PegaTexto = Select.options[Select.options.selectedIndex].text;
	Alvo.value=PegaTexto;
}