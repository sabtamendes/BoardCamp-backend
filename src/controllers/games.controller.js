import connection from "../database/database.js";

export async function getGames(req, res) {
    const { name } = req.query;

    try {
        const filteringNameParams = await connection.query("SELECT * FROM games WHERE name ILIKE  $1;", [`${name}%`]);

        if (name) {
            return res.send(filteringNameParams.rows);
        }

        const allGames = await connection.query(`SELECT games.*, categories.name AS "categoryName"
                FROM
                games
                JOIN
                categories
                ON
                games."categoryId" = categories.id`);

        res.send(allGames.rows);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
export async function postGames(req, res) {
    const
        {
            name,
            image,
            stockTotal,
            categoryId,
            pricePerDay
        } = req.body;

    try {
        
        if (!name || name.length <= 0 || image === null||  stockTotal <= 0 || pricePerDay <= 0) {
            return res.sendStatus(400);
        }

        const theGameNameAllreadyExists =
            await connection.query("SELECT * FROM games WHERE name = $1;", [name]);


        if (theGameNameAllreadyExists.rows.length !== 0) {
            return res.sendStatus(409);
        }

        const idExists =
            await connection.query("SELECT id FROM categories WHERE id = $1;", [categoryId]);

        if (!idExists) {
            return res.sendStatus(400);
        }

        await connection.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);',
            [name, image, stockTotal, categoryId, pricePerDay]);

        res.sendStatus(201);

    } catch (err) {
        console.log(err)
        res.sendStatus(500);
    }
}