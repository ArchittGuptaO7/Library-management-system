const STORAGE_KEY = "libraryos-2026-state";

const demoState = {
  books: [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "ISBN001", year: 1925, available: true, borrowerId: null },
    { title: "1984", author: "George Orwell", isbn: "ISBN002", year: 1949, available: true, borrowerId: null },
    { title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "ISBN003", year: 1960, available: true, borrowerId: null },
    { title: "Clean Architecture", author: "Robert C. Martin", isbn: "ISBN026", year: 2017, available: true, borrowerId: null },
    { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", isbn: "ISBN027", year: 2017, available: false, borrowerId: 1002 }
  ],
  members: [
    { id: 1001, name: "John Doe", email: "john@email.com", phone: "1234567890", date: "2024-01-01" },
    { id: 1002, name: "Jane Smith", email: "jane@email.com", phone: "0987654321", date: "2024-01-15" },
    { id: 1003, name: "Aarav Mehta", email: "aarav@library.in", phone: "9876543210", date: "2026-06-30" }
  ],
  activity: [
    { title: "Demo data loaded", detail: "Books and members from the original LMS are ready.", time: new Date().toISOString() },
    { title: "Book borrowed", detail: "Jane Smith borrowed Designing Data-Intensive Applications.", time: new Date().toISOString() }
  ]
};

let state = loadState();
let searchTerm = "";
let availabilityFilter = "all";

const els = {
  totalBooks: document.querySelector("#totalBooks"),
  availableBooks: document.querySelector("#availableBooks"),
  borrowedBooks: document.querySelector("#borrowedBooks"),
  totalMembers: document.querySelector("#totalMembers"),
  bookGrid: document.querySelector("#bookGrid"),
  memberRows: document.querySelector("#memberRows"),
  activityList: document.querySelector("#activityList"),
  globalSearch: document.querySelector("#globalSearch"),
  loanMember: document.querySelector("#loanMember"),
  loanBook: document.querySelector("#loanBook"),
  loanList: document.querySelector("#loanList"),
  toast: document.querySelector("#toast")
};

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return clone(demoState);

  try {
    const parsed = JSON.parse(saved);
    return {
      books: Array.isArray(parsed.books) ? parsed.books : clone(demoState.books),
      members: Array.isArray(parsed.members) ? parsed.members : clone(demoState.members),
      activity: Array.isArray(parsed.activity) ? parsed.activity : clone(demoState.activity)
    };
  } catch {
    return clone(demoState);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function addActivity(title, detail) {
  state.activity.unshift({ title, detail, time: new Date().toISOString() });
  state.activity = state.activity.slice(0, 8);
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => els.toast.classList.remove("show"), 2400);
}

function memberName(id) {
  const member = state.members.find((item) => Number(item.id) === Number(id));
  return member ? member.name : "Unknown member";
}

function loansForMember(id) {
  return state.books.filter((book) => Number(book.borrowerId) === Number(id));
}

function normalized(value) {
  return String(value ?? "").toLowerCase().trim();
}

function filteredBooks() {
  return state.books.filter((book) => {
    const matchesStatus =
      availabilityFilter === "all" ||
      (availabilityFilter === "available" && book.available) ||
      (availabilityFilter === "borrowed" && !book.available);

    const haystack = normalized(`${book.title} ${book.author} ${book.isbn} ${book.year} ${memberName(book.borrowerId)}`);
    return matchesStatus && haystack.includes(normalized(searchTerm));
  });
}

function filteredMembers() {
  return state.members.filter((member) => {
    const memberLoans = loansForMember(member.id).map((book) => book.title).join(" ");
    return normalized(`${member.id} ${member.name} ${member.email} ${member.phone} ${memberLoans}`).includes(normalized(searchTerm));
  });
}

function renderStats() {
  const total = state.books.length;
  const available = state.books.filter((book) => book.available).length;
  els.totalBooks.textContent = total;
  els.availableBooks.textContent = available;
  els.borrowedBooks.textContent = total - available;
  els.totalMembers.textContent = state.members.length;
}

function renderBooks() {
  const books = filteredBooks();
  if (!books.length) {
    els.bookGrid.innerHTML = `<div class="empty">No books match this view.</div>`;
    return;
  }

  els.bookGrid.innerHTML = books
    .map((book) => {
      const borrower = book.available ? "" : `<p>Borrowed by ${memberName(book.borrowerId)}</p>`;
      return `
        <article class="book-card">
          <header>
            <div>
              <h3>${escapeHtml(book.title)}</h3>
              <p>${escapeHtml(book.author)}</p>
            </div>
            <span class="tag ${book.available ? "" : "borrowed"}">${book.available ? "Available" : "Borrowed"}</span>
          </header>
          <p><strong>ISBN:</strong> ${escapeHtml(book.isbn)}</p>
          <p><strong>Year:</strong> ${escapeHtml(book.year)}</p>
          ${borrower}
          <div class="book-actions">
            <button class="mini-button" type="button" data-quick-borrow="${escapeAttr(book.isbn)}" ${book.available ? "" : "disabled"}>Borrow</button>
            <button class="mini-button" type="button" data-quick-return="${escapeAttr(book.isbn)}" ${book.available ? "disabled" : ""}>Return</button>
            <button class="mini-button remove" type="button" data-remove-book="${escapeAttr(book.isbn)}">Remove</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderMembers() {
  const members = filteredMembers();
  if (!members.length) {
    els.memberRows.innerHTML = `<tr><td colspan="5">No members match this view.</td></tr>`;
    return;
  }

  els.memberRows.innerHTML = members
    .map((member) => {
      const loans = loansForMember(member.id);
      return `
        <tr>
          <td>${escapeHtml(member.id)}</td>
          <td><strong>${escapeHtml(member.name)}</strong><br><span>${formatDate(member.date)}</span></td>
          <td>${escapeHtml(member.email)}<br><span>${escapeHtml(member.phone)}</span></td>
          <td>${loans.length ? loans.map((book) => escapeHtml(book.title)).join(", ") : "None"}</td>
          <td><button class="mini-button remove" type="button" data-remove-member="${escapeAttr(member.id)}">Remove</button></td>
        </tr>
      `;
    })
    .join("");
}

function renderActivity() {
  els.activityList.innerHTML = state.activity
    .slice(0, 6)
    .map(
      (item) => `
        <li>
          <strong>${escapeHtml(item.title)}</strong>
          ${escapeHtml(item.detail)}
          <br><small>${timeAgo(item.time)}</small>
        </li>
      `
    )
    .join("");
}

function renderCirculation() {
  els.loanMember.innerHTML = state.members
    .map((member) => `<option value="${escapeAttr(member.id)}">${escapeHtml(member.name)} · ${escapeHtml(member.id)}</option>`)
    .join("");

  els.loanBook.innerHTML = state.books
    .map((book) => `<option value="${escapeAttr(book.isbn)}">${escapeHtml(book.title)} · ${book.available ? "available" : `borrowed by ${memberName(book.borrowerId)}`}</option>`)
    .join("");

  const borrowed = state.books.filter((book) => !book.available);
  els.loanList.innerHTML = borrowed.length
    ? borrowed
        .map(
          (book) => `
            <div class="loan-item">
              <div>
                <strong>${escapeHtml(book.title)}</strong><br>
                <span>${escapeHtml(book.isbn)} · ${escapeHtml(memberName(book.borrowerId))}</span>
              </div>
              <button class="mini-button" type="button" data-quick-return="${escapeAttr(book.isbn)}">Return</button>
            </div>
          `
        )
        .join("")
    : `<div class="empty">No active loans right now.</div>`;
}

function renderAll() {
  renderStats();
  renderBooks();
  renderMembers();
  renderActivity();
  renderCirculation();
  saveState();
}

function addBook(form) {
  const data = Object.fromEntries(new FormData(form));
  const isbn = data.isbn.trim();
  if (state.books.some((book) => normalized(book.isbn) === normalized(isbn))) {
    showToast("A book with this ISBN already exists.");
    return false;
  }

  state.books.unshift({
    title: data.title.trim(),
    author: data.author.trim(),
    isbn,
    year: Number(data.year),
    available: true,
    borrowerId: null
  });
  addActivity("Book added", `${data.title.trim()} was added to the catalog.`);
  showToast("Book saved.");
  return true;
}

function addMember(form) {
  const data = Object.fromEntries(new FormData(form));
  const id = Number(data.id);
  if (state.members.some((member) => Number(member.id) === id)) {
    showToast("A member with this ID already exists.");
    return false;
  }

  state.members.unshift({
    id,
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    date: data.date
  });
  addActivity("Member registered", `${data.name.trim()} joined the library.`);
  showToast("Member saved.");
  return true;
}

function borrowBook(memberId, isbn) {
  const book = state.books.find((item) => item.isbn === isbn);
  const member = state.members.find((item) => Number(item.id) === Number(memberId));
  if (!book || !member) {
    showToast("Choose a valid member and book.");
    return;
  }
  if (!book.available) {
    showToast("That book is already borrowed.");
    return;
  }

  book.available = false;
  book.borrowerId = Number(memberId);
  addActivity("Book borrowed", `${member.name} borrowed ${book.title}.`);
  showToast("Borrowed successfully.");
  renderAll();
}

function returnBook(isbn) {
  const book = state.books.find((item) => item.isbn === isbn);
  if (!book || book.available) {
    showToast("This book is not currently borrowed.");
    return;
  }

  const borrower = memberName(book.borrowerId);
  book.available = true;
  book.borrowerId = null;
  addActivity("Book returned", `${borrower} returned ${book.title}.`);
  showToast("Returned successfully.");
  renderAll();
}

function removeBook(isbn) {
  const book = state.books.find((item) => item.isbn === isbn);
  if (!book) return;
  state.books = state.books.filter((item) => item.isbn !== isbn);
  addActivity("Book removed", `${book.title} was removed from inventory.`);
  showToast("Book removed.");
  renderAll();
}

function removeMember(id) {
  const hasLoans = state.books.some((book) => Number(book.borrowerId) === Number(id));
  if (hasLoans) {
    showToast("Return this member's books before removing them.");
    return;
  }

  const member = state.members.find((item) => Number(item.id) === Number(id));
  state.members = state.members.filter((item) => Number(item.id) !== Number(id));
  addActivity("Member removed", `${member?.name ?? "A member"} was removed.`);
  showToast("Member removed.");
  renderAll();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function formatDate(value) {
  if (!value) return "No date";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

function timeAgo(value) {
  const seconds = Math.max(1, Math.floor((Date.now() - new Date(value).getTime()) / 1000));
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

document.querySelectorAll("[data-open-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    const dialog = document.querySelector(`#${button.dataset.openModal}`);
    dialog?.showModal();
  });
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", () => button.closest("dialog")?.close());
});

document.querySelector("#bookForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (addBook(event.currentTarget)) {
    event.currentTarget.reset();
    event.currentTarget.closest("dialog").close();
    renderAll();
  }
});

document.querySelector("#memberForm").addEventListener("submit", (event) => {
  event.preventDefault();
  if (addMember(event.currentTarget)) {
    event.currentTarget.reset();
    event.currentTarget.closest("dialog").close();
    renderAll();
  }
});

els.globalSearch.addEventListener("input", (event) => {
  searchTerm = event.target.value;
  renderBooks();
  renderMembers();
});

document.querySelector(".segmented").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  availabilityFilter = button.dataset.filter;
  document.querySelectorAll(".segmented button").forEach((item) => item.classList.toggle("active", item === button));
  renderBooks();
});

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-quick-borrow], [data-quick-return], [data-remove-book], [data-remove-member], .nav-link");
  if (!target) return;

  if (target.matches(".nav-link")) {
    document.querySelectorAll(".nav-link").forEach((link) => link.classList.toggle("active", link === target));
    return;
  }

  const firstMember = state.members[0];
  if (target.dataset.quickBorrow) {
    if (!firstMember) return showToast("Add a member first.");
    borrowBook(firstMember.id, target.dataset.quickBorrow);
  }
  if (target.dataset.quickReturn) returnBook(target.dataset.quickReturn);
  if (target.dataset.removeBook) removeBook(target.dataset.removeBook);
  if (target.dataset.removeMember) removeMember(target.dataset.removeMember);
});

document.querySelector("#circulationForm").addEventListener("submit", (event) => {
  event.preventDefault();
  borrowBook(els.loanMember.value, els.loanBook.value);
});

document.querySelector("#returnBook").addEventListener("click", () => returnBook(els.loanBook.value));

document.querySelector("#sampleBorrow").addEventListener("click", () => {
  const available = state.books.find((book) => book.available);
  const member = state.members[0];
  if (!available || !member) return showToast("Need an available book and member for the demo.");
  borrowBook(member.id, available.isbn);
});

document.querySelector("#exportData").addEventListener("click", () => {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `libraryos-export-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  showToast("Export started.");
});

document.querySelector("#importData").addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const imported = JSON.parse(await file.text());
    state = {
      books: Array.isArray(imported.books) ? imported.books : state.books,
      members: Array.isArray(imported.members) ? imported.members : state.members,
      activity: Array.isArray(imported.activity) ? imported.activity : state.activity
    };
    addActivity("Data imported", `${file.name} was loaded into LibraryOS.`);
    showToast("Import complete.");
    renderAll();
  } catch {
    showToast("Import failed. Use a valid JSON export.");
  } finally {
    event.target.value = "";
  }
});

document.querySelector("#resetData").addEventListener("click", () => {
  state = clone(demoState);
  addActivity("Demo reset", "The library was reset to sample data.");
  showToast("Demo data restored.");
  renderAll();
});

renderAll();
