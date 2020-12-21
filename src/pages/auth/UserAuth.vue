<template>
  <div>
    <base-dialog :show="!!error" title="An error ocurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <base-dialog fixed :show="isLoading" title="Authenticating...">
      <base-spinner></base-spinner>
    </base-dialog>
    <form @submit.prevent="submitForm">
      <base-card>
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model.trim="password"
          />
        </div>
        <p v-if="!formIsValid">Correct the errors in the file.</p>
        <base-button type="submit">{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </base-card>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      formIsValid: true,
      mode: 'login',
      isLoading: false,
      error: null,
    };
  },
  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      }
      return 'Sign up';
    },
    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Signup instead';
      }
      return 'Login instead';
    },
  },
  methods: {
    async submitForm() {
      this.formIsValid = true;
      if (
        this.email === '' ||
        !this.email.includes('@') ||
        this.password.length < 6
      ) {
        this.formIsValid = false;
        return;
      }

      this.isLoading = true;

      try {
        if (this.mode === 'login') {
          await this.$store.dispatch('login', {
            email: this.email,
            password: this.password,
          });
        } else {
          await this.$store.dispatch('signup', {
            email: this.email,
            password: this.password,
          });
        }
        const redirectUrl = `/${this.$route.query.redirect || 'coaches'}`;
        this.$router.replace(redirectUrl);
      } catch (err) {
        this.error = err.message || 'Failed to authenticate.';
        switch (err.message) {
          case 'EMAIL_EXISTS':
            this.error = 'Email is already in use.';
            break;
          default:
            this.error = 'Failed to authenticate';
            break;
        }
      }

      this.isLoading = false;
    },
    switchAuthMode() {
      this.mode = this.mode === 'login' ? 'register' : 'login';
    },
    handleError() {
      this.error = null;
    },
  },
};
</script>

<style>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>