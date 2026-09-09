document.addEventListener('DOMContentLoaded', () => {
    const userBody = document.getElementById('user-body');
    const totalUsersEl = document.getElementById('total-users');
    const searchInput = document.getElementById('user-search');
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-user-form');

    // Tabs
    const tabUsers = document.getElementById('tab-users');
    const tabLogs = document.getElementById('tab-logs');
    const viewUsers = document.getElementById('view-users');
    const viewLogs = document.getElementById('view-logs');
    const logsBody = document.getElementById('logs-body');

    let allUsers = [];
    let currentTab = 'users';

    // Fetch all users
    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token') || getCookie('void_token');
            const response = await fetch('/api/admin/users', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error('Unauthorized');

            allUsers = await response.json();
            renderUsers(allUsers);
            totalUsersEl.textContent = allUsers.length;
        } catch (err) {
            console.error('Failed to fetch users:', err);
            // If unauthorized, redirect to login
            if (err.message === 'Unauthorized') {
                window.location.href = '/login';
            }
        }
    };

    const renderUsers = (users) => {
        userBody.innerHTML = '';
        users.forEach(user => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.teamname}</td>
                <td>${user.email}</td>
                <td><span class="badge badge-level">LVL ${user.current_level}</span></td>
                <td>${user.is_admin ? '<span class="badge badge-admin">ADMIN</span>' : 'USER'}</td>
                <td class="action-btns">
                    <button class="edit-btn" onclick="openEditModal(${user.id})">EDIT</button>
                    <button class="delete-btn" onclick="deleteUser(${user.id}, '${user.username}')">DELETE</button>
                </td>
            `;
            userBody.appendChild(tr);
        });
    };

    // Fetch Logs
    const fetchLogs = async () => {
        try {
            const token = localStorage.getItem('token') || getCookie('void_token');
            const response = await fetch('/api/admin/logs', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch logs');

            const logs = await response.json();
            renderLogs(logs);
        } catch (err) {
            console.error(err);
        }
    };

    const renderLogs = (logs) => {
        logsBody.innerHTML = '';
        logs.forEach(log => {
            const tr = document.createElement('tr');
            // Format timestamp nicely
            const date = new Date(log.timestamp);
            const timeStr = date.toISOString().replace('T', ' ').substring(0, 19);

            tr.innerHTML = `
                <td style="font-family: 'Space Mono', monospace; font-size: 0.8rem; opacity: 0.8;">${timeStr}</td>
                <td>${log.username}</td>
                <td>${log.teamname}</td>
                <td><span class="badge badge-level">LVL ${log.level}</span></td>
                <td style="font-family: 'Space Mono', monospace; font-size: 0.85rem; color: #ff6b6b; word-break: break-all;">${log.prompt}</td>
            `;
            logsBody.appendChild(tr);
        });
    };

    // Tab Switching
    tabUsers.addEventListener('click', () => {
        currentTab = 'users';
        tabUsers.classList.add('active');
        tabLogs.classList.remove('active');
        viewUsers.style.display = 'block';
        viewLogs.style.display = 'none';
        fetchUsers();
    });

    tabLogs.addEventListener('click', () => {
        currentTab = 'logs';
        tabLogs.classList.add('active');
        tabUsers.classList.remove('active');
        viewLogs.style.display = 'block';
        viewUsers.style.display = 'none';
        fetchLogs();
    });

    // Filter users
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allUsers.filter(u =>
            u.username.toLowerCase().includes(term) ||
            u.teamname.toLowerCase().includes(term) ||
            u.email.toLowerCase().includes(term)
        );
        renderUsers(filtered);
    });

    // Delete User
    window.deleteUser = async (id, username) => {
        if (!confirm(`Are you sure you want to PERMANENTLY REMOVE operative ${username}? This action is irreversible.`)) {
            return;
        }

        try {
            const token = localStorage.getItem('token') || getCookie('void_token');
            const response = await fetch(`/api/admin/user/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                fetchUsers();
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to delete user');
            }
        } catch (err) {
            console.error('Error deleting user:', err);
        }
    };

    // Edit User
    window.openEditModal = (id) => {
        const user = allUsers.find(u => u.id === id);
        if (!user) return;

        document.getElementById('edit-user-id').value = user.id;
        document.getElementById('edit-username').value = user.username;
        document.getElementById('edit-teamname').value = user.teamname;
        document.getElementById('edit-email').value = user.email;
        document.getElementById('edit-level').value = user.current_level;
        document.getElementById('edit-admin').value = user.is_admin.toString();

        editModal.classList.add('active');
    };

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('edit-user-id').value;
        const payload = {
            username: document.getElementById('edit-username').value,
            teamname: document.getElementById('edit-teamname').value,
            email: document.getElementById('edit-email').value,
            current_level: document.getElementById('edit-level').value,
            is_admin: document.getElementById('edit-admin').value === 'true'
        };

        try {
            const token = localStorage.getItem('token') || getCookie('void_token');
            const response = await fetch(`/api/admin/user/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                editModal.classList.remove('active');
                fetchUsers();
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to update user');
            }
        } catch (err) {
            console.error('Error updating user:', err);
        }
    });

    // Modal Close
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            editModal.classList.remove('active');
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === editModal) {
            editModal.classList.remove('active');
        }
    });

    // Helper for cookies
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    fetchUsers();

    // Auto-refresh every 10 seconds
    setInterval(() => {
        if (currentTab === 'users') {
            if (!editModal.classList.contains('active') && searchInput.value.trim() === '') {
                fetchUsers();
            }
        } else if (currentTab === 'logs') {
            fetchLogs();
        }
    }, 10000);

    // Flush Database
    const flushBtn = document.getElementById('flush-btn');
    if (flushBtn) {
        flushBtn.addEventListener('click', async () => {
            const confirm1 = confirm("WARNING: This will permanently delete ALL non-admin users and completely wipe the scoreboard. Are you absolutely sure?");
            if (!confirm1) return;

            const confirm2 = prompt("To proceed, type exactly: FLUSH");
            if (confirm2 !== "FLUSH") {
                alert("Flush cancelled.");
                return;
            }

            try {
                const token = localStorage.getItem('token') || getCookie('void_token');
                const response = await fetch('/api/admin/flush', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    alert("System flushed successfully. All progress and user accounts reset.");
                    fetchUsers();
                } else {
                    const data = await response.json();
                    alert(data.error || 'Failed to flush database');
                }
            } catch (err) {
                console.error("Error flushing database:", err);
            }
        });
    }
});
