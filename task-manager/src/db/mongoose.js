import { connect } from 'mongoose';

console.log('mongoose');
const mongoDbUrl = process.env.MONGO_DB_URL.replace('$MONGO_PWD', process.env.MONGO_PWD);

const dbURI = `${mongoDbUrl}/task-manager`;
// connect to mongoDB
connect(dbURI, {
  autoCreate: true
});

