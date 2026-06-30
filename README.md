# 📚 Library Management System (LMS)

A simple, modular, and object-oriented **Library Management System** built in **C++**. This application allows users to manage books, register members, and handle book borrowing and returning through a menu-driven interface.

---

## 🚀 Live Demo

> **Live Application:** *Coming Soon*
> Replace the link below once your project is deployed.

**🔗 Live Demo:** [https://your-live-link-here.com](https://archittguptao7.github.io/Library-management-system/)

---

## ✨ Features

### 📖 Book Management

* Add new books to the library
* Remove books from the inventory
* Search books by **ISBN** or **Title**
* Display all books
* Track book availability

### 👤 Member Management

* Register new library members
* Remove existing members
* Search members by ID
* Display all registered members

### 🔄 Borrowing System

* Borrow available books
* Return borrowed books
* Automatic availability updates

### 📊 Library Statistics

* Total books
* Available books
* Borrowed books
* Registered members

---

## 📁 Project Structure

```text
Book.h / Book.cpp        - Book class definition and implementation
Member.h / Member.cpp    - Member class definition and implementation
Library.h / Library.cpp  - Core library management logic
main.cpp                 - Menu-driven application
README.md                - Project documentation
LICENSE                  - Apache License 2.0
```

---

## 🏗️ Class Architecture

### Book Class

**Attributes**

* Title
* Author
* ISBN
* Publication Year
* Availability Status

**Methods**

* Getters and setters
* Display book information

---

### Member Class

**Attributes**

* Member ID
* Name
* Email
* Phone Number
* Membership Date

**Methods**

* Getters
* Display member information

---

### Library Class

**Book Operations**

* Add Book
* Remove Book
* Search Book
* Display Books

**Member Operations**

* Add Member
* Remove Member
* Search Member
* Display Members

**Borrowing Operations**

* Borrow Book
* Return Book

**Utility Functions**

* Library statistics
* Availability tracking

---

## 🛠️ Technologies Used

* **Language:** C++
* **Standard:** C++11
* **Programming Paradigm:** Object-Oriented Programming (OOP)
* **Data Structures:** `std::vector`
* **Architecture:** Modular programming with separate header and source files

---

## ⚙️ Installation & Compilation

### Prerequisites

* GCC, Clang, or MSVC
* C++11 or later

### Clone the Repository

```bash
git clone https://github.com/ArchittGuptaO7/LMS.git
cd LMS
```

### Compile

Using **g++**

```bash
g++ -std=c++11 -o lms main.cpp Book.cpp Member.cpp Library.cpp
```

Using **clang++**

```bash
clang++ -std=c++11 -o lms main.cpp Book.cpp Member.cpp Library.cpp
```

### Run

**Linux/macOS**

```bash
./lms
```

**Windows**

```bash
lms.exe
```

---

## 📋 Menu Options

```
1. Add Book
2. Remove Book
3. Search Book
4. Display All Books
5. Add Member
6. Remove Member
7. Search Member
8. Display All Members
9. Borrow Book
10. Return Book
11. Library Statistics
12. Exit
```

---

## 📚 Sample Data

### Books

| Title                 | ISBN    |
| --------------------- | ------- |
| The Great Gatsby      | ISBN001 |
| 1984                  | ISBN002 |
| To Kill a Mockingbird | ISBN003 |

### Members

| Name       | Member ID |
| ---------- | --------- |
| John Doe   | 1001      |
| Jane Smith | 1002      |

---

## 💻 Example Workflow

1. Launch the application.
2. Select **Borrow Book**.
3. Enter **Member ID:** `1001`
4. Enter **ISBN:** `ISBN001`
5. The selected book becomes unavailable.
6. View the updated inventory using **Display All Books**.
7. Return the book using **Return Book**.
8. The book becomes available again.

---

## 🌟 Future Enhancements

* File-based or database storage
* Due date tracking
* Fine calculation for overdue books
* User authentication
* Book reservation system
* Book categories and genres
* Graphical User Interface (GUI)
* REST API support
* Admin dashboard
* Search filters and sorting

---

## 📄 License

This project is licensed under the **Apache License 2.0**. See the [LICENSE](LICENSE) file for more information.

---

## 👨‍💻 Author

**Archit Gupta**

* GitHub: https://github.com/ArchittGuptaO7
* LinkedIn: https://www.linkedin.com/in/YOUR-LINKEDIN

---

⭐ If you found this project useful, consider giving it a **Star** on GitHub!
