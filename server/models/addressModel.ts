import { Model, Schema, model } from "mongoose";

export interface IAddress {
  user: Schema.Types.ObjectId;
  recipient: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

type AddressModel = Model<IAddress>;

const addressSchema = new Schema<IAddress, AddressModel>(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    recipient: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

const Address: AddressModel = model<IAddress, AddressModel>(
  "Address",
  addressSchema
);
export default Address;
