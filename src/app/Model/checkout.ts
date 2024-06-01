export interface checkOutApi {
  status: string;
  msg: string;
  data: CheckOutData;
}

export interface CheckOutData {
  order_id: number;
  payment_url: string;
}
export interface CheckOutModel {
  address_id: string;
  payable_amount: string;
  payment_mode: string;
}
