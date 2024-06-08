Create database Milk
CREATE TABLE Country (
    CountryID INT PRIMARY KEY,
    CountryName TEXT NOT NULL
);

CREATE TABLE Company (
    CompanyID INT PRIMARY KEY,
    CompanyName TEXT NOT NULL,
    CountryID INT,
    FOREIGN KEY (CountryID) REFERENCES Country(CountryID)
);

CREATE TABLE BrandMilk (
    BrandMilkID INT PRIMARY KEY,
    BrandName TEXT NOT NULL,
    CompanyID INT,
    FOREIGN KEY (CompanyID) REFERENCES Company(CompanyID)
);

CREATE TABLE Admin (
    AdminID INT PRIMARY KEY,
    Username TEXT NOT NULL,
    Password TEXT NOT NULL
);

CREATE TABLE Customer (
    CustomerID INT PRIMARY KEY,
    CustomerName TEXT NOT NULL,
    Email TEXT NOT NULL,
    Password TEXT NOT NULL
);

CREATE TABLE Storage (
    StorageID INT PRIMARY KEY,
    StorageName TEXT NOT NULL
);

CREATE TABLE DeliveryMan (
    DeliveryManID INT PRIMARY KEY,
    DeliveryName TEXT NOT NULL,
    DeliveryStatus TEXT,
    PhoneNumber TEXT NOT NULL,
    StorageID INT,
    FOREIGN KEY (StorageID) REFERENCES Storage(StorageID)
);

CREATE TABLE Product (
    ProductID INT PRIMARY KEY,
    ProductName TEXT NOT NULL,
    BrandMilkID INT,
    AdminID INT,
    FOREIGN KEY (BrandMilkID) REFERENCES BrandMilk(BrandMilkID),
    FOREIGN KEY (AdminID) REFERENCES Admin(AdminID)
);

CREATE TABLE AgeRange (
    AgeRangeID INT PRIMARY KEY,
    Baby TEXT,
    Mama TEXT,
    ProductID INT,
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

CREATE TABLE ProductItem (
    ProductItemID INT PRIMARY KEY,
    Benefit TEXT,
    Description TEXT,
    Image TEXT,
    ItemName TEXT NOT NULL,
    Price DECIMAL(10, 2),
    Weight FLOAT,  -- Đổi từ DOUBLE thành FLOAT
    ProductID INT,
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

CREATE TABLE [Order] (
    OrderID INT PRIMARY KEY,
    AdminID INT,
    CustomerID INT,
    DeliveryManID INT,
    OrderDate DATE,
    ShippingAddress TEXT NOT NULL,
    TotalAmount DECIMAL(10, 2),
    StorageID INT,
    FOREIGN KEY (AdminID) REFERENCES Admin(AdminID),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    FOREIGN KEY (DeliveryManID) REFERENCES DeliveryMan(DeliveryManID),
    FOREIGN KEY (StorageID) REFERENCES Storage(StorageID)
);

CREATE TABLE Payment (
    PaymentID INT PRIMARY KEY,
    Amount DECIMAL(10, 2) NOT NULL,
    PaymentMethod TEXT NOT NULL,
    OrderID INT,
    FOREIGN KEY (OrderID) REFERENCES [Order](OrderID)
);

CREATE TABLE OrderDetail (
    OrderDetailID INT PRIMARY KEY,
    OrderID INT,
    ProductItemID INT,
    Quantity INT,
    Price DECIMAL(10, 2),
    OrderDetailStatus TEXT,
    FOREIGN KEY (OrderID) REFERENCES [Order](OrderID),
    FOREIGN KEY (ProductItemID) REFERENCES ProductItem(ProductItemID)
);

