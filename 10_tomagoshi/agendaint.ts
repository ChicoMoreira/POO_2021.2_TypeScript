const readline = require('readline-sync');
let terminal = (): string => readline.question();
let escrever = (x : any) => process.stdout.write("" + x);

class Tele {
    private tag: string;
    private number: string;
    
    constructor(tag: string, number: string) {
        this.tag = tag;
        this.number = number;
    }
    
    public toString(): string {
        return `${this.tag} - ${this.number}`;
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
   

    constructor(nome: string, teles:Array<Tele>) {
        this.nome = nome;
        this.teles = new Array<Tele>();
        for (let tele of teles) {
            this.addTele(tele);
        }
    }

    public toString2(): string {
        return `${this.nome}:${"\n"}${this.teles.join("\n")}`;
    }

    public toString3(): string {
        let saida = this.nome + "\n";
        for(let i of this.teles) {
            saida += `[${this.teles.indexOf(i)}]${this.teles.toString()}${"\n"}`
        }
        return saida;
    }

    setNome(nome : string) {
        this.nome = nome;
    }

    // getFone(index : number) {
    //     let tele = this.teles[index].toString();
    //     `${this.teles[index].tag}`
    //     return tele; 
    // }

    //nao usei
    setFone(teles: Array<Tele>) {
        this.teles = [];
        for(let tele of teles) {
            this.addTele(tele);
        }
    }

    addTele(tele : Tele) : boolean {
        if( tele.isValid() == true) {
            this.teles.push(tele);
            return true;
        }
        else return false;
    }

    removeFone(index: number) {
        if (this.teles.length == 0) {
            console.log("lista vazia");
        }
        else if (index > this.teles.length) {
            console.log("posição não existe na lista");
        }
        this.teles.splice(index, 1);
    }





}

class Shell2 {
    help() {
        escrever("  comandos \n");
        escrever("  criar <tag> <numero>: cria um número com tag \n");
        escrever("  nome <nome>: muda o nome do contato \n")
        escrever("  salvar <tag> <numero>: caso o número sejá válido, salva um número com tag no contato \n")
        escrever("  remover <número de índice>: remove o número salvo no índice \n");
        escrever("  mostrar: exibe o contato \n");
        escrever("  end: encerra o programa \n");
    }

    public init() {
        let cont = new Contato("usuário", []); 
        this.help();
        while (true) {
            escrever("> ");
            let line = terminal();
            let words = line.split(" ");
            if (words[0] == "end") {
                break;
            } 
            else if (words[0] == "criar") {
                let cli = new Tele (words[1], words[2]);
                console.log(`${cli.toString()} criado`);
            }
            else if (words[0] == "nome") {
                let nome = words[1];
                cont.setNome(nome);
            } 
            else if (words[0] == "salvar") {
                let tele = new Tele(words[1], words[2]);
                cont.addTele(tele);
            }
           else if (words[0] == "remover") {
                let id = +words[1];     
            cont.removeFone(id);
            } 
            else if (words[0] == "mostrar") {
                console.log(cont.toString3());
            } 


        }
    }
}


let cuida = new Shell2;
cuida.init();