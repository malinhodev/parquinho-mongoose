const mongoose = require('mongoose')
 
mongoose.set("strictQuery", true)
 
mongoose.connect('mongodb://127.0.0.1:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})
 
const db = mongoose.connection
 
db.on('error', console.error.bind(console, 'connection error'))
 
db.once('open', function(){
    console.log("Estamos conectados ao MongoDb!")
})
//schema

const pessoaSchema = new mongoose.Schema({
    nome: String,
    idade: Number,
    profissao: String
})

//model

const Pessoa  = mongoose.model('Pessoa', pessoaSchema)

const matheus = new Pessoa({
    nome: "Matheus",
    idade: 30,
    profissao: "Programador"
})

// create
/*
matheus
 .save()
 .then(() => {
  console.log("Salvo com sucesso!");
 })
 .catch((error) => {
  console.error("Erro ao salvar:", error);
 });
*/
//read
/*
Pessoa.findOne({ nome: "Matheus" })
 .then(function (pessoa) {
  console.log(pessoa);
 })
 .catch(function (err) {
  console.log(err);
 });
*/

//inserindo vários dados
/*
Pessoa.insertMany([
    {nome: "Marlon", idade: 31, profissao: "Garçom"},
    {nome: "Vanda", idade: 27, profissao:"Cumim"}
])
*/
//read (mostrar varios dados))
/*
async function getPessoas(){
    const pessoas = await Pessoa.find({}).exec()
    console.log(pessoas)
}

getPessoas()
*/
async function getPessoa(nome){
    const pessoa = await Pessoa.find({ nome: nome}).exec()
    if(pessoa.length === 0){
        console.log('Não encotrado!')
    }else{
        console.log(pessoa)
    }
}
//getPessoa("Matheus")
//update (atualizar dados)
//Pessoa.updateOne({nome: "Vanda"}, {profissao: "Garçonete"}).exec()
//delete
//Pessoa.deleteOne({ nome: "Matheus"}).exec()

//where (múltilos filtros)
async function procuraSe(nome, idade){
    const pessoa = await Pessoa
        .where('idade').gte(idade)
        .where('nome', nome)
        .exec()
    if(pessoa.length === 0){
        console.log('Não encontardo!!')
    }else{
        console.log(pessoa)
    }

}

procuraSe("Marlon", 25)