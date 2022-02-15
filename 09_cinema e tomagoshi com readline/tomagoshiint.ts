const readline = require('readline-sync');
let input = (): string => readline.question();
let write = (x : any) => process.stdout.write("" + x);

class Tomagoshi {
    nome: string;
    energia: number;
    saciedade: number;
    limpeza: number;
    idade: number;
    diamantes: number;
    eneMax : number;
    sacMax : number;
    limMax : number;
    taVivo : boolean;
    constructor (nome: string, energia : number, saciedade : number,  limpeza : number) {
        this.nome = nome;
        this.energia = energia;
        this.eneMax = energia;
        this.saciedade = saciedade;
        this.sacMax = saciedade;
        this.limpeza = limpeza;
        this.limMax = limpeza;
        this.diamantes = 0;
        this.idade = 0;
        this.taVivo = true;
    }

    public setEne(novEne : number) {
        this.energia =  novEne + this.energia;
    }

    public setSac(novSac : number) {
        this.saciedade = novSac + this.saciedade;
    }

    public setLim(novLim : number) {
        this.limpeza = novLim + this.limpeza;
    }

    public brincar() {
        if (this.energia <= 0) {
            this.energia = 0
            console.log("seu amiguinho morreu de cansaço");
        }
        if (this.saciedade <= 0) {
            this.saciedade = 0
            console.log("seu amiguinho morreu de bucho vazio");
        }
        if (this.limpeza <= 0) {
            this.limpeza = 0
            console.log("seu amiguinho morreu de imundice");
        }
        if(this.energia <= 0 || this.limpeza <= 0 || this.saciedade <= 0) {
            return
        }    
        this.energia -= 2;
        this.saciedade -= 1;
        this.limpeza -= 3;
        this.idade +=1;
        this.diamantes += 1;
    }   
    
    public comer() {
        if (this.energia <= 0) {
            this.energia = 0
            console.log("seu amiguinho está morto");
        }
        if (this.limpeza <= 0) {
            this.limpeza = 0
            console.log("seu amiguinho morreu de imundice");
        }
        if (this.energia <= 0 || this.limpeza <= 0) {
            return
        }
        this.energia -= 1;
        this.saciedade += 4;
        this.limpeza -= 2;
        this.idade +=1;
        if (this.energia > this.eneMax) {
            this.energia = this.eneMax;
        }
        if (this.saciedade > this.sacMax) {
            this.saciedade = this.sacMax;  
        }
    }   

    public dormir() {
        let dorme : number = this.eneMax - this.energia; 
        if ( dorme < 5 ) {
           return ("seu amiguinho não está com sono");
        }
        this.energia += dorme;
        this.idade +=  dorme;
        this.saciedade -= dorme;
        if (this.saciedade <= 0) {
            return console.log("seu amiguinho morreu de bucho vazio");
        }
    }   
       
    public banho() {
        if (this.energia <= 0) {
            console.log("seu amiguinho morreu de cansaço");
        }
        if (this.saciedade <= 0) {
            console.log("seu amiguinho morreu de bucho vazio");
        }
        if (this.energia <= 0 || this.saciedade <= 0) {
            return
        } 
        this.limpeza = this.limMax;
        this.saciedade -= 1;
        this.energia -= 3;
        this.idade += 1;
    }
    
    toString2() {
        return (`[${this.nome}]E:${this.energia}/${this.eneMax}, S:${this.saciedade}/${this.sacMax}, L:${this.limpeza}/${this.limMax}, D:${this.diamantes}, I:${this.idade}`);
    }
}

class Board {
    create(): Tomagoshi {
        write("insira o nome do seu amiguinho:");
        let nome = input();
        write("insira a energia máxima do seu amiguinho:");
        let energia = +input();
        write("insira a saciedade máxima do seu amgiguinho:");
        let saciedade = +input();
        write("insira a limpeza máxima do seu amiguinho:");
        let limpeza = +input();
        let toma = new Tomagoshi(nome, energia, saciedade, limpeza);
        return toma;
    }

    mostrar_help() {
        write("Comandos:\n");
        write("  init <nome> <energia max> <saciedade max> <limpeza max> : cria um novo pet\n");
        write("  show: mostra o pet\n");
        write("  play: faz o pet brincar\n");
        write("  eat: faz o pet comer\n");
        write("  sleerp: faz o pet dormir\n");
        write("  bath: faz o pet tomar banho\n")
        write("  end: sai do programa\n");
    }
        
    shell() {
        let pet = new Tomagoshi("bichinho", 0, 0, 0); //this.create_pet();
        this.mostrar_help();
        while (true) {
            write("$ ");
            let line = input();
            let words = line.split(" ");
            if (words[0] == "end") {
                break;
            } else if (words[0] == "help") {
                this.mostrar_help();
            } else if (words[0] == "show") {
                write("" + pet.toString2() + "\n");
            } else if (words[0] == "eat") {
                pet.comer();
            } else if (words[0] == "play") {
                pet.brincar();
            } else if (words[0] == "sleep") {
                pet.dormir();
            } else if (words[0] == "bath") {
                pet.banho();       
            } else if (words[0] == "init") {
                let nome = words[1];
                let energia = +words[2];
                let sacMax = +words[3];
                let limpeza = +words[4];
                pet = new Tomagoshi(nome, sacMax, energia, limpeza);
            } else {
                console.log("Comando inválido");
            }
        }
    }   
    
}
    
let ash = new Board;
ash.shell();