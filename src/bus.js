import Vue from 'vue';

Vue.prototype.$bus = new Vue();

// Message
// vm.$emit('message:push', message, status);
// message(String): 訊息內容
// status(String): Alert 的樣式

// GetCart
// this.$bus.$emit('GetCart');
// 觸發 Event CartModal.vue GetCart()
