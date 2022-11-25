const router = require("express").Router();
const Basket = require("../models/Basket.model");
const Market = require("../models/Market.model");
const Product = require("../models/Product.model");
const User = require("../models/User.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.post("/create/market", isAuthenticated, async (req, res, next) => {
  try {
    const marketsDb = await Market.create(req.body);
    //const productsDb = await Product.create(productsData);

    res.status(201).json(marketsDb);
  } catch (error) {
    next(error);
  }
});

router.post("/create/product", isAuthenticated, async (req, res, next) => {
  try {
    const productsDb = await Product.create(req.body);

    res.status(201).json(productsDb);
  } catch (error) {
    next(error);
  }
});

router.post("/basket", isAuthenticated, async (req, res, next) => {
  const { basketType, market, products, received, price, giver, receiver } =
    req.body;

  const currentUser = req.payload._id;

  try {
    // create a basket
    const newBasket = await Basket.create({
      basketType,
      market,
      products,
      received,
      price,
      giver,
      receiver,
    });

    // adding the basket to the market where it is created
    const updateMarket = await Market.findByIdAndUpdate(market, {
      $push: { basket: newBasket._id },
    });

    // defining the user that created the basket
    const basketGiver = await Basket.findByIdAndUpdate(newBasket._id, {
      $push: { giver: currentUser },
    });

    // defining which type of basket the user created and adding it to the user profile
    if (basketType === "Hope" && products.length === 1) {
      // if the basket only has one product add it to user's given units array
      const updateUnits = await User.findByIdAndUpdate(currentUser, {
        $push: { givenUnits: newBasket._id },
      });
    } else {
      // if the basket has more than one product add it to user's given baskets array
      const updateBaskets = await User.findByIdAndUpdate(currentUser, {
        $push: { givenBaskets: newBasket._id },
      });
    }

    res.status(201).json(newBasket);
  } catch (error) {
    next(error);
  }
});

router.put("/basket/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;
  const { products, price, received } = req.body;

  const currentUser = req.payload._id;
  const currentUserType = req.payload.userType;

  try {
    // checking type of user
    if (currentUserType === "Donor") {
      // add changes to the basket
      const updatedBasket = await Basket.findByIdAndUpdate(
        id,
        { products, price },
        { new: true }
      );

      res.status(200).json(updatedBasket);
    } else {
      // add a user to the basket that is received
      const goodsReceiver = await Basket.findByIdAndUpdate(id, {
        $push: { receiver: currentUser },
      });

      if (products.length !== 1) {
        // if the basket has more than one product add it to the received basket in the user profile
        const basketReceived = await User.findByIdAndUpdate(currentUser, {
          $push: { receivedBaskets: id },
        });
      } else {
        // if the basket has one product add it to the received units in the user profile
        const unitReceived = await User.findByIdAndUpdate(currentUser, {
          $push: { receivedUnits: id },
        });
      }

      // add changes to the basket
      const updatedBasket = await Basket.findByIdAndUpdate(
        id,
        { received },
        { new: true }
      );

      res.status(200).json(updatedBasket);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/basket/:id", isAuthenticated, async (req, res, next) => {
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

router.get("/market/:id/baskets", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    const marketBaskets = await Market.findById(id).populate("basket");

    res.status(200).json(marketBaskets);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
