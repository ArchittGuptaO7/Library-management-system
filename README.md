# Library Management System (LMS)

A simple yet comprehensive C++ application for managing library operations including book inventory, member registration, and book borrowing/returning functionality.

## Features

- **Book Management**
  - Add new books to the library
  - Remove books from inventory
  - Search books by ISBN or title
  - View all books in the library
  - Track book availability status

- **Member Management**
  - Register new library members
  - Remove members from the system
  - Search for member information
  - View all registered members

- **Borrowing System**
  - Members can borrow available books
  - Members can return borrowed books
  - Automatic availability tracking

- **Library Statistics**
  - Total number of books
  - Number of available books
  - Number of borrowed books
  - Total registered members

## Project Structure

```
Book.h / Book.cpp          - Book class definition and implementation
Member.h / Member.cpp      - Member class definition and implementation
Library.h / Library.cpp    - Library class (core management system)
main.cpp                   - Main application with menu-driven interface
README.md                  - This file
LICENSE                    - Apache License 2.0
```

## Class Architecture

### Book Class
- **Attributes**: title, author, ISBN, publication year, availability status
- **Methods**: getters, setters, display information

### Member Class
- **Attributes**: member ID, name, email, phone number, membership date
- **Methods**: getters, display information

### Library Class
- **Book Operations**: add, remove, search, display
- **Member Operations**: add, remove, search, display
- **Borrowing Operations**: borrow book, return book
- **Utility**: statistics and book availability tracking

## Compilation Instructions

### Prerequisites
- C++ compiler (g++, clang, or MSVC)
- C++11 or higher

### Steps to Compile

1. Clone the repository:
   ```bash
   git clone https://github.com/ArchittGuptaO7/LMS.git
   cd LMS
   ```

2. Compile using g++:
   ```bash
   g++ -std=c++11 -o lms main.cpp Book.cpp Member.cpp Library.cpp
   ```

   Or using clang:
   ```bash
   clang++ -std=c++11 -o lms main.cpp Book.cpp Member.cpp Library.cpp
   ```

3. Run the application:
   ```bash
   ./lms
   ```

## Usage

Once the application is running, you'll see a menu with 12 options:

1. **Add Book** - Register a new book in the library
2. **Remove Book** - Delete a book from inventory
3. **Search Book** - Find a book by ISBN or title
4. **Display All Books** - View complete book inventory
5. **Add Member** - Register a new library member
6. **Remove Member** - Remove a member from the system
7. **Search Member** - Look up member details
8. **Display All Members** - View all registered members
9. **Borrow Book** - Member borrows a book
10. **Return Book** - Member returns a borrowed book
11. **Library Statistics** - View library statistics
12. **Exit** - Close the application

## Sample Data

The application comes pre-loaded with sample data:

**Books:**
- The Great Gatsby (ISBN001)
- 1984 (ISBN002)
- To Kill a Mockingbird (ISBN003)

**Members:**
- John Doe (ID: 1001)
- Jane Smith (ID: 1002)

## Example Workflow

1. Run the application
2. Select option 9 to borrow a book
3. Enter member ID: 1001
4. Enter ISBN: ISBN001
5. Book is now marked as unavailable
6. Select option 4 to see updated availability
7. Select option 10 to return the book
8. Book is marked as available again

## Technical Details

- **Language**: C++ (C++11 standard)
- **Paradigm**: Object-Oriented Programming (OOP)
- **Data Structures**: std::vector for storing books and members
- **File Organization**: Modular with separate headers and implementation files

## License

This project is licensed under the Apache License 2.0 - see the LICENSE file for details.

## Author

ArchittGuptaO7

## Future Enhancements

- Persistent data storage (database or file-based)
- Due date tracking for borrowed books
- Fine calculation for overdue books
- User authentication
- Advance book reservation system
- Book categories and genres
- Graphical user interface (GUI)
- REST API for remote access