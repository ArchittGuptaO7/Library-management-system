#ifndef MEMBER_H
#define MEMBER_H

#include <string>

class Member {
private:
    int memberId;
    std::string name;
    std::string email;
    std::string phoneNumber;
    std::string membershipDate;

public:
    Member();
    Member(int id, std::string n, std::string e, std::string phone, std::string date);
    ~Member();
    
    // Getters
    int getMemberId() const;
    std::string getName() const;
    std::string getEmail() const;
    std::string getPhoneNumber() const;
    std::string getMembershipDate() const;
    
    // Display method
    void display() const;
};

#endif // MEMBER_H