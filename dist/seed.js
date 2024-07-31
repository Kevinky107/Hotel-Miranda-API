"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const mongoose_1 = __importDefault(require("mongoose"));
const Room_1 = require("./schemas/Room");
const Booking_1 = require("./schemas/Booking");
const Contact_1 = require("./schemas/Contact");
const User_1 = require("./schemas/User");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// VARIABLES
const rooms = [];
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(`mongodb+srv://Kevinky:${process.env.ATLAS_KEY}@kevin.cr5lhp0.mongodb.net/Hotel-Miranda`);
        console.log('Database connection open');
        yield Room_1.RoomModel.deleteMany({});
        yield Booking_1.BookingModel.deleteMany({});
        yield Contact_1.ContactModel.deleteMany({});
        yield User_1.UserModel.deleteMany({});
        // ROOM
        const randomRoomImages = () => {
            const pictures = [
                "https://unsplash.com/es/fotos/estructura-de-cama-de-madera-marron-con-funda-blanca-junto-a-mesita-de-noche-de-madera-marron-FqqiAvJejto",
                "https://unsplash.com/es/fotos/cama-tapizada-blanca-capitone-HD7QBx2Yfa4",
                "https://unsplash.com/es/fotos/estructura-de-cama-de-madera-marron-con-funda-blanca-junto-a-mesita-de-noche-de-madera-marron-FqqiAvJejto",
                "https://unsplash.com/es/fotos/camas-grisesprea-w72a24brINI",
                "https://unsplash.com/es/fotos/vista-del-dormitorio-con-lampara-colgante-esferica-f1Rd2HsoKnk"
            ];
            return pictures[Math.floor(Math.random() * pictures.length)];
        };
        const createRandomRoom = () => {
            const price = faker_1.faker.number.int({ min: 200, max: 400 });
            return new Room_1.RoomModel({
                name: `Room ${faker_1.faker.number.int({ max: 999 })}`,
                images: [randomRoomImages()],
                type: faker_1.faker.helpers.arrayElement(['Suite', 'Single Bed', 'Double Bed', 'Double Superior']),
                price: price,
                offer: faker_1.faker.number.int({ min: 100, max: price }),
                amenities: faker_1.faker.helpers.arrayElements(['AC', 'Shower', 'Double Bed', 'Towel', 'Bathup', 'Cofee Set', 'LED TV', 'Wifi'])
            });
        };
        for (let i = 0; i < 10; i++) {
            const newRoom = createRandomRoom();
            yield newRoom.save();
            rooms.push(newRoom);
        }
        console.log('Rooms created');
        // BOOKING 
        const randomProfilePicture = () => {
            const pictures = [
                "https://unsplash.com/es/fotos/una-mujer-con-un-afro-mira-a-la-camara-_cvwXhGqG-o",
                "https://unsplash.com/es/fotos/mujer-mirando-directamente-a-la-camara-cerca-de-la-pared-rosa-bqe0J0b26RQ",
                "https://unsplash.com/es/fotos/foto-en-escala-de-grises-de-un-hombre-XHVpWcr5grQ",
                "https://unsplash.com/es/fotos/foto-en-escala-de-grises-de-mujer-con-abrigo-y-anteojos-hpZ6NCRLe1A",
                "https://unsplash.com/es/fotos/derek-fisher-d0peGya6R5Y"
            ];
            return pictures[Math.floor(Math.random() * pictures.length)];
        };
        const bookingNote = () => {
            return Math.random() > 0.6 ? faker_1.faker.lorem.paragraph({ min: 1, max: 3 }) : null;
        };
        const getRoomId = () => {
            return rooms[Math.floor(Math.random() * rooms.length)]._id.toString();
        };
        const createRandomBooking = () => {
            const reference = faker_1.faker.date.recent();
            faker_1.faker.setDefaultRefDate(reference);
            const later = new Date(reference.getTime() + faker_1.faker.number.int({ min: 86400000, max: 2160000000 }));
            return new Booking_1.BookingModel({
                guest: faker_1.faker.person.fullName(),
                picture: randomProfilePicture(),
                orderdate: faker_1.faker.date.past({ years: 1 }).toISOString().slice(0, 10),
                checkin: faker_1.faker.defaultRefDate().toISOString().slice(0, 10),
                checkout: later.toISOString().slice(0, 10),
                note: bookingNote(),
                roomtype: faker_1.faker.helpers.arrayElement(['Suite', 'Single Bed', 'Double Bed', 'Double Superior']),
                roomid: getRoomId(),
                status: faker_1.faker.helpers.arrayElement(['check in', 'check out', 'in progress'])
            });
        };
        for (let i = 0; i < 10; i++) {
            const newBooking = createRandomBooking();
            yield newBooking.save();
        }
        console.log('Bookings created');
        // CONTACT
        const createRandomContact = () => {
            const firstname = faker_1.faker.person.firstName();
            const lastname = faker_1.faker.person.lastName();
            return new Contact_1.ContactModel({
                date: faker_1.faker.date.past({ years: 10 }).toISOString().slice(0, 10),
                customer: `${firstname} ${lastname}`,
                email: faker_1.faker.internet.email({ firstName: firstname, lastName: lastname }),
                phone: faker_1.faker.phone.number(),
                comment: faker_1.faker.lorem.paragraph({ min: 1, max: 5 }),
                archived: faker_1.faker.datatype.boolean(0.2)
            });
        };
        for (let i = 0; i < 10; i++) {
            const newContact = createRandomContact();
            yield newContact.save();
        }
        console.log('Contacts created');
        // USER
        const createRandomUser = () => {
            const firstname = faker_1.faker.person.firstName();
            const lastname = faker_1.faker.person.lastName();
            const password = faker_1.faker.internet.password();
            return new User_1.UserModel({
                startdate: faker_1.faker.date.past({ years: 10 }).toISOString().slice(0, 10),
                name: `${firstname} ${lastname}`,
                email: faker_1.faker.internet.email({ firstName: firstname, lastName: lastname }),
                phone: faker_1.faker.phone.number(),
                picture: randomProfilePicture(),
                post: faker_1.faker.helpers.arrayElement(['Manager', 'Room Service', 'Reception']),
                postdescription: faker_1.faker.lorem.paragraph({ min: 1, max: 3 }),
                state: faker_1.faker.datatype.boolean(0.9),
                password: password
            });
        };
        for (let i = 0; i < 10; i++) {
            const user = createRandomUser();
            yield user.save();
        }
        const createMe = () => {
            const password = '1234';
            return new User_1.UserModel({
                startdate: "2024-06-24",
                name: `Kevin Agudo Montil`,
                email: `Kevinagudomontil@gmail.com`,
                phone: `616422058`,
                picture: randomProfilePicture(),
                post: `Manager`,
                postdescription: `full stack developer, is in charge of the operation of the website, its database and its visualization as well as its maintenance`,
                state: true,
                password: password
            });
        };
        const me = createMe();
        yield me.save();
        console.log('Users created');
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
    finally {
        yield mongoose_1.default.connection.close();
        console.log('Database connection closed');
    }
});
start();
