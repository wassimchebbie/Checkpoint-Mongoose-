const Person = require('../models/person');

const createAndSavePerson = async (done) => {
  try {
    const person = new Person({
      name: 'John Doe',
      age: 25,
      favoriteFoods: ['Pizza', 'Pasta'],
    });
    const savedPerson = await person.save();
    done(null, savedPerson);
  } catch (err) {
    done(err);
  }
};

const createManyPeople = async (arrayOfPeople, done) => {
  try {
    const people = await Person.create(arrayOfPeople);
    done(null, people);
  } catch (err) {
    done(err);
  }
};

const findPeopleByName = async (name, done) => {
  try {
    const people = await Person.find({ name });
    done(null, people);
  } catch (err) {
    done(err);
  }
};

const findOneByFood = async (food, done) => {
  try {
    const person = await Person.findOne({ favoriteFoods: food });
    done(null, person);
  } catch (err) {
    done(err);
  }
};

const findPersonById = async (personId, done) => {
  try {
    const person = await Person.findById(personId);
    done(null, person);
  } catch (err) {
    done(err);
  }
};

const findEditThenSave = async (personId, done) => {
  try {
    const person = await Person.findById(personId);
    if (!person) throw new Error('Person not found');
    person.favoriteFoods.push('hamburger');
    const updatedPerson = await person.save();
    done(null, updatedPerson);
  } catch (err) {
    done(err);
  }
};

const findAndUpdate = async (personName, done) => {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName },
      { age: 20 },
      { new: true }
    );
    done(null, updatedPerson);
  } catch (err) {
    done(err);
  }
};

const removeById = async (personId, done) => {
  try {
    const removedPerson = await Person.findByIdAndRemove(personId);
    done(null, removedPerson);
  } catch (err) {
    done(err);
  }
};

const removeManyPeople = async (done) => {
  try {
    const result = await Person.remove({ name: 'Mary' });
    done(null, result);
  } catch (err) {
    done(err);
  }
};

const queryChain = async (done) => {
  try {
    const people = await Person.find({ favoriteFoods: 'burritos' })
      .sort('name')
      .limit(2)
      .select('-age');
    done(null, people);
  } catch (err) {
    done(err);
  }
};

module.exports = {
  createAndSavePerson,
  createManyPeople,
  findPeopleByName,
  findOneByFood,
  findPersonById,
  findEditThenSave,
  findAndUpdate,
  removeById,
  removeManyPeople,
  queryChain,
};