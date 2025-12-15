-- Switch to your database
USE uniconnect_db;

-- Table: Staff
CREATE TABLE Staff (
    Staff_ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100),
    Email VARCHAR(100) UNIQUE,
    Password VARCHAR(255),
    Department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Admin
CREATE TABLE Admin (
    Admin_ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100),
    Email VARCHAR(100) UNIQUE,
    Password VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Student
CREATE TABLE Student (
    Student_ID INT PRIMARY KEY AUTO_INCREMENT,
    Name VARCHAR(100),
    Email VARCHAR(100) UNIQUE,
    Password VARCHAR(255),
    Department VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Category
CREATE TABLE Category (
    Category_ID INT PRIMARY KEY AUTO_INCREMENT,
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: Category_Name
CREATE TABLE Category_Name (
    Category_Name_ID INT PRIMARY KEY AUTO_INCREMENT,
    Category_ID INT,
    Category_name VARCHAR(100),
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Category_ID) REFERENCES Category(Category_ID) ON DELETE CASCADE
);

-- Table: Complaint
CREATE TABLE Complaint (
    Complaint_ID INT PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(255),
    Status VARCHAR(50) DEFAULT 'Pending',
    Student_ID INT,
    Description TEXT,
    Category_ID INT,
    Created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    Is_anonymous BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (Student_ID) REFERENCES Student(Student_ID),
    FOREIGN KEY (Category_ID) REFERENCES Category(Category_ID)
);

-- Table: Staff_Assignment
CREATE TABLE Staff_Assignment (
    Assignment_ID INT PRIMARY KEY AUTO_INCREMENT,
    Complaint_ID INT,
    Staff_ID INT,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Complaint_ID) REFERENCES Complaint(Complaint_ID),
    FOREIGN KEY (Staff_ID) REFERENCES Staff(Staff_ID)
);
