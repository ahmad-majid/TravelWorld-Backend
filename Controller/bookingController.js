import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  const newBooking = new Booking(req.body);
//create new booking
  try {
    const savedBooking = await newBooking.save();
    res
      .status(200)
      .json({ success: true, message: "Tour Booked", data: savedBooking });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
//get single booking
export const getBooking = async (req, res) => {
  const id = req.params.id;
  try {
    const book = await Booking.findById(id);
    res.status(200).json({ success: true, message: "successful", data: book });
  } catch (err) {
    res.status(500).json({ success: false, message: "not found" });
  }
};

//get All booking
export const getAllBooking = async (req, res) => {
    try {
      const book = await Booking.findById(id);
      res.status(200).json({ success: true, message: "successful", data: book });
    } catch (err) {
      res.status(500).json({ success: false, message: "not found" });
    }
  };
