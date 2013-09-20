function Item(){
	var id;
	var cliente;
	var bebida;
	var valor;
	var quantidade;

	this.getId = function(){
		return this.id;
	};

	this.setId = function(novoId){
		this.id = novoId;
	};

		this.getCliente = function(){
		return this.cliente;
	};

	this.setCliente = function(novoCliente){
		this.cliente = novoCliente;
	};

	this.getBebida = function(){
		return this.bebida;
	};

	this.setBebida = function(novaBebida){
		this.bebida = novaBebida;
	};

	this.getValor = function(){
		return this.valor;
	};

	this.setValor = function(novoValor){
		this.valor = novoValor;
	};

	this.getQuantidade = function(){
		return this.quantidade;
	};

	this.setQuantidade = function(novoQuantidade){
		this.quantidade = novoQuantidade;
	};
}