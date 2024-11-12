import { Request, Response } from "express";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel";

export const getHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });

    res.status(201).send(hotels);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};
export const getHotel = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const hotel = await Hotel.findOne({ _id: id, userId: req.userId });

    if (!hotel) {
      throw new Error("Hotel not found");
    }

    res.status(201).json(hotel);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};
export const create = async (req: Request, res: Response) => {
  try {
    const imageFiles = req.files as Express.Multer.File[];
    const newHotel = req.body;

    const imageUrls = await uploadImages(imageFiles);

    newHotel.imageUrls = imageUrls;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;

    const hotel = new Hotel(newHotel);
    await hotel.save();

    res.status(201).send(hotel);
  } catch (error) {
    console.log("Error creating hotel:", error);
    res.status(500).send({ message: "Something went wrong" });
  }
};
export const update = async (req: Request, res: Response) => {
  try {
    const updatedHotel = req.body;

    updatedHotel.lastUpdated = new Date();

    const hotel = await Hotel.findOneAndUpdate(
      {
        _id: req.params.hotelId,
        userId: req.userId,
      },
      updatedHotel,
      { new: true }
    );

    if (!hotel) {
      res.status(404).json({ message: "Hotel not found" });
    } else {
      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadImages(files);

      hotel.imageUrls = [
        ...updatedImageUrls,
        ...(updatedHotel.imageUrls || []),
      ];

      await hotel.save();
      res.status(201).send(hotel);
    }
  } catch (error) {
    console.log("Error updating hotel:", error);
    res.status(500).send({ message: "Something went wrong" });
  }
};

// helpers
async function uploadImages(imageFiles: Express.Multer.File[]) {
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString("base64");
    let dataURI = "data:" + image.mimetype + ";base64," + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}
