CXX = g++
CXXFLAGS = -std=c++11 -Wall -Wextra
SOURCES = main.cpp Book.cpp Member.cpp Library.cpp
HEADERS = Book.h Member.h Library.h
OBJECTS = $(SOURCES:.cpp=.o)
EXECUTABLE = lms

all: $(EXECUTABLE)

$(EXECUTABLE): $(OBJECTS)
	$(CXX) $(CXXFLAGS) -o $@ $^

%.o: %.cpp $(HEADERS)
	$(CXX) $(CXXFLAGS) -c $< -o $@

clean:
	rm -f $(OBJECTS) $(EXECUTABLE)

rebuild: clean all

run: $(EXECUTABLE)
	./$(EXECUTABLE)

.PHONY: all clean rebuild run