export type newProduct = {
  serialNumber: string;
  isItNew: string;
  photo: string;
  title: string;
  type: string;
  specification: string;
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
