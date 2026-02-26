import { connect } from 'mongoose';

console.log('mongoose');
const dbURI = 'mongodb://localhost:27017/task-manager';
// connect to mongoDB
connect(dbURI, {
  autoCreate: true
});

