const API_URL = "https://over-share-it-api.onrender.com/users";

// Fetch all users
function fetchUsers() {
    fetch(API_URL)
        .then(response => response.json())
        .then(users => {
            const userList = document.getElementById("userList");
            userList.innerHTML = "";
            users.forEach(user => {
                const li = document.createElement("li");
                li.innerHTML = `
                    ${user.name} ${user.family_name} (${user.email})
                    <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
                `;
                userList.appendChild(li);
            });
        })
        .catch(error => console.error("Error fetching users:", error));
}

// Add a new user
document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const family_name = document.getElementById("family_name").value;
    const company = document.getElementById("company").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, family_name, company, email, phone })
    })
    .then(response => response.json())
    .then(() => {
        fetchUsers();
        document.getElementById("userForm").reset();
    })
    .catch(error => console.error("Error adding user:", error));
});

// Delete a user
function deleteUser(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(response => response.json())
        .then(() => fetchUsers())
        .catch(error => console.error("Error deleting user:", error));
}

// Load users on page load
document.addEventListener("DOMContentLoaded", fetchUsers);

