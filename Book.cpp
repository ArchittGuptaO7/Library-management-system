#include "Book.h"
#include <iostream>

Book::Book() : title(""), author(""), isbn(""), publicationYear(0), isAvailable(true) {}

Book::Book(std::string t, std::string a, std::string i, int year)
    : title(t), author(a), isbn(i), publicationYear(year), isAvailable(true) {}

Book::~Book() {}

std::string Book::getTitle() const {
    return title;
}

std::string Book::getAuthor() const {
    return author;
}

std::string Book::getISBN() const {
    return isbn;
}

int Book::getPublicationYear() const {
    return publicationYear;
}

bool Book::getAvailability() const {
    return isAvailable;
}

void Book::setAvailability(bool status) {
    isAvailable = status;
}

void Book::display() const {
    std::cout << "Title: " << title << std::endl;
    std::cout << "Author: " << author << std::endl;
    std::cout << "ISBN: " << isbn << std::endl;
    std::cout << "Publication Year: " << publicationYear << std::endl;
    std::cout << "Available: " << (isAvailable ? "Yes" : "No") << std::endl;
}