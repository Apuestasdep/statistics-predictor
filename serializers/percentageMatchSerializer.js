class PercentageMatchSerializer {
  static serialize(percentageMatch, fields = ['goals_first_team', 'goals_second_team', 'games_number']) {
    const serializedPercentageMatch = {};
    fields.forEach((field) => {
      serializedPercentageMatch[field] = percentageMatch[field];
    });
    return serializedPercentageMatch;
  }
}

module.exports = PercentageMatchSerializer;
