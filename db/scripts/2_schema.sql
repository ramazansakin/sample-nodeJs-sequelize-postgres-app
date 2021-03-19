
DROP TABLE IF EXISTS Token;
DROP TABLE IF EXISTS token;

DROP TABLE IF EXISTS Usersban;
DROP TABLE IF EXISTS usersban;

DROP TABLE IF EXISTS Votes;
DROP TABLE IF EXISTS votes;

DROP TABLE IF EXISTS Rate;
DROP TABLE IF EXISTS rate;

DROP TABLE IF EXISTS Reviews;
DROP TABLE IF EXISTS reviews;

DROP TABLE IF EXISTS Borrowhistory;
DROP TABLE IF EXISTS borrowhistory;

DROP TABLE IF EXISTS Books;
DROP TABLE IF EXISTS books;

DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS users;


CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    password VARCHAR(15),
    role VARCHAR(5),
    readingPoints INT,
    avatarPath VARCHAR(100),
    isDeleted BOOLEAN
);


CREATE TABLE Books(
    id SERIAL PRIMARY KEY,
    title VARCHAR(20),
    author VARCHAR(20),
    isDelisted BOOLEAN,
    isBorrowed BOOLEAN,
    userId INT,
    CONSTRAINT fk_users FOREIGN KEY (userId) REFERENCES Users(id)
);


CREATE TABLE Borrowhistory(
    id SERIAL PRIMARY KEY,
    bookId INT,
    userId INT,
    borrowedDate DATE,
    CONSTRAINT fk_users FOREIGN KEY (userId) REFERENCES Users(id),
    CONSTRAINT fk_books FOREIGN KEY (bookId) REFERENCES Books(id)
);


CREATE TABLE Reviews(
    id SERIAL PRIMARY KEY,
    review VARCHAR(50),
    isDeleted BOOLEAN,
    bookId INT,
    userId INT,
    CONSTRAINT fk_users FOREIGN KEY (userId) REFERENCES Users(id),
    CONSTRAINT fk_books FOREIGN KEY (bookId) REFERENCES Books(id)
);


CREATE TABLE Rate(
    id SERIAL PRIMARY KEY,
    rate INT,
    bookId INT,
    userId INT,
    CONSTRAINT fk_users FOREIGN KEY (userId) REFERENCES Users(id),
    CONSTRAINT fk_books FOREIGN KEY (bookId) REFERENCES Books(id)
);


CREATE TABLE Votes(
    id SERIAL PRIMARY KEY,
    liked BOOLEAN,
    reviewId INT,
    userId INT,
    CONSTRAINT fk_users FOREIGN KEY (userId) REFERENCES Users(id),
    CONSTRAINT fk_reviews FOREIGN KEY (reviewId) REFERENCES Reviews(id)
);


CREATE TABLE Usersban(
    id SERIAL PRIMARY KEY,
    banned DATE,
    description VARCHAR(50),
    userId INT,
    CONSTRAINT fk_users FOREIGN KEY (userId) REFERENCES Users(id)
);


-- when logout blacklist the token, so if somebody steal it not to be able to log in with others token
CREATE TABLE Token(
    id SERIAL PRIMARY KEY,
    token VARCHAR(50),
    blacklistedOn BOOLEAN
);
