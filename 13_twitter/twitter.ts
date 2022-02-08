class User {
    private username: string
    private inbox: Inbox
    private following: Map<string, User>
    private followers: Map<string, User>
    
    constructor (name: string) {
        this.username = name
        this.inbox = new Inbox
        this.following = new Map<string, User>()
        this.followers = new Map<string, User>()
        
    }

    getUsername() {
        return this.username
    }

    getFollowers() {
        return this.followers.keys()
    }

  
    
    follow(seguir: User) {
        if (this.username == seguir.getUsername()){
            return console.log ("você não pode se seguir!")
        }
        this.following.set(seguir.getUsername(), seguir)
        seguir.followers.set(this.getUsername(), this)
    }

    sendTwitada(twitada: Tweet) {
        this.inbox.guardarNaTimeline(twitada)
        this.inbox.guardarNosMeusTweets(twitada)
        for (let seguidores of this.followers.values()) {
            seguidores.inbox.guardarNaTimeline(twitada)
        }

    }
    
    public toString() :string {
        let followers = this.followers.keys()
        let following = this.following.keys()
        return `${this.username} \n Seguindo [${[...following].join(", ")}] \n Seguidores [${[...followers].join(", ")}]`
    }

    getInbox() {      
        return `Timeline de ${this.username}:\n${this.inbox.toString()}`
    }
}

class Tweet {
    private id: number
    private sender: string
    private msg: string

    constructor(id:number, sender: string, msg:string) {
        this.id = id
        this.sender = sender
        this.msg = msg
    }

    getSender() {
        return this.sender
    }

    getId() {
        return this.id
    }

    getMsg() {
        return this.msg
    }

    toString() {
        return `${this.sender}: ${this.msg} (c${this.id})`
    }
}

class Inbox {
    private timeline: Map<number, Tweet>
    private myTweets: Map<number, Tweet>

    constructor() {
        this.timeline = new Map<number, Tweet>()
        this.myTweets = new Map<number, Tweet>()
    }

    public getTimeline() {
        return this.timeline
    }
    
    public guardarNaTimeline(tweet: Tweet) {
        this.timeline.set(tweet.getId(), tweet)
    }

    public guardarNosMeusTweets(tweet: Tweet) {
        this.myTweets.set(tweet.getId(), tweet)
    }

    toString() {
        let saida = ``
        for(let tweets of this.timeline.values()) {
            saida += `${tweets.toString()}\n`
        }
        return saida

    }

}


class Controller {
    private users: Map<string, User>
    private nextTweetId: number
    private tweets: Map<number, Tweet>
    constructor () {
        this.users = new Map<string, User>()
        this.nextTweetId = 0
        this.tweets = new Map<number, Tweet>()
    }

    public getUser(user: string): User | undefined {
        if (user != undefined)
        return this.users.get(user)
    }

    public cadastrar(newuser: User) {
       
        if (this.users.has(newuser.getUsername())) {
           return console.log ("Nome já está em uso")
        }
        this.users.set(newuser.getUsername(), newuser)
    }

    public sendTwitada(sender: string, msg: string)  {
        if (!this.users.has(sender)) {
            return console.log("Usuário inexistente")
        }
    
   
       let tweet: Tweet = this.criarTweet(sender, msg)
        
       this.tweets.set(this.nextTweetId, tweet)
       let quemTwitou = this.users.get(sender)
       if (quemTwitou != undefined)
       quemTwitou.sendTwitada(tweet) 
        

    }

    public criarTweet(usuario: string, msg: string) : Tweet {
        this.nextTweetId++
        let tweet: Tweet = new Tweet(this.nextTweetId, usuario, msg)
        
        return tweet 
    }

    public toString() {
        let saida = ""
        for(let twiteiros of this.users.values()) {
            saida += `${twiteiros.toString()}\n`
        }
        return saida
    }

    public testeTimeline() {
        let saida = ``
        for(let twiteiros of this.tweets.values()) {
            saida += `${twiteiros.toString()}\n`
        }
        return saida
    }


}


// let goba = new User("goba")
// let chico = new User("chico")
// let dio = new User("dio")
// goba.follow(chico)
// chico.follow(dio)
// chico.follow(goba)
// console.log(goba.toString())
// console.log(chico.toString())
// console.log(dio.toString())



let twitter = new Controller()
let goba = new User("goba")
let chico = new User("chico")
let dio = new User("dio")
twitter.cadastrar(chico)
twitter.cadastrar(goba)
twitter.cadastrar(dio)
chico.follow(dio)
chico.follow(goba)
dio.follow(chico)
twitter.sendTwitada("goba", "não sei usar essa rede social")
twitter.sendTwitada("chico", "será se deu bom")
twitter.sendTwitada("chico", "vou hitar")
// console.log(goba.toString())
// console.log(chico.toString())
// console.log(dio.toString())
console.log(twitter.toString())
console.log(dio.getInbox())
console.log(goba.getInbox())

console.log(chico.getInbox())