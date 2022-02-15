class Criança {
    nome: string;
    idade: number;
    constructor (nome : string, idade : number) {
        this.nome = nome;
        this.idade = idade;
    }

    toString() : string {
        return `${this.nome}, ${this.idade} anos`;
    }

}

class Pulapula {
    brincando : Array<Criança>;
    fila : Array<Criança>;
    tamPula : number;
    constructor(tamPula : number){
        this.brincando = new Array<Criança>(); 
        this.fila = new Array<Criança>();
        this.tamPula = tamPula;
    }
  
    chegou(pessoa: Criança) : boolean {
        if (this.brincando.length === this.tamPula) {
            console.log("pulapula lotado");
            return false;
        }
        this.fila.push(pessoa);
        return true;
    }
  
    toString() : string {
        if(this.fila.length == 0 && this.brincando.length == 0){
            return("pulapula e fila vazios");
        }
        let saida = "( ";
        for (let j = 0; j < this.brincando.length; j++) {
            saida += `${this.brincando[j].nome} `;
        } 
        saida += ") [ ";    
        for (let i = 0; i < this.fila.length; i++) {
            saida += `${this.fila[i].nome} `;
        }
        return saida + "]";
    }
    
    entrar() {
        if (this.fila.length == 0) {
            return "não há ninguém na fila";
        }
        if (this.tamPula === this.brincando.length) {
            return console.log("pulapula cheio");
        }
        this.brincando.push(this.fila[0]);
        this.fila.shift();
    }

    sair() {
        if(this.brincando.length == 0) {
            return "não há ninguem no pulapula";
        }
        this.fila.push(this.brincando[0]);
        this.brincando.shift();
    }

    remover(nomecri : string) {
        if(this.fila.length == 0 && this.brincando.length == 0){
            return ("pulapula e fila vazios");
        }
        for (let i = 0; i < this.fila.length; i++){
            if (this.fila[i].nome == nomecri) {
                this.fila.splice(i,1);
                break;
            }
        }    
        for (let i = 0; i < this.brincando.length; i++){
            if (this.brincando[i].nome == nomecri) {
               this.brincando.splice(i,1);
               break;
            }
        
        }
    }
}
let pula = new Pulapula(2);
pula.chegou(new Criança("Jober", 10));
pula.chegou(new Criança("Ana", 6));
pula.chegou(new Criança("Joao", 7));
pula.chegou(new Criança("Maria", 8));
pula.chegou(new Criança("Cleber", 11));
console.log(pula.toString());
pula.entrar();
pula.remover("Cleber");
console.log(pula.toString());
pula.entrar();
console.log(pula.toString());
pula.entrar();
console.log(pula.toString());
pula.entrar();
console.log(pula.toString());
pula.remover("Jober");
console.log(pula.toString());