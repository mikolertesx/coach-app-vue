export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const server = process.env.VUE_APP_SERVER;

    const coachData = {
      id: context.rootGetters.userId,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas
    };

    const response = await fetch(`${server}/coaches/${userId}.json`, {
      method: 'PUT',
      body: JSON.stringify(coachData)
    });

    if (!response.ok) {
      return;
    }

    const responseData = await response.json();

    context.commit('registerCoach', {
      ...responseData,
      id: userId
    });
  },
  async loadCoaches(context) {
    // const userId = context.rootGetters.userId;
    const server = process.env.VUE_APP_SERVER;
    const response = await fetch(`${server}/coaches.jso`);
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch');
      throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const {
        firstName,
        lastName,
        description,
        hourlyRate,
        areas
      } = responseData[key];

      const coach = {
        firstName,
        lastName,
        description,
        hourlyRate,
        areas
      };

      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
  }
};
