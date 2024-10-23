const Order = require("../models/order.model");

exports.getUserOrder = async (req, res) => {
  try {
    const orders= await Order.find({user: req.user._id});
    const totalPrice = orders.reduce((total, order) => total + order.totalPrice, 0);
    res.render("userOrders", { orders, totalPrice });
  } catch (err) {
    next(err);
  }
};

exports.placeOrder = async (req, res) => {
  const { orderItems, journalNumber, totalPrice } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    // Create a new orderItems array to accumulate the items
    const formattedOrderItems = orderItems.map((item) => {
      if (item.type === "food") {
        return {
          ...item,
          itemFood: item._id,
          itemDrink: undefined, // Ensure itemDrink is undefined for food items
        };
      } else {
        return {
          ...item,
          itemDrink: item._id,
          itemFood: undefined, // Ensure itemFood is undefined for drink items
        };
      }
    });

    const order = new Order({
      orderItems: formattedOrderItems,
      user: req.user._id,
      journalNumber,
      totalPrice,
    });

    try {
      await order.save();
      req.flash("success", "Your order has been placed successfully");
      res.status(201).redirect("/user/home");
    } catch (error) {
      console.error(error.message);
    }
  }
};


// update order status
// update order status
exports.updateOrderStatus = async (req, res) => {
  // Get orderId from request parameters instead of body
  const { status } = req.body;
  const { id: orderId } = req.params; // Extract orderId from req.params

  try {
    await Order.findByIdAndUpdate(orderId, { orderStatus: status }, { new: true });
    res.status(200).json({message: "success"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrder= async (req, res) => {
  const { id: orderId } = req.params;

  try {
    await Order.findByIdAndDelete(orderId);
    res.status(200).json({message: "success"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};