export default {
  async contactCoach(context, payload) {
    const coachData = {
      id: new Date().toISOString(),
      coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message
    };
    context.commit('addRequest', coachData);
  }
};
