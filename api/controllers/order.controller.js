 import createError from "../utils/createError.js"
 import Order from '../models/order.model.js'
 import Gig from '../models/gig.model.js'
 
 export const createOrder = async (req, res, next) => {
     try {
         const gig = await Gig.findById(req.params.gigId)
        
         const newOrder = new Order({
             gigId: gig._id,
             img: gig.cover,
             title: gig.title,
             price: gig.price,
             sellerId: gig.userId,
             buyerId: req.userId,
             payment_intent: "temporary"
        })

        await newOrder.save()
        res.status(200).send("Success")
        
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