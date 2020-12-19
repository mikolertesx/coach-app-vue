export default {
  login() {},
  async signup(_context, payload) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true
      })
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error(responseData.error.message);
      const error = new Error(
        responseData.error.message || 'Failed to authenticate.'
      );
      throw error;
    }

    console.log(responseData);

    _context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    });
  }
};
