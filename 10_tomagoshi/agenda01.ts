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

    // getFone(index : number) {
    //     let tele = this.teles[index].toString();
    //     `${this.teles[index].tag}`
    //     return tele; 
    // }

    //desnecessário??
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


// let tele = new Tele("oi", "(85)9988");
// let tele2 = new Tele("claro", "tedoide");
// console.log( "" + tele.toString());
// console.log( "" + tele2.toString());
// console.log(tele.isValid());
// console.log(tele2.isValid());


let ctt = new Contato("jober", []);
// ctt.removeFone(1);
ctt.addTele(new Tele("claro", "(88)000000"));
ctt.addTele(new Tele("tim", "88-996677"));
ctt.addTele(new Tele("oi 2", "86773028"));
// console.log(ctt.toString2());
console.log(ctt.toString3());
// ctt.removeFone(1);
// ctt.removeFone(6);
 console.log(ctt.toString2());


