const client = require('../lib/client');
const { getEmoji } = require('../lib/emoji.js');

// async/await needs to run in a function
run();

async function run() {

  try {
    // initiate connecting to db
    await client.connect();

    // run a query to create tables
    await client.query(`
                CREATE TABLE users (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(256) NOT NULL,
                    hash VARCHAR(512) NOT NULL,
                    name VARCHAR(512) NOT NULL
                );           
                CREATE TABLE favorites (
                    id SERIAL PRIMARY KEY NOT NULL,
                    name VARCHAR(512) NOT NULL,
                    categories VARCHAR(512) NOT NULL,
                    review_count INTEGER NOT NULL,
                    price VARCHAR(512),
                    transactions VARCHAR(512) NOT NULL,
                    url VARCHAR(512) NOT NULL,
                    image_url VARCHAR(512) NOT NULL,
                    is_closed BOOLEAN NOT NULL,
                    rating DECIMAL NOT NULL,
                    distance DECIMAL NOT NULL,
                    display_phone VARCHAR(512) NOT NULL,
                    city VARCHAR(512) NOT NULL,
                    zip_code VARCHAR(512) NOT NULL,
                    state VARCHAR(512) NOT NULL,
                    display_address VARCHAR(512) NOT NULL,
                    business_id VARCHAR(512) NOT NULL,
                    owner_id INTEGER NOT NULL REFERENCES users(id)
            );
        `);

    console.log('create tables complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch (err) {
    // problem? let's see the error...
    console.log(err);
  }
  finally {
    // success or failure, need to close the db connection
    client.end();
  }

}
