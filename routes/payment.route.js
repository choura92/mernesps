const express=require('express');
const router = express.Router();
const stripe = require ('stripe');
const Stripe =
stripe('sk_test_51NXoRND5g8w8rD9GT1sA4yxH7oita4xJ0okqBVnDvKf6iS1PZcIqcJ4b16gjnick7BggpjpDDkdJgIBIw7066HVu00jC5FDQ6A');
router.post('/', async (req, res) => {
let status, error;
const { token, amount } = req.body;
try {
await Stripe.charges.create({
source: token.id,
amount,
currency: 'usd',
});

status = 'success';
} catch (error) {
console.log(error);
status = 'Failure';
}
res.json({ error, status });
});
module.exports = router;