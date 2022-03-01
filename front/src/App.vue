<template>
<div>
  <div>
      <h1>{{fotogram}}</h1>
      <h1>{{ event.test }}</h1>
      <div v-for="message in listMessages" :key="message.id">
        {{message.author}}: {{message.text}}
      </div>
      <input type="text" v-model="autor">
      <input type="text" v-model="message">
      <button @click="sendMessage"></button>
      <button @click="animate('saludo')">play</button>
      {{response}}
    </div>
</div>
</template>

<script>
// @ is an alias to /src

import  { io } from "socket.io-client";
export default {
  data(){
    return {
      autor: "",
      message: "",
      listMessages: [],
      socket: {},
      event: "",
      fotogram: "",
      currentFotogram: 0,
      saludo: [
        '(°>°)┐',
        "(°>¯)┘",
        '(°>°)┐',
      ],
      response: {},
    }
  },

  mounted() {
    this.connect()
      
  },
  methods: {
    sendMessage() {
      const data = {
        author: this.autor,
        text: this.message,
      };
      this.socket.emit("new-message", data)
    },
    animate(type){
      if(type == "saludo"){
        setTimeout(() => this.playSaludo(), 1000)
      } 
    },
    playSaludo(){
      if(this.currentFotogram < this.saludo.length){
        this.fotogram = this.saludo[this.currentFotogram]
        this.currentFotogram++
        this.animate("saludo")
      }else{
        this.fotogram = ""
      }
    },
    connect() {
        this.socket = io("http://localhost:3000");
        this.socket.on("messages", (data) => this.listMessages = data)
        this.socket.on("reader", (data) => {
          this.response = data
          if(data.type == "animation"){
            this.animate(data.action)
          }
        })
        
      },
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
