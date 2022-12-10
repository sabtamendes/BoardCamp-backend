import dayjs from "dayjs";
import connection from "../database/database.js";

export async function getRentals(req, res) {
    const { customerId } = req.query;
    const { gameId } = req.query;

    try {

        if (customerId) {
            const filteringCustomerId = await connection.query("SELECT * FROM rentals WHERE 'customerId' ILIKE = $1;", [`${customerId}%`]);

            return res.send(filteringCustomerId.rows[0]);
        }

        if (gameId) {
            const filteringGameId = await connection.query("SELECT * FROM rentals WHERE 'gameId' ILIKE = $1;", [`${gameId}%`]);

            return res.send(filteringGameId.rows[0]);
        }

        const allRentals = await connection.query(`
        SELECT rentals.*, customers.id, customers.name, games.id, games.name, games."categoryId", categories.name AS "categoryName"
            FROM rentals 
            JOIN customers ON rentals."customerId" = customers.id
            JOIN games ON  rentals."gameId" = games.id
            JOIN categories ON categories.id = games."categoryId"
            ;`
        );

        res.send(allRentals.rows);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
export async function postRentals(req, res) {
    const { customerId, gameId, daysRented } = res.locals.rentals;
    console.log(res.locals.rentals)
    try {
        const gameRented = await connection.query("SELECT * FROM games WHERE id = $1;", [gameId]);

        const rentDate = dayjs().format('YYYY-MM-DD');

        const originaPrice = daysRented * gameRented.rows[0].pricePerDay;

        await connection.query('INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","originalPrice") VALUES ($1,$2,$3,$4,$5);', [customerId, gameId, rentDate, daysRented, originaPrice]);

        res.sendStatus(201);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
export async function deleteRentals(req, res) {
    const { id } = req.params;
    console.log("params", id)
    try {
        const idExists = await connection.query("SELECT * FROM rentals WHERE id  = $1 ", [id]);
        console.log(idExists.rows)
        if (idExists.rows[0].id.length === 0) {
            return res.sendStatus(404);
        }

        if (idExists.rows[0].returnDate === null) {
            return res.sendStatus(400);
        }

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}