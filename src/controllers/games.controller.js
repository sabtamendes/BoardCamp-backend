import connection from "../database/database.js";

export async function getGame(req, res) {
    const { name } = req.params;

    try {
        const filteringNameParams = await connection.query("SELECT * FROM games WHERE name = $1;", [name]);

        if (name === true) {
            return res.send(filteringNameParams.rows[0]);
        }

        const allGames = await connection.query("SELECT * FROM games");

        res.send(allGames.rows[0]);

    } catch (error) {
        res.send(error);
    }
}

export async function postGame(req, res) {
    const {
        name,
        image,
        stockTotal,
        categoryId,
        pricePerDay
    } = req.body;

    try {
        await connection.query("INSERT INTO games (name, image, stockTotal, categoryId, pricePerDay) VALUES ($1, $2, $3, $4, $5)",
            [name,
                image,
                stockTotal,
                categoryId,
                pricePerDay])

        res.sendStatus(201)

    } catch (error) {
        res.send(error)
    }
}