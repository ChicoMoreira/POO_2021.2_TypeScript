// const readline = require('readline-sync');
// let terminal = (): string => readline.question();
// let escrever = (x : any) => process.stdout.write("" + x);

class Tele {
    private tag: string;
    private number: string;
    
    constructor(tag: string, number: string) {
    this.tag = tag;
    this.number= number;
    }
    
    public toString(): string {
        return `${this.tag} - ${this.number}`;
    }
    
    public getTag() {
        return this.tag;
    }

    public getNumber() {
        return this.number;
    }

    public validate(): boolean {    
        let valid = "0123456789()-.";
        for (let i = 0; i < this.number.length; i++) {
            if (valid.indexOf(this.number[i]) == -1) {
                console.log("número inválido");
                return false;
                }
        }
        return true;
    }
        
    public isValid(): boolean {
            if (this.validate() == true) {
               return true; 
            }
            else return false;
    }
} 

class Contato {
    private nome: string;
    private teles: Array<Tele>;
    constructor(n: string, t: Array<Tele>) {
        this.nome = n;
        this.teles = new Array<Tele>();
        for (let fone of t) {
            this.addTele(fone);
    
        }
    }
    public toString3(): string {
        let saida = this.nome + " ";
        for(let i = 0; i < this.teles.length; i++) {
            saida += `[${(i)}: ${this.teles[i].toString()}]`
        }
        return saida;
    }
  
    public setNome(nome : string) {
        this.nome = nome;
    }
    
    public getTeles() : Array<Tele> {
        return this.teles
    }
    
    public addTele(tele : Tele) : boolean {
        if(tele.isValid() == true) {
            this.teles.push(tele);
            return true;
        }
        else return false;
    }
    public removeFone(index: number) : void {
        if (this.teles.length == 0) {
            console.log("lista vazia");
        }
        else if (index > this.teles.length) {
            console.log("número inexistente");
        }
        
        this.teles.splice(index, 1);
    }

    public getNome(){
        return this.nome;
    }
}

class Agenda {
    private contatos: Array<Contato>;
    constructor() {
        this.contatos = Array<Contato>();
    }


    private findByName(nome: string): number {
        for (let i = 0; i < this.contatos.length ; i++) {
            if (this.contatos[i].getNome() == nome) {
                return i;
            }
        }
        return -1;
    }

    public add (nome : string, fone: Array<Tele>) {
        if ( this.findByName(nome) == -1 ){
            this.contatos.push(new Contato(nome, fone)); 
            this.contatos.sort((a,b) => a.getNome().localeCompare(b.getNome()))
        }
        else {
            for (let i of fone)
            this.contatos[this.findByName(nome)].addTele(i);
            this.contatos.sort((a,b) => a.getNome().localeCompare(b.getNome()))
        }
    }

    public remove(nome: string): void {
        if (this.findByName(nome) !== -1 ) {
            this.contatos.splice(this.findByName(nome), 1)
        }
        else console.log("contato inexistente")

    }

    public removeTele(nome: string, pos: number): void {
        if (this.findByName(nome) !== -1 ) {
            this.contatos[this.findByName(nome)].removeFone(pos)
        }
    }
    
    public getContato(nome: string): Contato | null {
        if (this.findByName(nome) !== -1) {
            return this.contatos[this.findByName(nome)];
        }
            console.log("contato inexistente")
            return null;
        
    }
    
    public toString(): string {
        let saida = "";
        for(let i = 0; i < this.contatos.length; i++) {
            saida += ` ${this.contatos[i].toString3()}\n`
        }
        return saida;
    }

    
    // busca(padrao: string): Array<Contato>{
    //     let result = [];
    //         for (let i = 0; i < this.contatos.length ; i++){
    //             if(this.getContato[i] == padrao){
    //                 result.push(this.contatos[i]);    
    //         }
    //     }
    //     return result;
    // }
}


// class Shell2 {
//     help() {
//         escrever("  comandos \n");
//         escrever("  add <contato> <tag> <numero>: adiciona um número a um contato \n");
//         escrever("  remove <nome>: remove o contato \n")
//         escrever("  removetele <nome> <index>: remove o numero do index desse contato \n")
//         escrever("  check <nome>: mostra os numeros salvos nesse contato \n");
//         escrever("  mostrar: exibe o contato \n");
//         escrever("  agenda: exibe toda a agenda \n");
//     }

//     public init() {
//         let cont = new Agenda(); 
//         this.help();
//         while (true) {
//             escrever("> ");
//             let line = terminal();
//             let words = line.split(" ");
//             if (words[0] == "end") {
//                 break;
//             } 
//             else if (words[0] == "check") {
//                 let nome = words[1];
//                 cont.getContato(nome);
//             } 
//             else if (words[0] == "agenda") {
//                 cont.toString();
//             }
//         //     else if (words[0] == "add") {
//         //         let cli = cont.add(words[1], words[2], words[3]);
//         // }
//         //    else if (words[0] == "remover") {
//         //         let id = +words[1];     
//         //     cont.removeFone(id);
//         //     } 
//         //     else if (words[0] == "mostrar") {
//         //         console.log(cont.toString3());
//         //     } 


//         }
//     }
// }

// let cuida = new Shell2;
// cuida.init();


let vai = new Agenda();
let numero = new Tele("oi", "8599924");
// vai.add("cleber", new Tele("oi", "282019482108"));

let tele1 = new Tele("oi", "02948210948")
let tele2 = new Tele("oioi", "s038ry")
// jjj.addTele(numero);
// jjj.addTele(tele1);
let novo = new Array<Tele>(tele1,tele2,numero);
let jjj = new Contato("jober", novo)
//console.log(jjj.toString3());


vai.add("chico", novo);
vai.add("chico", novo);
vai.add("falvio", novo);
console.log(vai.toString());
vai.remove("falvio");
vai.remove("jp");
vai.removeTele("chico", 0);
vai.removeTele("chico", 4);
console.log(vai.toString());
console.log(vai.getContato("chico"));
console.log(vai.getContato("pv"));

 //console.log(vai.busca("oi"));


