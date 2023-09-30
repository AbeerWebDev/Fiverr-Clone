 import Review from '../models/review.model.js'
 import Gig from '../models/gig.model.js'
 import createError from '../utils/createError.js'
 
export const createReview = async (req, res, next) => {
    if (req.isSeller) return next(createError(403, 'As a seller you cannot leave a review.'))
   
    const newReview = new Review({
        userId: req.userId,
        gigId: req.body.gigId,
        star: req.body.star,
        desc: req.body.desc
    })

    try {
        const review = await Review.findOne({gigId: req.body.gigId, userId: req.userId})
       
        if(review) 
        return next(createError(403, 'You have created a review already!'))

        const savedReview = await newReview.save()

        await Gig.findByIdAndUpdate(req.body.gigId, {$inc: {totalStars: req.body.star, starNumber: 1}})

        res.status(201).send(savedReview)
    } catch (err) {
        next(err)
    }
 }
 export const getReview = async (req, res, next) => {
    try {
       const reviews = await Review.find({gigId: req.params.gigId})
       res.status(200).send(reviews)
    } catch (err) {
        next(err)
    }
 }
 export const deleteReview = async (req, res, next) => {
    try {

    } catch (err) {
        next(err)
    }
 }