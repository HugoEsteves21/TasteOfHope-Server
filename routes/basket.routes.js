const router = require("express").Router();
const Basket = require("../models/Basket.model");
const Market = require("../models/Market.model");
const Product = require("../models/Product.model");
const User = require("../models/User.model");

router.post("/create/market", async (req, res, next) => {
  try {
    const marketsDb = await Market.create(req.body);
    //const productsDb = await Product.create(productsData);

    res.status(201).json(marketsDb);
  } catch (error) {
    next(error);
  }
});

router.post("/create/product", async (req, res, next) => {
  try {
    const productsDb = await Product.create(req.body);

    res.status(201).json(productsDb);
  } catch (error) {
    next(error);
  }
});

router.post("/basket", async (req, res, next) => {
  const { basketType, marketId, products, received, price, giver, receiver } =
    req.body;

  const currentUser = req.payload._id;

  try {
    const newBasket = await Basket.create({
      basketType,
      market: marketId,
      products,
      received,
      price,
      giver,
      receiver,
    });

    res.status(201).json(currentUser);

    const updateMarket = await Market.findByIdAndUpdate(marketId, {
      $push: { basket: newBasket._id },
    });

    const basketGiver = await Basket.findByIdAndUpdate(newBasket._id, {
      $push: { giver: currentUser },
    });

    if (basketType === "Hope" && products.length === 1) {
      const updateUnits = await User.findByIdAndUpdate(currentUser, {
        $push: { givenUnits: newBasket._id },
      });
    } else {
      const updateUnits = await User.findByIdAndUpdate(currentUser, {
        $push: { givenBaskets: newBasket._id },
      });
    }

    res.status(201).json(newBasket);
  } catch (error) {
    next(error);
  }
});

router.put("/basket/:id", async (req, res, next) => {
  const { id } = req.params;
  const { products, price } = req.body;

  const currentUser = req.payload._id;
  const currentUserType = req.payload.userType;

  try {
    if (currentUserType === "Donor") {
      const updatedBasket = await Basket.findByIdAndUpdate(
        id,
        { products, price },
        { new: true }
      );

      res.status(200).json(updatedBasket);
    } else {
      const goodsReceiver = await User.findByIdAndUpdate(currentUser, {
        $push: { receiver: id },
      });

      if (products.length !== 1) {
        const basketReceived = await User.findByIdAndUpdate(currentUser, {
          $push: { receivedBaskets: id },
        });
      } else {
        const unitReceived = await User.findByIdAndUpdate(currentUser, {
          $push: { receivedUnits: id },
        });
      }
    }

    res.status(200).json(updatedBasket);
  } catch (error) {
    next(error);
  }
});

router.delete("/basket/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    await Basket.findByIdAndRemove(id);

    res.status(200).json({
      message: `The project with the id: ${id} was deleted sucessfully`,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/market/:id/baskets", async (req, res, next) => {
  const { id } = req.params;

  try {
    const marketBaskets = await Market.findById(id).populate("basket");

    res.status(200).json(marketBaskets);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
