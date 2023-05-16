
CREATE TABLE cart (
  id VARCHAR(100) PRIMARY KEY,
  userid VARCHAR(100),
  productid VARCHAR(100),
  quantity VARCHAR(100),
  price VARCHAR(100),
  FOREIGN KEY (userid) REFERENCES Users(UserId),
  FOREIGN KEY (productid) REFERENCES products(id),
   isDeleted INT DEFAULT 0
);
