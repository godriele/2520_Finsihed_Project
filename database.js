let Database = {
  cindy: {
    login: [
      { 
        email: "cindy@email.com",
        password: "password"
      },
    ],
    reminders: [
      {
        id: 1,
        title: "buy milk",
        description: "go to safeway and buy milk",
        completed: false,
      },
    ],
  },
  alex: {
    reminders: [],
  },
};

module.exports = Database;
