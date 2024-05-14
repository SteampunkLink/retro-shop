import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import Address from "../models/addressModel";

interface ICreateAddressBody {
  recipient: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface IGetOneAddress {
  id: string;
}

// @desc - create new address (private)
// @path - POST /api/address
export const createAddress: RequestHandler<
  unknown,
  unknown,
  ICreateAddressBody,
  unknown
> = asyncHandler(async (req, res) => {
  const { recipient, address, city, postalCode, country } = req.body;
  const newAddress = new Address({
    recipient,
    address,
    city,
    postalCode,
    country,
    user: req.session.userId,
  });
  const createdAddress = await newAddress.save();
  res.status(201).json(createdAddress);
});

// @desc - get user addresses (private)
// @path - GET /api/address
export const getUserAddresses: RequestHandler = asyncHandler(
  async (req, res) => {
    const userAddresses = await Address.find({ user: req.session.userId });
    res.status(200).json(userAddresses);
  }
);

// @desc - get user address by id (private)
// @path - GET /api/address/:id
export const getAddressById: RequestHandler<
  IGetOneAddress,
  unknown,
  unknown,
  unknown
> = asyncHandler(async (req, res) => {
  const foundAddress = await Address.findById(req.params.id);
  if (
    !foundAddress ||
    foundAddress.user.toString() !== req.session.userId?.toString()
  ) {
    res.status(401);
    throw new Error("You don't have permission to access this.");
  } else {
    res.status(200).json(foundAddress);
  }
});

// @desc - update user address (private)
// @path - PATCH /api/address/:id
export const updateAddress: RequestHandler<
  IGetOneAddress,
  unknown,
  ICreateAddressBody,
  unknown
> = asyncHandler(async (req, res) => {
  const addressToUpdate = await Address.findById(req.params.id);
  if (
    !addressToUpdate ||
    addressToUpdate.user.toString() !== req.session.userId?.toString()
  ) {
    res.status(401);
    throw new Error("You don't have permission to access this.");
  } else {
    addressToUpdate.recipient = req.body.recipient;
    addressToUpdate.address = req.body.address;
    addressToUpdate.city = req.body.city;
    addressToUpdate.postalCode = req.body.postalCode;
    addressToUpdate.country = req.body.country;
    const updatedAddress = await addressToUpdate.save();
    res.status(200).json(updatedAddress);
  }
});

// @desc - delete one address (private)
// @path = DELETE /api/address/:id
export const deleteAddress: RequestHandler<
  IGetOneAddress,
  unknown,
  unknown,
  unknown
> = asyncHandler(async (req, res) => {
  const addressToDelete = await Address.findById(req.params.id);
  if (
    !addressToDelete ||
    addressToDelete.user.toString() !== req.session.userId?.toString()
  ) {
    res.status(401);
    throw new Error("You don't have permission to access this.");
  } else {
    await Address.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Address Deleted" });
  }
});
