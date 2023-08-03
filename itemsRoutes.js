const express = require('express')
const router = new express.Router()
const ExpressError = require('./expressError')
const shoppingItems = require('./fakeDb')

router.get('/', function (req, res) {
    res.json({ shoppingItems })
})

router.post('/', function (req, res, next) {
    try {
        if (!req.body.name || !req.body.price) throw new ExpressError('Name & price required', 400)
        const newItem = {
            name: req.body.name,
            price: req.body.price
        }
        shoppingItems.push(newItem)
        return res.status(201).json({ "added": newItem })
    } catch (e) {
        return next(e)
    }
})

router.get('/:name', function (req, res) {
    const foundItem = shoppingItems.find(item => item.name === req.params.name)
    if (foundItem === undefined) {
        throw new ExpressError("item not found", 404)
    }
    res.json(foundItem)
})

router.patch('/:name', function (req, res) {
    const foundItem = shoppingItems.find(item => item.name === req.params.name)
    if (foundItem === undefined) {
        throw new ExpressError("item not found", 404)
    }
    foundItem.name = req.body.name
    foundItem.price = req.body.price
    res.json({'updated': foundItem })
})

router.delete('/:name', function (req, res) {
    const foundItem = shoppingItems.findIndex(item => item.name === req.params.name)
    if (foundItem === -1) {
        throw new ExpressError("item not found", 404)
    }
    shoppingItems.splice(foundItem, 1)
    res.json({ message: 'Deleted'})
})




module.exports = router;