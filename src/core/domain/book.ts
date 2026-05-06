export interface IBook {
  id: string;
  title: string;
  type: "EBOOK" | "PRINTED";
  borrow_days: number;
  available: boolean;
  created_at: string;
}

export interface ICreateBook {
  title: string;
  type: "EBOOK" | "PRINTED";
}

export interface IUpdateBookTitle {
  title: string;
}
