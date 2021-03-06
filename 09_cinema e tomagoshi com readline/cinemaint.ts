const readline = require('readline-sync');
let input = (): string => readline.question();
let write = (x : any) => process.stdout.write("" + x);

class Cliente {
    nome : string;
    fone : number;
    constructor (nome : string, fone: number) {
        this.nome = nome;
        this.fone = fone;
    }

    toString() {
        return `${this.nome}, ${this.fone}`
    }
        
    getNome() {
       return this.nome;
    }

    getFone() {
        return this.fone;
    }
}

class Sala {
    cadeiras : Array <Cliente | null>;
    constructor (tamSala : number) {
        this.cadeiras = [];
        for (let i = 0; i < tamSala; i++) {
            this.cadeiras.push(null);
        }
    }

   public toString() {
    let sda = "(";
    for (let i = 0; i < this.cadeiras.length; i++) {
        let cadeira = this.cadeiras[i];
        if (cadeira == null) {
            sda += " - ";
        } else {
            sda += ` ${cadeira.getNome()} `;
        }   
    }   
    sda += ")";
    return sda;
    }
    
    public indexOf(id: String): number {
        return this.cadeiras.findIndex(c => c != null && c.nome == id);
        
    }

    public reservar(cliente: Cliente, posicao: number): boolean {
        if (posicao < 0 || posicao > this.cadeiras.length) {
            console.log("Essa cadeira não existe!")
            return false;
        }
        if (this.cadeiras[posicao] !== null) {
            console.log("Essa cadeira já está reservada!")
            return false;
        }
        if (this.indexOf(cliente.nome) !== -1) {
            console.log("Você já está reservando uma cadeira!")
            return false;
        }
        this.cadeiras[posicao] = cliente;
        return true;
    }

    cancelar(id: string) {
        let posicao = this.indexOf(id);
        if (posicao == -1) {
            this.cadeiras[posicao] = null 
            console.log(`${id} não encontrado na sessão`)
            return;
        }
        this.cadeiras[posicao] = null;
        return;        
    }
}

class Shell {
    create_sala(): Sala {
       write("Digite o tamanho de sua sala :");
       let tamanho = +input();
       let sala = new Sala(tamanho);
        return sala;
    }

    help() {
        write("   comandos:\n");
        write("   init <tamsala>: inicia um sala nova\n");
        write("   reserva <nome> <fone> <assento>\n");
        write("   consulta\n");
        write("   cancela <nome>\n");
    }

    public shell2() {
        let sala = new Sala(0); 
        this.help();
        while (true) {
            write("$ ");
            let line = input();
            let words = line.split(" ");
            if (words[0] == "end") {
                break;
            } 
            else if (words[0] == "reserva") {
                let cli = new Cliente (words[1], +words[2]);
                let pos = +words[3];
                sala.reservar(cli, pos);
            }
            else if (words[0] == "init") {
                let tamsala = +words[1];
                sala = new Sala(tamsala);
            } 
            else if (words[0] == "consulta") {
                write("" + sala.toString() + "\n");
            }
           else if (words[0] == "cancela") {
                let id = words[1];     
            sala.cancelar(id);
           } 

        }   
     }
}

let cuida = new Shell;
cuida.shell2();