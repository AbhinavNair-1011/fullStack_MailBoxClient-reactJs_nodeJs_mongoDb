const mongoose = require("mongoose")
const { MongoMemoryServer} = require(('mongo-memory-server'))

let mongoServer;

beforeAll(async ()=>{
mongoServer= await MongoMemoryServer.create();
const uri = mongoServer.getUri();
await mongoose.connect(uri)

});

afterAll(async ()=>{
    await mongoose.disconnect();
    await mongoServer.stop()
});

afterEach(async ()=>{
    const collection= await mongoose.connection.db.collections();
    for(let collection of collections){
        await collection.deleteMany()
    }})