interface IPaciente {
    getNome(): string
    addMdc(medico: IMedico) : void
    rmvMdc(medico: string) : void
    getMdcs(): Map<string, IMedico>
    getDiag(): string 
}

interface IMedico {
    getNome(): string
    addPct(paciente: IPaciente) : void
    rmvPct(paciente: string) : void
    getPcts(): Map<string, IPaciente>
    getEspecialidade(): string
}

class Paciente implements IPaciente {
    protected nome: string
    protected diagnostico: string
    protected medicos: Map<string, IMedico>
    constructor(nome: string, diagnostico: string) {
        this.nome = nome
        this.diagnostico = diagnostico
        this.medicos = new Map<string, IMedico>()
    }

    public getNome(): string {
        return this.nome
    }

    public getDiag(): string {
        return this.diagnostico
    }

    public addMdc(medico: IMedico) { 
        if (this.medicos.has(medico.getNome())) {
            return 
        }
        for (let meds of this.medicos.values())
            if (medico.getEspecialidade() === meds.getEspecialidade()) {
            console.log("paciente já é atendido por medico dessa especialidade")
            return 
        }    
        this.medicos.set(medico.getNome(), medico)
        medico.addPct(this)
    }
    
    public rmvMdc(medico: string) {
        let get = this.medicos.get(medico)
        this.medicos.delete(medico)
        if (get != undefined)
        get.rmvPct(this.getNome())
    }

    public getMdcs(): Map<string, IMedico> {
        return this.medicos
    }

    public toString() :string {
        let chaves = this.medicos.keys()
        return `${this.nome}: ${this.diagnostico} - Medicos:[${[...chaves].join(", ")}]`
    }
}

class Medico implements IMedico {
    nome: string
    especialidade: string
    pacientes: Map<string, IPaciente>
    constructor(nome: string, especialidade: string) {
        this.nome = nome
        this.especialidade = especialidade
        this.pacientes = new Map<string, IPaciente>()
    }

    public getNome() {
        return this.nome
    }

    public getEspecialidade(): string {
        return this.especialidade
    }

    public addPct(paciente: IPaciente){
       if(this.pacientes.has(paciente.getNome())) {
           return
       } 
       this.pacientes.set(paciente.getNome(), paciente)
       paciente.addMdc(this)
    }

    public rmvPct(paciente: string) {
        let get = this.pacientes.get(paciente)
        this.pacientes.delete(paciente)
        if(get != undefined)
        get.rmvMdc(this.getNome())
    }

    public getPcts(): Map<string, IPaciente> {
        return this.pacientes
    }

    public toString(): string {
        let chaves = this.pacientes.keys()
        return `medico ${this.nome}, ${this.especialidade} - pacientes[${[...chaves].join(", ")}]`
    }
}

class Hospital {
    medicos: Map<string, IMedico>
    pacientes: Map<string, IPaciente>
    constructor() {
    this.medicos = new Map<string, IMedico>()
    this.pacientes = new Map<string, IPaciente>()
    }

    addMed(medico: IMedico) {
        if(this.pacientes.has(medico.getNome())) {
            console.log("médico já cadastrado")
            return
        }
        this.medicos.set(medico.getNome(), medico)
    }

    addPct(paciente: IPaciente) {
        if(this.pacientes.has(paciente.getNome())) {
            console.log("paciente já cadastrado")
            return
        }
        this.pacientes.set(paciente.getNome(), paciente)
    }

    rmvMed(medico: string){
        for (let pcts of this.pacientes.values()) {
            pcts.rmvMdc(medico)
        }
        this.medicos.delete(medico)
    }

    rmvPct(paciente: string){
        for (let meds of this.medicos.values()) {
            meds.rmvPct(paciente)
        }
        this.pacientes.delete(paciente)
    }

    vincular(medico: string, paciente:string) {
        let med : IMedico | undefined = this.medicos.get(medico)
        let pct : IPaciente | undefined = this.pacientes.get(paciente)
        if (med !== undefined && pct !== undefined)
        med.addPct(pct)
    }

    toString()  {
        let saida = `pacientes: \n`
        for (let pcts of this.pacientes.values()) {
        saida += `${pcts.toString()} \n`
        }
    
        saida += `\n médicos \n`
        for (let meds of this.medicos.values()) {
            saida += `${meds.toString()} \n`
            }
        return saida
    }
}

let hosp = new Hospital()
hosp.addMed(new Medico("dio", "interna"))
hosp.addMed(new Medico("goba", "interna"))
hosp.addMed(new Medico("clebinho", "cirurgião"))
hosp.addMed(new Medico("ronaldo", "fenomeno"))
hosp.addPct(new Paciente("chico", "febre da vaca louca"))
hosp.addPct(new Paciente("rafa", "dor de barriga"))
hosp.addPct(new Paciente("fatima", "dodoi"))
hosp.vincular("dio", "fatima")
hosp.vincular("goba", "fatima")
hosp.vincular("dio", "chico")
hosp.vincular("ronaldo","chico")
console.log(hosp.toString())
hosp.rmvMed("dio")
hosp.rmvPct("chico")
console.log(hosp.toString())