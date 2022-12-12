import dayjs from "dayjs";
import connection from "../database/database.js";

export async function getRentals(req, res) {
    const { customerId } = req.query;
    const { gameId } = req.query;
    const { status } = req.query;
    const { startDate } = req.query;

    try {
        const filteringCustomerId = await connection.query('SELECT *,"rentDate"::text FROM rentals WHERE "customerId" = $1;', [customerId]);

        if (customerId !== undefined) {
            return res.send(filteringCustomerId.rows);
        }

        const filteringGameId = await connection.query('SELECT *,"rentDate"::text FROM rentals WHERE "gameId" = $1;', [gameId]);

        if (gameId !== undefined) {
            return res.send(filteringGameId.rows);
        }

        const filteringStatusOpened = await connection.query('SELECT *,"rentDate"::text FROM rentals WHERE "returnDate" ISNULL;');

        if (status === 'open') {
            return res.send(filteringStatusOpened.rows);
        }

        const filteringStatusClosed = await connection.query('SELECT *, "rentDate"::text, "returnDate"::text FROM rentals WHERE "returnDate" NOTNULL;');

        if (status === 'closed') {
            return res.send(filteringStatusClosed.rows);
        }

        const filteringStartDate = await connection.query('SELECT *, "rentDate"::text FROM rentals WHERE "rentDate" = $1;', [startDate]);

        if (startDate !== undefined) {
            return res.send(filteringStartDate.rows);
        }

        const allRentals = await connection.query(`
        SELECT rentals.*, rentals."rentDate"::text,
            row_to_json(customers.*)AS customer, 
            json_build_object(
                'id',games.id,
                'name',games.name,
                'categoryId',games."categoryId",
                'categoryName',categories.name
                )AS game 
            FROM rentals  
            JOIN customers  
            ON customers.id = "customerId"  
            JOIN games 
            ON games.id = "gameId" 
            JOIN categories 
            ON categories.id = games."categoryId";`
        );

        res.send(allRentals.rows);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
export async function postRentals(req, res) {
    const { customerId, gameId, daysRented } = res.locals.rentals;
    const stock = res.locals.stock;

    try {

        const rentDate = dayjs();

        const gameRented = await connection.query("SELECT * FROM games WHERE id = $1;", [gameId]);

        const originaPrice = daysRented * gameRented.rows[0].pricePerDay;

        const stockTotal = stock ? stock - 1 : '';

        await connection.query('UPDATE games SET "stockTotal" = $1 WHERE id = $2;', [stockTotal, gameId]);

        await connection.query('INSERT INTO rentals ("customerId","gameId","rentDate","daysRented","originalPrice") VALUES ($1,$2,$3,$4,$5);', [customerId, gameId, rentDate, daysRented, originaPrice]);

        res.sendStatus(201);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
export async function postReturnRentals(req, res) {
    const id = res.locals.id;

    try {
        const rentals = await connection.query("SELECT * FROM rentals WHERE id = $1;", [id]);

        const returnDate = dayjs();

        const rentDate = dayjs(rentals.rows[0].rentDate);

        const daysRented = rentals.rows[0].daysRented;
     
        const lateRentDays = Math.abs(rentDate.diff(returnDate, 'day') - daysRented);
     
        const pricePerDay = rentals.rows[0].originalPrice / daysRented;

        let delayFee = 0;

        if (lateRentDays > daysRented) {
            delayFee = lateRentDays  * pricePerDay;
        }

        await connection.query(`UPDATE rentals SET "returnDate"= $1, "delayFee"= $2 WHERE id = $3;`, [returnDate, delayFee, id]);

        res.sendStatus(200);

    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
export async function deleteRentals(req, res) {
    const { id } = res.locals;

    try {

        await connection.query("DELETE FROM rentals WHERE id = $1;", [id]);

        res.sendStatus(200);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}