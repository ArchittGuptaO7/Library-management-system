#ifndef LIBRARY_H
#define LIBRARY_H

#include "Book.h"
#include "Member.h"
#include <vector>
#include <string>

class Library {
private:
    std::vector<Book> books;
    std::vector<Member> members;

public:
    Library();
    ~Library();
    
    // Book methods
    void addBook(const Book& book);
    bool removeBook(const std::string& isbn);
    Book* searchBook(const std::string& isbn);
    Book* searchBookByTitle(const std::string& title);
    void displayAllBooks() const;
    
    // Member methods
    void addMember(const Member& member);
    bool removeMember(int memberId);
    Member* searchMember(int memberId);
    void displayAllMembers() const;
    
    // Borrowing methods
    bool borrowBook(int memberId, const std::string& isbn);
    bool returnBook(int memberId, const std::string& isbn);
    
    // Utility methods
    int getTotalBooks() const;
    int getTotalMembers() const;
    int getAvailableBooks() const;
};

#endif // LIBRARY_H