#ifndef BOOK_H
#define BOOK_H

#include <string>

class Book {
private:
    std::string title;
    std::string author;
    std::string isbn;
    int publicationYear;
    bool isAvailable;

public:
    Book();
    Book(std::string t, std::string a, std::string i, int year);
    ~Book();
    
    // Getters
    std::string getTitle() const;
    std::string getAuthor() const;
    std::string getISBN() const;
    int getPublicationYear() const;
    bool getAvailability() const;
    
    // Setters
    void setAvailability(bool status);
    
    // Display method
    void display() const;
};

#endif // BOOK_H