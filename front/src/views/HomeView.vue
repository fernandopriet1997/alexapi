<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>
      <h1>Hola?</h1>
      
      <input type="text" v-model="autor">
      <input type="text" v-model="message">
      <button @click="sendMessage"></button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import io from "socket.io-client";
export default {
  name: "HomeView",
  data(){
    return {
      autor: "",
      message: "",
      listMessages: [],
      socket: {}
    }
  },
  components: {
    HelloWorld,
  },
  mounted: {
      connect: function () {
        this.socket = io.connect("http://localhost:8080", { forceNew: true });
        this.socket.on("messages", (data) => this.listMessages = data)
      },
  },
  methods: {
    sendMessage() {
      const data = {
        author: this.autor,
        text: this.message,
      };
      this.socket.emit("new-message", data)
    }
  },
};
</script>
