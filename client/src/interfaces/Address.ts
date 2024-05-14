export interface ICreateAddressFields {
  recipient: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IAddress {
  _id: string;
  user: string;
  recipient: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
