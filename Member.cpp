#include "Member.h"
#include <iostream>

Member::Member() : memberId(0), name(""), email(""), phoneNumber(""), membershipDate("") {}

Member::Member(int id, std::string n, std::string e, std::string phone, std::string date)
    : memberId(id), name(n), email(e), phoneNumber(phone), membershipDate(date) {}

Member::~Member() {}

int Member::getMemberId() const {
    return memberId;
}

std::string Member::getName() const {
    return name;
}

std::string Member::getEmail() const {
    return email;
}

std::string Member::getPhoneNumber() const {
    return phoneNumber;
}

std::string Member::getMembershipDate() const {
    return membershipDate;
}

void Member::display() const {
    std::cout << "Member ID: " << memberId << std::endl;
    std::cout << "Name: " << name << std::endl;
    std::cout << "Email: " << email << std::endl;
    std::cout << "Phone: " << phoneNumber << std::endl;
    std::cout << "Membership Date: " << membershipDate << std::endl;
}