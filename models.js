const mongoose = require("mongoose");
//encripting passwords
const bcrypt = require('bcrypt');

/**
 * Represents the schema for a game in the database
 *
 * @typedef {Object} GameSchema
 * @property {string} title - The title of the game (required)
 * @property {string} image - URL of the game's image
 * @property {string} description - The game's description (required)
 * @property {number} releaseYear - The year the game was released
 * @property {string[]} platform - List of platforms the game is available on
 * @property {Object} developer - Information about the game's developer
 * @property {string} developer.name - The name of the developer
 * @property {number} developer.foundedYear - The year the developer was founded
 * @property {string} developer.description - Description of the developer
 * @property {Object[]} genre - List of genres the game belongs to
 * @property {string} genre.name - The name of the genre
 * @property {string} genre.description - Description of the genre
 * @property {string} series - The series to which the game belongs
 * @property {boolean} featured - Indicates if the game is featured
 */
let gameSchema = mongoose.Schema({
    title: {type: String, required: true},
    image: String,
    description: {type: String, required: true},
    releaseYear: Number,
    platform: [String],
    developer: {
        name: String,
        foundedYear: Number,
        description: String
    },
    genre:[{
        name: String,
        description: String
    }],
    series: String,
    featured: Boolean
});

/**
 * Represents the schema for a user in the database
 *
 * @typedef {Object} UserSchema
 * @property {string} username - The username of the user (required)
 * @property {string} password - The encrypted password of the user (required)
 * @property {string} email - The email address of the user (required)
 * @property {Date} birthday - The user's date of birth
 * @property {mongoose.Types.ObjectId[]} favoriteGames - Array of game IDs the user has marked as favorites
 */
let userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    birthday: Date, 
    favoriteGames: [{type: mongoose.Schema.Types.ObjectId, ref: "Game"}]
});

//encrypt password
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
  };
//validate password using encryption
  userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

let Game = mongoose.model("Game", gameSchema);
let User = mongoose.model("User", userSchema);

module.exports.Game = Game;
module.exports.User = User;