export interface Invoice {
   mobileNumber: string;
  invoiceNo: number;
  customerID: number;
  itemDescription: string;
  price: number;
  quantity: number;
  totalAmount: number;
  gst: number;

  flashVideoURL?: string;
  headerImageList?: string[];
  billPDFFile?: string;
  facebookURL?: string;
  instaURL?: string;
  twitterURL?: string;
  footerImageList?: string[];
}
