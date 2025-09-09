export type newProduct = {
  serialNumber: string;
  isItNew: boolean;
  photo: string;
  title: string;
  type: string;
  specification: string;
  incoming: string;
  guarantee: {
    start: any;
    end: any;
  };
  price: [
    { value: number; symbol: "USD"; isDefault: 1 },
    { value: number; symbol: "UAH"; isDefault: 0 }
  ];
  date: any;
};

export type newIncoming = {
  _id?: string;
  name: string;
  isItNew: boolean;
  date: any;
};
