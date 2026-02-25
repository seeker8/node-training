import { MongoClient, ObjectId } from 'mongodb';

const dbURI = 'mongodb://localhost:27017/';
const databaseName = 'task-manager'
const mongoClient = new MongoClient(dbURI);

try {
  const database = mongoClient.db(databaseName);
  const tasks = database.collection('tasks');
  // const users = database.collection('users');

  // const aTask = await tasks.findOne({ title: 'first task' });
  // users.insertOne({
  //   name: 'Aira',
  //   age: 16
  // }).then((res) => console.log(res));
  // console.log(aTask);

  // const currentUsers = users.find({});
  // while (await currentUsers.hasNext()) {
  //   console.log(await currentUsers.next());
  // }

  // challenge section
  const tasksToInsert = [
    {
      descritption: 'this is a description for task 1',
      completed: false
    },
    {
      descritption: 'this is a description for task 2',
      completed: false
    },
    {
      descritption: 'this is a description for task 3',
      completed: false
    }
  ];
  // const insertedResult = await tasks.insertMany(tasksToInsert);
  // console.log(`${insertedResult.insertedCount} tasks were inserted`);
  const existingTasks = tasks.find();
  for await (const task of existingTasks) {
    console.log(task);
  }

  const task1 = await tasks.findOne({ _id: { $eq: new ObjectId('699f6c49ba43d14ee47e3c12') } });
  console.log('task1', task1);
}
catch (err) {
  console.log(err)
}
finally {
  mongoClient.close();
}