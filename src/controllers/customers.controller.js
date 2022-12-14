import connection from "../database/database.js";

export async function getCustomers(req, res) {
    const { cpf } = req.query;

    try {
        const listing = await connection.query("SELECT * FROM customers WHERE cpf ILIKE $1;", [`${cpf}%`]);

        if (cpf) {
            return res.send(listing.rows);
        }

        const allCustomers = await connection.query('SELECT *, birthday::text FROM customers;');

        res.send(allCustomers.rows);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
export async function getCustomersById(req, res) {
    const { id } = req.params;
    console.log(req.params)
    try {
        const customersId = await connection.query('SELECT *, birthday::text FROM customers WHERE id = $1;', [id]);

        if (customersId.rows.length === 0) {
            return res.sendStatus(404);
        }
console.log("passou daqiui")
        res.send(customersId.rows);
console.log(customersId.rows, "aqui")
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
export async function postCustomers(req, res) {
    const { name, phone, cpf, birthday } = res.locals.customers;
    try {
        await connection.query("INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);", [name, phone, cpf, birthday]);

        res.sendStatus(201);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}
export async function putCustomers(req, res) {
    const { name, phone, cpf, birthday } = res.locals.customers;
    const id = res.locals.id;
    try {

        await connection.query("UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;", [name, phone, cpf, birthday, id]);

        res.sendStatus(200);

    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
}