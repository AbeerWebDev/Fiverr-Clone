 import Order from '../models/order.model.js'
 import Gig from '../models/gig.model.js'
 import Stripe from 'stripe'

 export const confirm = async (req, res, next) => {
  try {
    const orders = await Order.findOneAndUpdate({payment_intent: req.body.payment_intent}, 
      {
        $set: {
          isCompleted: true
        }
      })
      res.status(200).send('Order has been confirmed.')
  } catch (err) {
    next(err)
  }
 }

 export const intent = async (req, res, next) => {
    
  const stripe = new Stripe(process.env.STRIPE)
    
    try {
        const gig = await Gig.findById(req.params.id)
        
        const paymentIntent = await stripe.paymentIntents.create({
          amount: gig.price * 100,
          currency: "aed",
          // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
          automatic_payment_methods: {
            enabled: true,
          },
        });

        const newOrder = new Order({
          gigId: gig._id,
          img: gig.cover,
          title: gig.title,
          price: gig.price,
          sellerId: gig.userId,
          buyerId: req.userId,
          payment_intent: paymentIntent.id,
        });

        await newOrder.save();
        res.status(200).send({
           clientSecret: paymentIntent.client_secret
        });
        
    } catch (err) {
        next(err)
    }
 }

export const getOrder = async (req, res, next) => {
    try {
        const orders = await Order.find({
            ...(req.isSeller ? {isSeller: req.userId} : {buyerId: req.userId}),
            isCompleted: true
        })
        res.status(200).send(orders)
        
    } catch (err) {
        next(err)
    }
}