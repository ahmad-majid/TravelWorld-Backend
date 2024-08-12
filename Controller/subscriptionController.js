import Subscriber from "../models/Subscriber.js";

export const subscribe = async (req, res) => {
  const { email } = req.body;

  try {
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ error: "Email already subscribed" });
    }

    const subscriber = new Subscriber({ email });
    await subscriber.save();

    res.status(201).json({ message: "Subscription successful" });
  } catch (error) {
    console.error("Error subscribing:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.status(200).json(subscribers);
  } catch (error) {
    console.error("Error getting subscribers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
