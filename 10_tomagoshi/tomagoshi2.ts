class Tomagoshi2 {
    energia: number;
    saciedade: number;
    limpeza: number;
    idade: number;
    diamantes: number;
    eneMax : number;
    sacMax : number;
    limMax : number;
    
    
        constructor (energia : number, saciedade : number,  limpeza : number) {
            this.energia = energia;
            this.eneMax = energia;
            this.saciedade = saciedade;
            this.sacMax = saciedade;
            this.limpeza = limpeza;
            this.limMax = limpeza;
            this.diamantes = 0;
            this.idade = 0;
        }
    
        public toString() {
            return (`E:${this.eneMax}/${this.energia}, S:${this.sacMax}/${this.saciedade}, L:${this.limMax}/${this.limpeza}, D:${this.diamantes}, I:${this.idade}`);
        }
    
        comer() {
            if (this.energia == 0) {
                return console.log("seu amiguinho está morto");
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
    }
    
    let toma = new Tomagoshi2 (0, 20, 15);
    toma.comer();
    console.log(toma.toString());