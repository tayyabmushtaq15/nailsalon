<template>
  <div class="sign-in">
    <h2>Sign In</h2>
    <form @submit.prevent="submitForm">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    submitForm() {
      // handle sign in logic here
      console.log('Form submitted', this.email, this.password);
    },
  },
};
</script>

<style scoped>
.sign-in {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}
.sign-in form {
  display: flex;
  flex-direction: column;
}
.sign-in input {
  margin-bottom: 10px;
  padding: 10px;
}
.sign-in button {
  padding: 10px;
  background-color: #3498db;
  color: white;
  border: none;
}
</style>
