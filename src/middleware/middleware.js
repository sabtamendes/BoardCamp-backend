// import { connection } from "../database/database";

// export async function categoriesValidation(req, res, next) {
//     const { name } = req.body;

//     try {
//         if (name === "") {
//             return res.sendStatus(400);
//         }
//         const theNameAllreadyExists = await connection.query("SELECT * FROM categories WHERE name = $1", [name]);

//         if (theNameAllreadyExists) {
//             return res.sendStatus(409);
//         }
        
//         req.postCategories = theNameAllreadyExists;

//     } catch (err) {
//         res.send(err)
//     }
//     next;
//}