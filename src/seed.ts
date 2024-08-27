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
            type varchar(255),
            price int,
            offer int,
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
            PRIMARY KEY (_id),
            FOREIGN KEY (room_id) REFERENCES Rooms(_id)
        );`
        connection.query(sql);
    }

    const createBookingsTable = async () => {
        const sql = `CREATE TABLE Bookings (
            _id int AUTO_INCREMENT,
            guest varchar(255),
            picture varchar(255),
            orderdate varchar(255),
            checkin varchar(255),
            checkout varchar(255),
            note varchar(255),
            status varchar(255),
            PRIMARY KEY (_id)
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

        for(let i = 0; i < num; i++) {
            createRandomContact()
        }

    }

    const insertDataIntoRooms = () => {

        const sql = 'INSERT INTO Rooms (name, type, price, offer, available) VALUES (?, ?, ?, ?, ?)'

        const createRandomRoom = () => {
            const price = faker.number.int({min: 200, max: 400})
            const room = {
                name: `Room ${faker.number.int({ max: 999 })}`,
                type: faker.helpers.arrayElement(['Suite', 'Single Bed', 'Double Bed', 'Double Superior']),
                price: price,
                offer: faker.number.int({min: 100, max: price}),
                available: faker.datatype.boolean(0.7)
            }

            const values = [room.name, room.type, room.price, room.offer, room.available]

            connection.execute(sql, values)
        }

        for(let i = 0; i < num; i++) {
            createRandomRoom()
        }

    }

    const insertDataIntoAmenities = () => {

        const amenitiesArray = ['AC','Shower','Double Bed','Towel','Bathup','Cofee Set','LED TV','Wifi']
        const sql = 'INSERT INTO Amenities (room_id, name) VALUES (?, ?)'

        const createRandomAmenities = (id: number, name: string) => {

            const values = [id, name]

            connection.execute(sql, values)
        }

        for(let i = 1; i <= num; i++) {
            for(let j = 0; j < 8; j++){
                if(Math.random() > 0.5)
                    createRandomAmenities(i,amenitiesArray[j])
            }
        }

    }

    const insertDataIntoRoomImages = () => {

        const sql = 'INSERT INTO Rooms_Images (room_id, url) VALUES (?, ?)'
    
        const createRandomRoomImages = (id: number) => {

            const imageArray = [faker.image.urlPicsumPhotos()]
                
            for(let j = 0; j < 3; j++){
                if(Math.random() > 0.5)
                    imageArray.push(faker.image.urlPicsumPhotos())
            }

            for(let i = 0; i < imageArray.length; i++){
                const values = [id, imageArray[i]]
                connection.execute(sql, values)
            }
            
        }

        for(let i = 1; i <= num; i++) {
            createRandomRoomImages(i)
        }

    }

    const insertDataIntoBookings = () => {

        const sql = 'INSERT INTO Bookings (guest, picture, orderdate, checkin, checkout, note, status) VALUES (?, ?, ?, ?, ?, ?, ?)'

        const bookingNote = (): null | string => {
            return Math.random() > 0.6 ? faker.lorem.paragraph({ min: 1, max: 3 }) : null
        }

        const createRandomBooking = () => {
            const reference = faker.date.recent();
            faker.setDefaultRefDate(reference);
            const later = new Date(reference.getTime() + faker.number.int({min: 86400000, max: 2160000000}))
            const booking = {
                guest: faker.person.fullName(),
                picture: faker.image.avatarGitHub(),
                orderdate: faker.date.past({ years: 1 }).toISOString().slice(0, 10),
                checkin: faker.defaultRefDate().toISOString().slice(0, 10),
                checkout: later.toISOString().slice(0, 10),
                note: bookingNote(),
                status: faker.helpers.arrayElement(['check in', 'check out', 'in progress'])
            }

            const values = [booking.guest, booking.picture, booking.orderdate, booking.checkin, booking.checkout, booking.note, booking.status]

            connection.execute(sql, values)
        }

        for(let i = 0; i < num; i++) {
            createRandomBooking()
        }

    }

    const insertDataIntoRoomBooking = () => {

        const sql = 'INSERT INTO Room_Booking (booking_id, room_id) VALUES (?, ?)'

        const createRandomAmenities = (bid: number, rid: number) => {

            const values = [bid, rid]

            connection.execute(sql, values)
        }

        for(let i = 1; i <= num; i++) {
            for(let j = num; j > 0; j--){
                createRandomAmenities(i,j)
            }
        }

    }

    try{

        deleteTables()

        createUsersTable()
        createContactsTable()
        createRoomsTable()
        createAmenitiesTable()
        createRoomImagesTable()
        createBookingsTable()
        createRoomBookingTable()

        insertDataIntoUsers()
        insertDataIntoContacts()
        insertDataIntoRooms()
        insertDataIntoAmenities()
        insertDataIntoRoomImages()
        insertDataIntoBookings()
        insertDataIntoRoomBooking()

        connection.end();

    } catch(e){
        console.log(e)
    }
    
};

start();