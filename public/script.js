document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const userTableBody = document.getElementById('userTableBody');
    const messageDiv = document.getElementById('message');
    const editForm = document.getElementById('editForm');
    const editUserModal = new bootstrap.Modal(document.getElementById('editUserModal'));

    const API_URL = '/api/user';

    // Function to display messages
    const showMessage = (message, type) => {
        messageDiv.textContent = message;
        messageDiv.className = `alert alert-${type}`;
        messageDiv.style.display = 'block';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    };

    // Fetch and display all users
    const fetchUsers = async () => {
        try {
            const response = await fetch(API_URL);
            const users = await response.json();
            userTableBody.innerHTML = '';
            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.email}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.phone}</td>
                    <td>
                        <button class="btn btn-sm btn-warning me-2" onclick="openEditModal('${user._id}')"><i class="fas fa-edit"></i></button>
                        <button class="btn btn-sm btn-danger" onclick="deleteUser('${user._id}')"><i class="fas fa-trash"></i></button>
                    </td>
                `;
                userTableBody.appendChild(row);
            });
        } catch (error) {
            showMessage('Error fetching users', 'danger');
        }
    };

    // Register a new user
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('registerEmail').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const phone = document.getElementById('phone').value;

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, firstName, lastName, phone }),
            });
            const data = await response.json();
            if (response.ok) {
                showMessage('User registered successfully!', 'success');
                registerForm.reset();
                fetchUsers();
            } else {
                showMessage(data.message, 'danger');
            }
        } catch (error) {
            showMessage('Error registering user', 'danger');
        }
    });

    // Login user
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await response.json();
            if (response.ok) {
                showMessage('Login successful!', 'success');
                loginForm.reset();
            } else {
                showMessage(data.message, 'danger');
            }
        } catch (error) {
            showMessage('Error logging in', 'danger');
        }
    });

    // Open edit modal and populate with user data
    window.openEditModal = async (id) => {
        try {
            const response = await fetch(`${API_URL}/${id}`);
            const user = await response.json();
            if (response.ok) {
                document.getElementById('editUserId').value = user._id;
                document.getElementById('editEmail').value = user.email;
                document.getElementById('editFirstName').value = user.firstName;
                document.getElementById('editLastName').value = user.lastName;
                document.getElementById('editPhone').value = user.phone;
                editUserModal.show();
            } else {
                showMessage('Could not fetch user data.', 'danger');
            }
        } catch (error) {
            showMessage('Error fetching user data.', 'danger');
        }
    };

    // Update user
    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('editUserId').value;
        const email = document.getElementById('editEmail').value;
        const firstName = document.getElementById('editFirstName').value;
        const lastName = document.getElementById('editLastName').value;
        const phone = document.getElementById('editPhone').value;

        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, firstName, lastName, phone }),
            });
            const data = await response.json();
            if (response.ok) {
                showMessage('User updated successfully!', 'success');
                editUserModal.hide();
                fetchUsers();
            } else {
                showMessage(data.message, 'danger');
            }
        } catch (error) {
            showMessage('Error updating user', 'danger');
        }
    });

    // Delete user
    window.deleteUser = async (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: 'DELETE',
                });
                const data = await response.json();
                if (response.ok) {
                    showMessage('User deleted successfully!', 'success');
                    fetchUsers();
                } else {
                    showMessage(data.message, 'danger');
                }
            } catch (error) {
                showMessage('Error deleting user', 'danger');
            }
        }
    };

    // Initial fetch of users
    fetchUsers();
});
