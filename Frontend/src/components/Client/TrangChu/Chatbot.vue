<template>
  <div>
    <div v-if="!opened" class="chatbot-toggle-btn" @click="opened = true" style="position: fixed; bottom: 20px; right: 20px; z-index: 9999;">
      <button style="width: 56px; height: 56px; border-radius: 50%; background: #1c2331; color: #fff; border: none; box-shadow: 0 2px 8px rgba(0,0,0,0.2); font-size: 28px; cursor: pointer;">💬</button>
    </div>
    <div v-else class="chatbot-box" style="position: fixed; bottom: 20px; right: 20px; width: 350px; background: #fff; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.2); z-index: 9999;">
      <div style="background: #1c2331; color: #fff; padding: 10px; border-top-left-radius: 10px; border-top-right-radius: 10px; display: flex; justify-content: space-between; align-items: center;">
        <span>Chatbot</span>
        <button @click="opened = false" style="background: transparent; border: none; color: #fff; font-size: 20px; cursor: pointer;">×</button>
      </div>
      <div style="max-height: 300px; overflow-y: auto; padding: 10px;">
        <div v-for="(msg, idx) in messages" :key="idx" :style="{textAlign: msg.from === 'user' ? 'right' : 'left', margin: '5px 0'}">
          <span :style="{background: msg.from === 'user' ? '#e0e0e0' : '#f5f5f5', padding: '6px 12px', borderRadius: '16px', display: 'inline-block'}">{{ msg.text }}</span>
        </div>
      </div>
      <div style="display: flex; border-top: 1px solid #eee;">
        <input v-model="input" @keyup.enter="sendMessage" placeholder="Nhập tin nhắn..." style="flex: 1; border: none; padding: 10px; outline: none; border-bottom-left-radius: 10px;" />
        <button @click="sendMessage" style="border: none; background: #1c2331; color: #fff; padding: 10px 16px; border-bottom-right-radius: 10px;">Gửi</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      input: '',
      messages: [],
      opened: false
    };
  },
  methods: {
    async sendMessage() {
      if (!this.input.trim()) return;
      const userMsg = this.input;
      this.messages.push({ from: 'user', text: userMsg });
      this.input = '';
      try {
        const res = await axios.post('http://127.0.0.1:8000/api/chatbot', { message: userMsg });
        this.messages.push({ from: 'bot', text: res.data.reply });
      } catch (e) {
        this.messages.push({ from: 'bot', text: 'Lỗi kết nối server!' });
      }
    }
  }
};
</script>

<style scoped>
</style> 