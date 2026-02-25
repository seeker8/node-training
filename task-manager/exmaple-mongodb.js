import { MongoClient, ObjectId } from 'mongodb';

const dbURI = 'mongodb://localhost:27017/';
const databaseName = 'task-manager'
const mongoClient = new MongoClient(dbURI);

try {

  const database = mongoClient.db(databaseName);
  const users = database.collection('users');

  const filter = {
    occupation: {
      $eq: 'student'
    }
  };
  const result = await users.deleteMany(filter, {
    $inc: {
      age: 1
    }
  });

  // matchedCount for updates, deletedCount for delitions
  console.log(`${result.deletedCount} document(s) were deleted`);

}
catch (error) {
  console.log(error);
}
finally {
  mongoClient.close()
}