import dotenv from "dotenv"
import mysql from 'mysql2';
import { faker } from '@faker-js/faker';

dotenv.config();

const start = async () => {

    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'hotelmiranda',
        port: 3306,
        password: process.env.MYSQL_PASSWORD
    });

    const num = 10;

    const deleteTables = async () => {
        const sql = `DROP TABLE IF EXISTS amenities, bookings, contacts, room_booking, rooms, rooms_images, users;`
        connection.query(sql);
    }

    const createUsersTable = async () => {
        const sql = `CREATE TABLE Users (
            _id int AUTO_INCREMENT,
            name varchar(255),
            password varchar(255),
            email varchar(255),
            picture varchar(255),
            post varchar(255),
            phone varchar(255),
            postdescription varchar(255),
            startdate varchar(255),
            state boolean,
            PRIMARY KEY (_id)
        );`
        connection.query(sql);
    }

    const createContactsTable = async () => {
        const sql = `CREATE TABLE Contacts (
            _id int AUTO_INCREMENT,
            date varchar(255),
            customer varchar(255),
            email varchar(255),
            phone varchar(255),
            comment varchar(255),
            archived boolean,
            PRIMARY KEY (_id)
        );`
        connection.query(sql);
    }

    const createRoomsTable = async () => {
        const sql = `CREATE TABLE Rooms (
            _id int AUTO_INCREMENT,
            name varchar(255),
            images int,
            type int,
            price int,
            offer int,
            amenities int,
            available boolean,
            PRIMARY KEY (_id)
        );`
        connection.query(sql);
    }

    const createAmenitiesTable = async () => {
        const sql = `CREATE TABLE Amenities (
            _id int AUTO_INCREMENT,
            room_id int,
            name varchar(255),
            PRIMARY KEY (_id),
            FOREIGN KEY (room_id) REFERENCES Rooms(_id)
        );`
        connection.query(sql);
    }

    const createRoomImagesTable = async () => {
        const sql = `CREATE TABLE Rooms_Images (
            _id int AUTO_INCREMENT,
            url varchar(255),
            room_id int,
            PRIMARY KEY (_id)
        );`
        connection.query(sql);
    }

    const addAlterRoomImage = async () => {
        const sql = `ALTER TABLE Rooms_Images
        ADD CONSTRAINT fk_room_images
        FOREIGN KEY (room_id) REFERENCES Rooms(_id);`
        connection.query(sql);
    }

    const addAlterRooms = async () => {
        const sql = `ALTER TABLE Rooms
        ADD CONSTRAINT fk_room_images_in_rooms
        FOREIGN KEY (images) REFERENCES Rooms_Images(_id),
        ADD CONSTRAINT fk_amenities
        FOREIGN KEY (amenities) REFERENCES Amenities(_id)`
        connection.query(sql);
    }

    const createBookingsTable = async () => {
        const sql = `CREATE TABLE Bookings (
            _id int AUTO_INCREMENT,
            guest varchar(255),
            picture varchar(255),
            checkin varchar(255),
            checkout varchar(255),
            note varchar(255),
            roomtype varchar(255), 
            roomid int,
            status varchar(255),
            PRIMARY KEY (_id),
            FOREIGN KEY (roomid) REFERENCES Rooms (_id)
        );`
        connection.query(sql);
    }

    const createRoomBookingTable = async () => {
        const sql = `CREATE TABLE Room_Booking (
            _id int AUTO_INCREMENT,
            booking_id int,
            room_id int, 
            PRIMARY KEY (_id),
            FOREIGN KEY (booking_id) REFERENCES Bookings (_id),
            FOREIGN KEY (room_id) REFERENCES Rooms (_id)
        );`
        connection.query(sql);
    }

    // INSERT DATA

    const insertDataIntoUsers = () => {

        const sql = 'INSERT INTO Users (startdate, name, email, phone, picture, post, postdescription, state, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'

        const createRandomUser = () => {
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
                password: password
            }

            const values = [user.startdate, user.name, user.email, user.phone, user.picture, user.post, user.postdescription, user.state, user.password]

            connection.execute(sql, values)
        }

        const createMe = () => {
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
                password: password
            }

            const values = [me.startdate, me.name, me.email, me.phone, me.picture, me.post, me.postdescription, me.state, me.password]

            connection.execute(sql, values)
        }

        for(let i = 0; i < num-1; i++) {
            createRandomUser()
        }

        createMe()
    }

    const insertDataIntoContacts = () => {

        const sql = 'INSERT INTO Contacts (date, customer, email, phone, comment, archived) VALUES (?, ?, ?, ?, ?, ?)'

        const createRandomContact = () => {
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

            const values = [contact.date, contact.customer, contact.email, contact.phone, contact.comment, contact.archived]

            connection.execute(sql, values)
        }

        for(let i = 0; i < num-1; i++) {
            createRandomContact()
        }

    }


    try{

        deleteTables()
        createUsersTable()
        createContactsTable()
        createRoomsTable()
        createAmenitiesTable()
        createRoomImagesTable()
        addAlterRoomImage()
        addAlterRooms()
        createBookingsTable()
        createRoomBookingTable()

        insertDataIntoUsers()
        insertDataIntoContacts()

        connection.end();

    } catch(e){
        console.log(e)
    }
    
};

start();