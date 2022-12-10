import dayjs from "dayjs";
import connection from "../database/database.js";

export async function getRentals(req, res) {
    const { customerId } = req.query;
    const { gameId } = req.query;
    const { status } = req.query;
    const { startDate } = req.query;

    try {

        if (customerId) {
            const filteringCustomerId = await connection.query("SELECT * FROM rentals WHERE 'customerId' = $1;", [customerId]);

            return res.send(filteringCustomerId.rows);
        }

        if (gameId) {
            const filteringGameId = await connection.query("SELECT * FROM rentals WHERE 'gameId' = $1;", [gameId]);

            return res.send(filteringGameId.rows);
        }
        if (status === 'open') {
            const filteringStatusOpened = await connection.query("SELECT * FROM rentals WHERE 'returnDate' = null;");

            return res.send(filteringStatusOpened.rows);
        }

        if (status === 'closed') {
            const filteringStatusClosed = await connection.query("SELECT * FROM rentals WHERE 'returnDate' <> null;");

            return res.send(filteringStatusClosed.rows);
        }

        if (startDate) {
            const filteringStartDate = await connection.query("SELECT * FROM rentals WHERE 'rentDate' = $1;", [startDate]);

            return res.send(filteringStartDate.rows);
        }

        const allRentals = await connection.query(`
        SELECT rentals.*,
            row_to_json(customers.*)AS customer, 
            json_build_object(
                'id',games.id,
                'name',games.name,
                'categoryId',games."categoryId",
                'categoryName',categories.name
                )AS game 
            FROM rentals  
            JOIN customers  
            ON customers.id ="customerId"  
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
export async function postReturnRentals(req, res) {
    const { id } = res.locals;
    try {
        const rentals = await connection.query("SELECT * FROM rentals WHERE id = $1;", [id]);
        const price = await connection.query("SELECT 'pricePerDay' FROM games WHERE id = $1;", [id]);

        const returnDate = dayjs().format('YYYY-MM-DD'); //OK

        const rentDate = new Date(rentals.rows[0].rentDate).format('YYYY-MM-DD'); //ok
        const pricePerDay = price.rows[0].pricePerDay;
        const daysRented = rentals.rows[0].daysRented;
        const differenceDays = returnDate.diff(rentDate, 'hour') / 24;//dias de atraso OK;
        const delayFee = differenceDays > daysRented ? (differenceDays - daysRented) * pricePerDay : 0;

        await connection.query('UPDATE rentals SET "returnDate" = $1 "delayFee" = $2 WHERE id = $3;', [returnDate, delayFee, id]);

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