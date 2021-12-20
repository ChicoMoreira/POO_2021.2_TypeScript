class Fone {
    constructor(private number: string, private label: string) 
    
    public toString(): string {
        return this.label + ":" + this.number;
    }
    
    public static validate(): boolean {
        let valid = "0123456789()-.";
        for (let i = 0; i < this.number.length; i++) {
            if (valid.indexOf(this.number[i]) == -1) {
                return false;
            }
        }
        return true;
    }

    public isValid() {
        ...
    }
}

class Contatos {
    //private fones: Array<Fone>;
    private nome: string;
    private fones: Array<Fone>;
    constructor(nome: string, fones:Array<Fone>) {
        this.nome = nome;
        this.fones = new Array<Fone>();
        for (let fone of fones) {
            this.addFone(fone);
        }
    }

    public toString(): string {
        return this.nome + ":" + this.fones.join(",");
    }
    //valida o fone e insere se for válido
    addFone(fone: Fone) {
        //verificar se o telefone é válido antes de inserir
    }
    removeFone(index: number) {
        //verificar se o index é válido antes de remover
        this.fones.splice(index, 1);
    }

    setFones(fones: Array<Fone>) {
        this.fones = [];
        for(let fone of fones) {
            this.addFone(fone);
        }
    }
}

class Agenda {
    private contatoss: Array<Contatos>;
    constructor() {
        this.contatoss = new Array<Contatos>();
    }

    //retorna posicao do contatos no vetor ou -1
    private findByName(nome: string): number {
        return -1;
    }

    //-----------------------------------------------------

    public addFone(contatos: Contatos): void {
        //todo: procura utilizando o findByName
    
        //todo: adicionar se não existir
            //todo: depois de adicionar vai precisar ordenar

        //se o contatos com esse nome já existe, adicione os telefones
    }
    public remove(nome: string): void {
        //procura utilizando o método findByName
        //remove se existir utilizando o splite(pos, 1);
        //não precisa ordenar depois de remover
    }
    public getContatos(nome: string): Contatos | null {
        //procura utilizando o método findByName
        //se contatos existir, retorne o contatos
        //se não existir retorne null
        return null;
    }
    public toString(): string {
        return this.contatoss.join("\n");
    }
}

function main() {
    let agenda = new Agenda();
    while (true) {
        let line = readline.question("");
        let cmd = line.split(" ");
        if (cmd[0] == "add") {
            let contatos = new Contatos(cmd[1]);
            agenda.add(contatos);
        } else if (cmd[0] == "remove") {
            agenda.remove(cmd[1]);
        } else if (cmd[0] == "get") {
            let contatos = agenda.getContatos(cmd[1]);
            if (contatos != null) {
                console.log(contatos.toString());
            } else {
                console.log("Contatos não encontrado");
            }
        } else if (cmd[0] == "show") {
            console.log(agenda.toString());
        } else if (cmd[0] == "exit") {
            break;
        }
    }
}

main();

let fone = new Fone("casa", "123banana");
fone.isValid();

let contatos = new Contatos("João", [fone, new Fone("oi", "(85)")]);
//fone invalido
contatos.addFone(new Fone("casa", "123banana"));