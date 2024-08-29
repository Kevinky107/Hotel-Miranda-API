import dotenv from "dotenv";
import { faker } from '@faker-js/faker';
import { pool } from "./utils/mySQLconnection";
import bcrypt from 'bcryptjs';

dotenv.config();

const start = async () => {

    console.log("Connection open");

    const num = 10;

    const deleteTables = async () => {
        const sql = `DROP TABLE IF EXISTS amenities, bookings, contacts, room_booking, rooms, rooms_images, users;`;
        await pool.query(sql);
        console.log("Tables deleted");
    };

    const createUsersTable = async () => {
        const sql = `CREATE TABLE Users (
            _id int AUTO_INCREMENT,
            name varchar(255) NOT NULL,
            password varchar(255) NOT NULL,
            email varchar(255) NOT NULL,
            picture varchar(255) NOT NULL,
            post varchar(255) NOT NULL,
            phone varchar(255) NOT NULL,
            postdescription varchar(255) NOT NULL,
            startdate varchar(255) NOT NULL,
            state boolean NOT NULL,
            PRIMARY KEY (_id)
        );`;
        await pool.query(sql);
        console.log("Created Users table");
    };

    const createContactsTable = async () => {
        const sql = `CREATE TABLE Contacts (
            _id int AUTO_INCREMENT,
            date varchar(255) NOT NULL,
            customer varchar(255) NOT NULL,
            email varchar(255) NOT NULL,
            phone varchar(255) NOT NULL,
            comment varchar(255) NOT NULL,
            archived boolean NOT NULL,
            PRIMARY KEY (_id)
        );`;
        await pool.query(sql);
        console.log("Created Contacts table");
    };

    const createRoomsTable = async () => {
        const sql = `CREATE TABLE Rooms (
            _id int AUTO_INCREMENT,
            name varchar(255) NOT NULL,
            type varchar(255) NOT NULL,
            price int NOT NULL,
            offer int NOT NULL,
            available boolean NOT NULL,
            PRIMARY KEY (_id)
        );`;
        await pool.query(sql);
        console.log("Created Rooms table");
    };

    const createAmenitiesTable = async () => {
        const sql = `CREATE TABLE Amenities (
            _id int AUTO_INCREMENT,
            room_id int NOT NULL,
            name varchar(255) NOT NULL,
            PRIMARY KEY (_id),
            FOREIGN KEY (room_id) REFERENCES Rooms (_id)
        );`;
        await pool.query(sql);
        console.log("Created Amenities table");
    };

    const createRoomImagesTable = async () => {
        const sql = `CREATE TABLE Rooms_Images (
            _id int AUTO_INCREMENT,
            url varchar(255) NOT NULL,
            room_id int NOT NULL,
            PRIMARY KEY (_id),
            FOREIGN KEY (room_id) REFERENCES Rooms (_id)
        );`;
        await pool.query(sql);
        console.log("Created RoomImages table");
    };

    const createBookingsTable = async () => {
        const sql = `CREATE TABLE Bookings (
            _id int AUTO_INCREMENT,
            guest varchar(255) NOT NULL, 
            picture varchar(255) NOT NULL,
            orderdate varchar(255) NOT NULL,
            checkin varchar(255) NOT NULL,
            checkout varchar(255) NOT NULL,
            note varchar(255),
            status varchar(255) NOT NULL,
            roomid int NOT NULL,
            PRIMARY KEY (_id),
            FOREIGN KEY (roomid) REFERENCES Rooms (_id)
        );`;
        await pool.query(sql);
        console.log("Created Bookings table");
    };

    // INSERT DATA

    const insertDataIntoUsers = async () => {
        const sql = 'INSERT INTO Users (startdate, name, email, phone, picture, post, postdescription, state, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

        const createRandomUser = async () => {
            const firstname = faker.person.firstName();
            const lastname = faker.person.lastName();
            const password = faker.internet.password();    
            const user = {
                startdate: faker.date.past({years: 10}).toISOString().slice(0, 10),
                name: `${firstname} ${lastname}`,
                email: faker.internet.email({ firstName: firstname, lastName: lastname }),
                phone: faker.phone.number(),
                picture: faker.image.avatarGitHub(),
                post: faker.helpers.arrayElement(['Manager', 'Room Service', 'Reception']),
                postdescription: faker.lorem.paragraph({ min: 1, max: 2 }),
                state: faker.datatype.boolean(0.9),
                password: await bcrypt.hash(password, 10)
            }

            const values = [user.startdate, user.name, user.email, user.phone, user.picture, user.post, user.postdescription, user.state, user.password];

            await pool.execute(sql, values);
        };

        const createMe = async () => {
            const password = '1234'
            const me = {
                startdate: "2024-06-24",
                name: `Kevin Agudo Montil`,
                email: `Kevinagudomontil@gmail.com`,
                phone: `616422058`,
                picture: "yo.jpeg",
                post: `Manager`,
                postdescription: `full stack developer, is in charge of the operation of the website, its database and its visualization as well as its maintenance`,
                state: true,
                password: await bcrypt.hash(password, 10)
            }

            const values = [me.startdate, me.name, me.email, me.phone, me.picture, me.post, me.postdescription, me.state, me.password];

            await pool.execute(sql, values);
        };

        for(let i = 0; i < num-1; i++) {
            await createRandomUser();
        }

        await createMe();
        console.log("Data inserted into Users");
    };

    const insertDataIntoContacts = async () => {
        const sql = 'INSERT INTO Contacts (date, customer, email, phone, comment, archived) VALUES (?, ?, ?, ?, ?, ?)';

        const createRandomContact = async () => {
            const firstname = faker.person.firstName();
            const lastname = faker.person.lastName();
            const contact = {
                date: faker.date.past({years: 10}).toISOString().slice(0, 10),
                customer: `${firstname} ${lastname}`,
                email: faker.internet.email({ firstName: firstname, lastName: lastname }),
                phone: faker.phone.number(),
                comment: faker.lorem.paragraph({ min: 1, max: 3 }),
                archived: faker.datatype.boolean(0.2)
            }

            const values = [contact.date, contact.customer, contact.email, contact.phone, contact.comment, contact.archived];

            await pool.execute(sql, values);
        };

        for(let i = 0; i < num; i++) {
            await createRandomContact();
        }
        console.log("Data inserted into Contacts");

    };

    const insertDataIntoRooms = async () => {
        const sql = 'INSERT INTO Rooms (name, type, price, offer, available) VALUES (?, ?, ?, ?, ?)';

        const createRandomRoom = async () => {
            const price = faker.number.int({min: 200, max: 400});
            const room = {
                name: `Room ${faker.number.int({ max: 999 })}`,
                type: faker.helpers.arrayElement(['Suite', 'Single Bed', 'Double Bed', 'Double Superior']),
                price: price,
                offer: faker.number.int({min: 100, max: price}),
                available: faker.datatype.boolean(0.7)
            };

            const values = [room.name, room.type, room.price, room.offer, room.available];

            await pool.execute(sql, values);
        };

        for(let i = 0; i < num; i++) {
            await createRandomRoom();
        }
        console.log("Data inserted into Rooms");
    };

    const insertDataIntoAmenities = async () => {
        const amenitiesArray = ['AC','Shower','Double Bed','Towel','Bathup','Cofee Set','LED TV','Wifi'];
        const sql = 'INSERT INTO Amenities (room_id, name) VALUES (?, ?)';

        const createRandomAmenities = async (id: number, name: string) => {
            const values = [id, name];
            await pool.execute(sql, values);
        };

        for(let i = 1; i <= num; i++) {
            for(let j = 0; j < 8; j++){
                if(Math.random() > 0.5) {
                    await createRandomAmenities(i, amenitiesArray[j]);
                }
            }
        }
        console.log("Data inserted into Amenities");

    };

    const insertDataIntoRoomImages = async () => {
        const sql = 'INSERT INTO Rooms_Images (room_id, url) VALUES (?, ?)';

        const createRandomRoomImages = async (id: number) => {
            const imageArray = [faker.image.urlPicsumPhotos()];
                
            for(let j = 0; j < 3; j++){
                if(Math.random() > 0.7) {
                    imageArray.push(faker.image.urlPicsumPhotos());
                }
            }

            for(let i = 0; i < imageArray.length; i++){
                const values = [id, imageArray[i]];
                await pool.execute(sql, values);
            }
            
        };

        for(let i = 1; i <= num; i++) {
            await createRandomRoomImages(i);
        }

        console.log("Data inserted into RoomImages");

    };

    const insertDataIntoBookings = async () => {
        const sql = 'INSERT INTO Bookings (guest, picture, orderdate, checkin, checkout, note, roomid, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

        const bookingNote = (): null | string => {
            return Math.random() > 0.6 ? faker.lorem.paragraph({ min: 1, max: 3 }) : null;
        };

        const createRandomBooking = async (id: number) => {
            const reference = faker.date.recent();
            faker.setDefaultRefDate(reference);
            const later = new Date(reference.getTime() + faker.number.int({min: 86400000, max: 2160000000}));
            const booking = {
                guest: faker.person.fullName(),
                picture: faker.image.avatarGitHub(),
                orderdate: faker.date.past({ years: 1 }).toISOString().slice(0, 10),
                checkin: faker.defaultRefDate().toISOString().slice(0, 10),
                checkout: later.toISOString().slice(0, 10),
                note: bookingNote(),
                roomid: id,
                status: faker.helpers.arrayElement(['check in', 'check out', 'in progress'])
            };

            const values = [booking.guest, booking.picture, booking.orderdate, booking.checkin, booking.checkout, booking.note, booking.roomid, booking.status];

            await pool.execute(sql, values);
        };

        for(let i = 0; i < num; i++) {
            await createRandomBooking(i+1);
        }
        console.log("Data inserted into Bookings");
    };

    try {
        await deleteTables();

        await createUsersTable();
        await createContactsTable();
        await createRoomsTable();
        await createAmenitiesTable();
        await createRoomImagesTable();
        await createBookingsTable();

        await insertDataIntoUsers();
        await insertDataIntoContacts();
        await insertDataIntoRooms();
        await insertDataIntoAmenities();
        await insertDataIntoRoomImages();
        await insertDataIntoBookings();

    } catch(e) {
        console.log(e);
    } finally {
        await pool.end();
        console.log("Connection ended");
    }
};

start();