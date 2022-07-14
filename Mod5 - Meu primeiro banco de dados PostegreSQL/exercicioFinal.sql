create table Agencia (
	id int generated always as identity,
	nome varchar (60) ,
	primary key (id)
)

create table Conta (
	id int generated always as identity,
	nome varchar (10) not null,
	agenciaID int not null,
	saldo int default 0,
	ativada boolean default true,
	
	primary key (id),
	constraint FK_Conta_Agencia foreign key (agenciaID) references Agencia (id)
)

create table Cliente (
	id int generated always as identity,
	cpf varchar (14) not null,
	nome varchar (60) not null,
	senha varchar (500) not null,
	contaID int,
	agenciaID int,
	email varchar (60) not null,
	dtnasc date not null,
	
	primary key (id),
	constraint FK_Cliente_Conta foreign key (contaID) references Conta (id),
	constraint FK_Cliente_Agencia foreign key (agenciaID) references Agencia (id)
)


----------------------------------------------
---------inserts-----------------------------
---------------------------------------------
drop table agencia cascade

drop table cliente cascade

drop table conta cascade

insert into Agencia (nome) values 
('0001'),('0002')

select * from Agencia

insert into conta (agenciaID, nome, saldo) values
(1,'0001', 1000),(1,'0002', 1254),(2,'0003', 3000)

select * from conta
order by id

insert into Cliente (cpf, nome, senha, contaID, agenciaID, email, dtnasc) values
('456', 'Le', '465',1,1, 'le@email.com', '27-08-1992'),
('123', 'Ju', '123',2,1,'ju@email.com', '24-01-1995'),
('789', 'Paula', '789',3,2,'paula@email.com','18-01-1989')

select * from cliente


----exercicio 1 --------
drop view saldoPorAgencia

create or replace view saldoPorAgencia as
select a.nome as agencia, sum(c.saldo) as saldo_total from Conta c
inner join agencia a on c.agenciaid = a.id
group by agencia
order by sum(c.saldo)

select * from saldoPorAgencia


-- abaixo, uma função para verificar saldo de cada agencia, individualmente
drop function verificaSaldoDeAgencia (agencia int)

create or replace function verificaSaldoDeAgencia (agenciaEscolhida int) returns int as
$$ begin
	return 
	(select sum(c.saldo) as saldo_total from Conta c
		where c.agenciaid = agenciaEscolhida
		order by sum(c.saldo)
	);
end $$
language plpgsql;

select * from verificaSaldoDeAgencia (1);
select * from verificaSaldoDeAgencia (2);

-----------------------fim exercício 1

----exercicio 2 --------
drop table historicoTransacao cascade;
select * from historicoTransacao;

create table historicoTransacao (
	id int generated always as identity,
	agenciaOrigem int not null,
	agenciaDestino int not null,
	contaOrigem int not null,
	contaDestino int not null,
	tipo varchar (20) not null,
	dtTransacao date not null,
	valor decimal (10,2),
	
	primary key (id),
	constraint FK_transacao_Agencia_Origem foreign key (agenciaOrigem) references Agencia (id),
	constraint FK_transacao_Agencia_Destino foreign key (agenciaDestino) references Agencia (id),
	constraint FK_transacao_Conta_origem foreign key (contaOrigem) references Conta (id),
	constraint FK_transacao_Conta_destino foreign key (ContaDestino) references Conta (id)	
)


----exercicio 3 --------


--funcões de depósito, saque e transferência--

--função de depósito
drop function deposito

create or replace function deposito (agenciaID int, contaID int, valor int) returns void
language plpgsql as 
$$
begin
	update conta set saldo = saldo + valor
	where id = contaID;

	insert into historicoTransacao (agenciaOrigem, agenciaDestino, contaOrigem, contaDestino, tipo, dtTransacao, valor) 
	values (agenciaID, agenciaID, contaID, contaID, 'Deposito', now(), valor); 
end $$;

select * from deposito (1, 1, 500)

select * from historicoTransacao
order by id desc; 

select * from conta
order by id;

--saque
drop function saque

create or replace function saque (agenciaID int, contaID int, valor int) returns void
language plpgsql as 
$$
begin	
	if valor < 0 then 
		valor = -valor;
	end if;

	if ((select saldo from conta where id = contaID ) - valor <0) then
		RAISE EXCEPTION 'Saldo insuficiente';
	else
		update conta set saldo = saldo - valor
		where id = contaID;
	
		insert into historicoTransacao (agenciaOrigem, agenciaDestino, contaOrigem, contaDestino, tipo, dtTransacao, valor) 
		values (agenciaID, agenciaID, contaID, contaID, 'Saque', now(), valor); 
	end if;
end $$;

select * from saque (1, 1, -500)

select * from historicoTransacao
order by id desc; 

select * from conta
order by id;


--tranferência
drop function transferencia

create or replace function transferencia (agenciaIDOrigem int, agenciaIDDestino int, contaIDOrigem int, contaIDDestino int, valor int) returns void
language plpgsql as 
$$
begin	
	if valor < 0 then 
		valor = -valor;
	end if;

	if ((select saldo from conta where id = contaIDOrigem ) - valor <0) then
		RAISE EXCEPTION 'Saldo insuficiente';
	else
		update conta set saldo = saldo - valor
		where id = contaIDOrigem;
	
	
		update conta set saldo = saldo + valor
		where id = contaIDDestino;
	
		insert into historicoTransacao (agenciaOrigem, agenciaDestino, contaOrigem, contaDestino, tipo, dtTransacao, valor) 
		values (agenciaIDOrigem, agenciaIDDestino, contaIDOrigem, contaIDDestino, 'Transferencia', now(), valor); 
	end if;
end $$;

select * from transferencia (1, 1, 1, 2, 500)

select * from historicoTransacao
order by id desc; 

select * from conta
order by id;


--resumo de funções

--agencia, conta, valor
select * from deposito (1, 1, 1500);
select * from saque (1, 1, -500);

select * from deposito (2, 3, 680);
select * from saque (2, 3, -500);
--agenciaorigem, agenciadestino, contaorigem, contadestino, valor
select * from transferencia (1, 1, 1,2,500);

select * from transferencia (1, 2, 1,3, 200);

select * from transferencia (2, 1, 3,1, 300);
-----------------------fim exercício 3


---- continuação do exercicio 2 --------
--criando a view de histórico de tranferências
drop view verHistoricoDeTranferencias cascade

create or replace view verHistoricoDeTranferencias as 
select a.nome as Agencia_De_Origem, b.nome as Agencia_De_Destino,
c.nome as Conta_De_Origem, d.nome as Conta_De_Destino,
to_char(ht.dttransacao, 'DD/MM/YYYY') as Data_De_Transacao, ht.valor as Valor
from historicoTransacao ht
inner join agencia a on a.id= ht.agenciaorigem
inner join agencia b on b.id= ht.agenciadestino
inner join conta c on c.id = ht.contaorigem
inner join conta d on d.id = ht.contadestino
order by a.id

select * from verHistoricoDeTranferencias

select * from conta

select * from historicoTransacao

-----------------------fim exercício 2


----exercicio 4 --------
create view ValorTotalDeTransacaoes as
select c.nome as Conta_De_Origem, d.nome as Conta_De_Destino, ht.tipo, count(ht.contaorigem), sum(valor) as Valor_Total from historicoTransacao ht
inner join conta c on c.id = ht.contaorigem
inner join conta d on d.id = ht.contadestino
group by Conta_De_Origem, Conta_De_Destino, tipo
order by Conta_De_Origem

select * from ValorTotalDeTransacaoes
