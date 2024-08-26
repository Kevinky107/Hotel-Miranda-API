import dotenv from "dotenv"
import mysql from 'mysql2';

dotenv.config();

const start = async () => {

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'hotelmiranda',
        port: 3306,
        password: process.env.MYSQL_PASSWORD
    });

    try{
       
        const deleteTables = async () => {
            const sql = `DROP TABLE IF EXISTS amenities, booking_status, bookings, contacts, posts, room_booking, room_types, rooms, rooms_images, users;`
            connection.query(sql);
        }

        const createPostsTable = async () => {
            const sql = `CREATE TABLE Posts (
                _id int AUTO_INCREMENT,
                name varchar(255),
                PRIMARY KEY (_id)
            );`
            connection.query(sql);
        }

        const createRoomTypesTable = async () => {
            const sql = `CREATE TABLE Room_Types (
                _id int AUTO_INCREMENT,
                name varchar(255),
                PRIMARY KEY (_id)
            );`
            connection.query(sql);
        }

        const createBookingStatusTable = async () => {
            const sql = `CREATE TABLE Booking_Status (
                _id int AUTO_INCREMENT,
                name varchar(255),
                PRIMARY KEY (_id)
            );`
            connection.query(sql);
        }

        const createUsersTable = async () => {
            const sql = `CREATE TABLE Users (
                _id int AUTO_INCREMENT,
                name varchar(255),
                password varchar(255),
                email varchar(255),
                picture varchar(255),
                post int,
                phone varchar(255),
                postdescription varchar(255),
                startdate varchar(255),
                state boolean,
                PRIMARY KEY (_id),
                FOREIGN KEY (post) REFERENCES Posts (_id)
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
            FOREIGN KEY (amenities) REFERENCES Amenities(_id),
            ADD CONSTRAINT fk_type
            FOREIGN KEY (type) REFERENCES Room_Types(_id);`
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
                roomtype int, 
                roomid int,
                status int,
                PRIMARY KEY (_id),
                FOREIGN KEY (roomtype) REFERENCES Room_Types (_id),
                FOREIGN KEY (roomid) REFERENCES Rooms (_id),
                FOREIGN KEY (status) REFERENCES Booking_Status (_id)
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

        deleteTables()
        createPostsTable()
        createRoomTypesTable()
        createBookingStatusTable()
        createUsersTable()
        createContactsTable()
        createRoomsTable()
        createAmenitiesTable()
        createRoomImagesTable()
        addAlterRoomImage()
        addAlterRooms()
        createBookingsTable()
        createRoomBookingTable()
        connection.end();

    } catch(e){
        console.log(e)
    }
    
};

start();