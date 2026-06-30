#include "Library.h"
#include <iostream>
#include <algorithm>

Library::Library() {}

Library::~Library() {}

// Book methods
void Library::addBook(const Book& book) {
    books.push_back(book);
    std::cout << "Book added successfully!" << std::endl;
}

bool Library::removeBook(const std::string& isbn) {
    auto it = std::find_if(books.begin(), books.end(),
        [&isbn](const Book& b) { return b.getISBN() == isbn; });
    
    if (it != books.end()) {
        books.erase(it);
        std::cout << "Book removed successfully!" << std::endl;
        return true;
    }
    std::cout << "Book not found!" << std::endl;
    return false;
}

Book* Library::searchBook(const std::string& isbn) {
    for (auto& book : books) {
        if (book.getISBN() == isbn) {
            return &book;
        }
    }
    return nullptr;
}

Book* Library::searchBookByTitle(const std::string& title) {
    for (auto& book : books) {
        if (book.getTitle() == title) {
            return &book;
        }
    }
    return nullptr;
}

void Library::displayAllBooks() const {
    if (books.empty()) {
        std::cout << "No books in the library!" << std::endl;
        return;
    }
    std::cout << "\n========== ALL BOOKS ==========" << std::endl;
    for (size_t i = 0; i < books.size(); i++) {
        std::cout << "\nBook #" << (i + 1) << std::endl;
        books[i].display();
    }
    std::cout << "==============================\n" << std::endl;
}

// Member methods
void Library::addMember(const Member& member) {
    members.push_back(member);
    std::cout << "Member added successfully!" << std::endl;
}

bool Library::removeMember(int memberId) {
    auto it = std::find_if(members.begin(), members.end(),
        [memberId](const Member& m) { return m.getMemberId() == memberId; });
    
    if (it != members.end()) {
        members.erase(it);
        std::cout << "Member removed successfully!" << std::endl;
        return true;
    }
    std::cout << "Member not found!" << std::endl;
    return false;
}

Member* Library::searchMember(int memberId) {
    for (auto& member : members) {
        if (member.getMemberId() == memberId) {
            return &member;
        }
    }
    return nullptr;
}

void Library::displayAllMembers() const {
    if (members.empty()) {
        std::cout << "No members registered!" << std::endl;
        return;
    }
    std::cout << "\n========== ALL MEMBERS =========" << std::endl;
    for (size_t i = 0; i < members.size(); i++) {
        std::cout << "\nMember #" << (i + 1) << std::endl;
        members[i].display();
    }
    std::cout << "===============================\n" << std::endl;
}

// Borrowing methods
bool Library::borrowBook(int memberId, const std::string& isbn) {
    Member* member = searchMember(memberId);
    if (!member) {
        std::cout << "Member not found!" << std::endl;
        return false;
    }
    
    Book* book = searchBook(isbn);
    if (!book) {
        std::cout << "Book not found!" << std::endl;
        return false;
    }
    
    if (!book->getAvailability()) {
        std::cout << "Book is not available for borrowing!" << std::endl;
        return false;
    }
    
    book->setAvailability(false);
    std::cout << "Book borrowed successfully by " << member->getName() << "!" << std::endl;
    return true;
}

bool Library::returnBook(int memberId, const std::string& isbn) {
    Member* member = searchMember(memberId);
    if (!member) {
        std::cout << "Member not found!" << std::endl;
        return false;
    }
    
    Book* book = searchBook(isbn);
    if (!book) {
        std::cout << "Book not found!" << std::endl;
        return false;
    }
    
    if (book->getAvailability()) {
        std::cout << "This book was not borrowed!" << std::endl;
        return false;
    }
    
    book->setAvailability(true);
    std::cout << "Book returned successfully by " << member->getName() << "!" << std::endl;
    return true;
}

// Utility methods
int Library::getTotalBooks() const {
    return books.size();
}

int Library::getTotalMembers() const {
    return members.size();
}

int Library::getAvailableBooks() const {
    int count = 0;
    for (const auto& book : books) {
        if (book.getAvailability()) {
            count++;
        }
    }
    return count;
}