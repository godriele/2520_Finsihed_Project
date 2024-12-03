let database = require("../database");
const { PrismaClient } = require("@prisma/client")
const db = new PrismaClient();

let remindersController = {
  list: async (req, res) => {
    const reminders = await db.reminder.findMany({
      where: pass
    })
    res.render("reminder/index", { reminders: database.cindy.reminders });
  },

  new: (req, res) => {
    res.render("reminder/create");
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database.cindy.reminders });
    }
  }, 

  create: async (req, res) => {
      //const userId = req.user.id;
      // Use paassport and tie it ot a user when usin reminder 
      await db.reminders.create({
        data: {
          title: req.body.title,
          description: req.body.description,
          completed: false,
          user: { connec: {id: userId }},
        },
      });
      res.redirect("/reminders");
  },


  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database.cindy.reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    //finds reminder id
    let reminderToUpdateID = parseInt(req.params.id)
    //finds reminder within database by id
    let reminder = database.cindy.reminders.find(reminder => reminder.id === reminderToUpdateID);
    //checks if reminder exists
    if (reminder) {
      //update title and text of reminder and marks it as true
      reminder.title = req.body.title
      reminder.description = req.body.description
      reminder.completed = req.body.completed === "true"

      //redirect to reminder page 
      res.redirect("/reminders")
    } else {
      // Handle case where reminer with given ID doesn't exist
      res.status(404).send("Reminder not found")
    }
  },

  delete: (req, res) => {
    // Implement this code
    /*
      Todo:
      - Get the reminder ID first 
      based on the edit func, can use
      req.params.id; to get each id 
      - Find the index of the reminder
      can assign the reminder.id to the deleteID
      - Remove said Reminder using splice 
    */
    // 1. Get the reminder ID
      let deleteID = req.params.id;
    // 2. Here i am assigning the reminder Id to the ID we want to delete
    // so when we view the reminder task, we are accessing that ID, so if we pressed delete 
    // the current ID we are in, we are splicing it to remove if from the array

    // this is similar to this:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
    let index = database.cindy.reminders.findIndex(reminder => reminder.id == deleteID);
    // 3. Remove the reminder
    // "1" for the number of reminders to rremove from the starting index
    database.cindy.reminders.splice(index, 1);
    
    res.redirect("/reminders");
  },
};

module.exports = remindersController;