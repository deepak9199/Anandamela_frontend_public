export interface AddressApi {
  status: string;
  msg: string;
  data: AddressData;
}

export interface AddressData {
  customer_address: CustomerAddress[];
}

export interface CustomerAddress {
  id: number;
  customer_id: number;
  address: string;
  state_id: number;
  pincode: string;
  landmark: string;
  created_at: string;
  updated_at: string;
}

export interface AddAddressModel {
  address: string;
  state_id: string;
  pincode: string;
  landmark: string;
  seleted: boolean;
}

export interface DeleteAddressModel {
  address_id: string;
}
