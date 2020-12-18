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
  }
};
