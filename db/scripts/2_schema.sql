
DROP TABLE IF EXISTS token;

DROP TABLE IF EXISTS usersban;

DROP TABLE IF EXISTS votes;

DROP TABLE IF EXISTS rate;

DROP TABLE IF EXISTS reviews;

DROP TABLE IF EXISTS borrowhistory;

DROP TABLE IF EXISTS books;

DROP TABLE IF EXISTS users;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    password VARCHAR(15),
    role VARCHAR(5),
    readingPoints INT,
    avatarPath VARCHAR(100),
    isDeleted BOOLEAN
);


CREATE TABLE books(
    id SERIAL PRIMARY KEY,
    title VARCHAR(20),
    author VARCHAR(20),
    isDelisted BOOLEAN,
    isBorrowed BOOLEAN,
    userId INT,
    CONSTRAINT fk_users FOREIGN KEY (userId) REFERENCES Users(id)
);


CREATE TABLE borrowhistory(
    id SERIAL PRIMARY KEY,
    bookId INT,
    userId INT,
    borrowedDate DATE,
    CONSTRAINT fk_users FOREIGN KEY (userId) REFERENCES Users(id),
    CONSTRAINT fk_books FOREIGN KEY (bookId) REFERENCES Books(id)
);


CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    review VARCHAR(50),
    isDeleted BOOLEAN,
    bookId INT,
    userId INT,
    CONSTRAINT fk_users FOREIGN KEY (userId) REFERENCES Users(id),
    CONSTRAINT fk_books FOREIGN KEY (bookId) REFERENCES Books(id)
);


CREATE TABLE rate(
    id SERIAL PRIMARY KEY,
    rate INT,
    bookId INT,
    userId INT,
    CONSTRAINT fk_users FOREIGN KEY (userId) REFERENCES Users(id),
    CONSTRAINT fk_books FOREIGN KEY (bookId) REFERENCES Books(id)
);


CREATE TABLE votes(
    id SERIAL PRIMARY KEY,
    liked BOOLEAN,
    reviewId INT,
    userId INT,
    CONSTRAINT fk_users FOREIGN KEY (userId) REFERENCES Users(id),
    CONSTRAINT fk_reviews FOREIGN KEY (reviewId) REFERENCES Reviews(id)
);


CREATE TABLE usersban(
    id SERIAL PRIMARY KEY,
    banned DATE,
    description VARCHAR(50),
    userId INT,
    CONSTRAINT fk_users FOREIGN KEY (userId) REFERENCES Users(id)
);


-- when logout blacklist the token, so if somebody steal it not to be able to log in with others token
CREATE TABLE token(
    id SERIAL PRIMARY KEY,
    token VARCHAR(50),
    blacklistedOn BOOLEAN
);
