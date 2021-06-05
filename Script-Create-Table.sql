Create DataBase ContactDB

CREATE TABLE ContactDetails(
ContactId INT PRIMARY KEY IDENTITY(1,1),
FirstName VARCHAR(50),
LastName VARCHAR(50),
Email VARCHAR(100),
PhoneNumber VARCHAR(12),
Status VARCHAR(10))

INSERT INTO ContactDetails
(FirstName,LastName, Email, PhoneNumber,Status)
VALUES ('Chaitali','Narkhede','chaitali.narkhede1991@gmail.com','8600274918','Active')
