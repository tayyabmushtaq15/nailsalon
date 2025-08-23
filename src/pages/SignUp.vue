<template>
	<div class="sign-up">
		<h2>Sign Up</h2>
		<form @submit.prevent="submitForm">
			<input v-model="username" type="text" placeholder="Username" required />
			<input v-model="email" type="email" placeholder="Email" required />
			<input
				v-model="password"
				type="password"
				placeholder="Password"
				required
			/>
			<button type="submit">Sign Up</button>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: "",
			email: "",
			password: ""
		};
	},
	methods: {
		submitForm() {
			console.log("Form submitted", this.username, this.email, this.password);
		}
	}
};
</script>

<style scoped>
.sign-up {
	padding: 20px;
	max-width: 400px;
	margin: 0 auto;
}
.sign-up form {
	display: flex;
	flex-direction: column;
}
.sign-up input {
	margin-bottom: 10px;
	padding: 10px;
}
.sign-up button {
	padding: 10px;
	background-color: #3498db;
	color: white;
	border: none;
}
</style>
