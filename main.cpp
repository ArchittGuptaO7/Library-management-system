#include <iostream>
#include <string>
#include "Library.h"

using namespace std;

void displayMainMenu() {
    cout << "\n";
    cout << "========================================" << endl;
    cout << "   LIBRARY MANAGEMENT SYSTEM" << endl;
    cout << "========================================" << endl;
    cout << "1. Add Book" << endl;
    cout << "2. Remove Book" << endl;
    cout << "3. Search Book" << endl;
    cout << "4. Display All Books" << endl;
    cout << "5. Add Member" << endl;
    cout << "6. Remove Member" << endl;
    cout << "7. Search Member" << endl;
    cout << "8. Display All Members" << endl;
    cout << "9. Borrow Book" << endl;
    cout << "10. Return Book" << endl;
    cout << "11. Library Statistics" << endl;
    cout << "12. Exit" << endl;
    cout << "========================================" << endl;
    cout << "Enter your choice: ";
}

void addBookMenu(Library& library) {
    string title, author, isbn;
    int year;
    
    cout << "\n--- Add New Book ---" << endl;
    cout << "Enter book title: ";
    cin.ignore();
    getline(cin, title);
    
    cout << "Enter author name: ";
    getline(cin, author);
    
    cout << "Enter ISBN: ";
    getline(cin, isbn);
    
    cout << "Enter publication year: ";
    cin >> year;
    
    Book newBook(title, author, isbn, year);
    library.addBook(newBook);
}

void removeBookMenu(Library& library) {
    string isbn;
    cout << "\n--- Remove Book ---" << endl;
    cout << "Enter ISBN of book to remove: ";
    cin.ignore();
    getline(cin, isbn);
    
    library.removeBook(isbn);
}

void searchBookMenu(Library& library) {
    int choice;
    cout << "\n--- Search Book ---" << endl;
    cout << "1. Search by ISBN" << endl;
    cout << "2. Search by Title" << endl;
    cout << "Enter choice: ";
    cin >> choice;
    
    if (choice == 1) {
        string isbn;
        cout << "Enter ISBN: ";
        cin.ignore();
        getline(cin, isbn);
        
        Book* book = library.searchBook(isbn);
        if (book) {
            cout << "\nBook found:" << endl;
            book->display();
        } else {
            cout << "Book not found!" << endl;
        }
    } else if (choice == 2) {
        string title;
        cout << "Enter book title: ";
        cin.ignore();
        getline(cin, title);
        
        Book* book = library.searchBookByTitle(title);
        if (book) {
            cout << "\nBook found:" << endl;
            book->display();
        } else {
            cout << "Book not found!" << endl;
        }
    } else {
        cout << "Invalid choice!" << endl;
    }
}

void addMemberMenu(Library& library) {
    int id;
    string name, email, phone, date;
    
    cout << "\n--- Add New Member ---" << endl;
    cout << "Enter member ID: ";
    cin >> id;
    cin.ignore();
    
    cout << "Enter member name: ";
    getline(cin, name);
    
    cout << "Enter email: ";
    getline(cin, email);
    
    cout << "Enter phone number: ";
    getline(cin, phone);
    
    cout << "Enter membership date (DD/MM/YYYY): ";
    getline(cin, date);
    
    Member newMember(id, name, email, phone, date);
    library.addMember(newMember);
}

void removeMemberMenu(Library& library) {
    int id;
    cout << "\n--- Remove Member ---" << endl;
    cout << "Enter member ID to remove: ";
    cin >> id;
    
    library.removeMember(id);
}

void searchMemberMenu(Library& library) {
    int id;
    cout << "\n--- Search Member ---" << endl;
    cout << "Enter member ID: ";
    cin >> id;
    
    Member* member = library.searchMember(id);
    if (member) {
        cout << "\nMember found:" << endl;
        member->display();
    } else {
        cout << "Member not found!" << endl;
    }
}

void borrowBookMenu(Library& library) {
    int memberId;
    string isbn;
    
    cout << "\n--- Borrow Book ---" << endl;
    cout << "Enter member ID: ";
    cin >> memberId;
    cin.ignore();
    
    cout << "Enter ISBN of book to borrow: ";
    getline(cin, isbn);
    
    library.borrowBook(memberId, isbn);
}

void returnBookMenu(Library& library) {
    int memberId;
    string isbn;
    
    cout << "\n--- Return Book ---" << endl;
    cout << "Enter member ID: ";
    cin >> memberId;
    cin.ignore();
    
    cout << "Enter ISBN of book to return: ";
    getline(cin, isbn);
    
    library.returnBook(memberId, isbn);
}

void displayStatistics(Library& library) {
    cout << "\n========== LIBRARY STATISTICS ==========" << endl;
    cout << "Total Books: " << library.getTotalBooks() << endl;
    cout << "Available Books: " << library.getAvailableBooks() << endl;
    cout << "Borrowed Books: " << (library.getTotalBooks() - library.getAvailableBooks()) << endl;
    cout << "Total Members: " << library.getTotalMembers() << endl;
    cout << "========================================" << endl;
}

int main() {
    Library library;
    int choice;
    
    // Add sample data for demonstration
    Book sampleBook1("The Great Gatsby", "F. Scott Fitzgerald", "ISBN001", 1925);
    Book sampleBook2("1984", "George Orwell", "ISBN002", 1949);
    Book sampleBook3("To Kill a Mockingbird", "Harper Lee", "ISBN003", 1960);
    
    library.addBook(sampleBook1);
    library.addBook(sampleBook2);
    library.addBook(sampleBook3);
    
    Member sampleMember1(1001, "John Doe", "john@email.com", "1234567890", "01/01/2024");
    Member sampleMember2(1002, "Jane Smith", "jane@email.com", "0987654321", "15/01/2024");
    
    library.addMember(sampleMember1);
    library.addMember(sampleMember2);
    
    cout << "\n=== Sample data loaded ===" << endl;
    
    do {
        displayMainMenu();
        cin >> choice;
        
        switch (choice) {
            case 1:
                addBookMenu(library);
                break;
            case 2:
                removeBookMenu(library);
                break;
            case 3:
                searchBookMenu(library);
                break;
            case 4:
                library.displayAllBooks();
                break;
            case 5:
                addMemberMenu(library);
                break;
            case 6:
                removeMemberMenu(library);
                break;
            case 7:
                searchMemberMenu(library);
                break;
            case 8:
                library.displayAllMembers();
                break;
            case 9:
                borrowBookMenu(library);
                break;
            case 10:
                returnBookMenu(library);
                break;
            case 11:
                displayStatistics(library);
                break;
            case 12:
                cout << "\nThank you for using Library Management System!" << endl;
                cout << "Goodbye!" << endl;
                break;
            default:
                cout << "Invalid choice. Please try again!" << endl;
        }
    } while (choice != 12);
    
    return 0;
}