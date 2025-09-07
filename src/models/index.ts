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
    { value: string; symbol: "USD"; isDefault: 1 },
    { value: string; symbol: "UAH"; isDefault: 0 }
  ];
  date: any;
};
