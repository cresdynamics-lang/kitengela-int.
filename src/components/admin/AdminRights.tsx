import { useState, useEffect } from 'react'
import styles from './admin.module.css'
import { adminApi } from '@/lib/api'

interface Admin {
  id: number
  username: string
  email: string
  full_name: string
  role: string
  is_super_admin: boolean
  created_at: string
}

export default function AdminRights() {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    full_name: '',
    role: 'admin',
    is_super_admin: false
  })

  useEffect(() => {
    fetchAdmins()
  }, [])

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      if (!token) return

      const response = await adminApi.getAdmins(token)
      if (response.success && Array.isArray(response.data)) {
        setAdmins(response.data as Admin[])
      }
    } catch (error: any) {
      console.error('Error fetching admins:', error)
      if (error.response?.status === 403) {
        alert('You do not have permission to view admins')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('adminToken')
    const apiUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || ''
    
    try {
      if (editingId) {
        // Update admin
        const response = await fetch(`${apiUrl}/api/admin/admins/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            full_name: formData.full_name,
            role: formData.role
          })
        })
        const data = await response.json()
        if (data.success) {
          fetchAdmins()
          resetForm()
        } else {
          alert(data.error || 'Failed to update admin')
        }
      } else {
        // Create admin
        if (!formData.password) {
          alert('Password is required for new admins')
          return
        }
        const response = await fetch(`${apiUrl}/api/admin/admins`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        })
        const data = await response.json()
        if (data.success) {
          fetchAdmins()
          resetForm()
        } else {
          alert(data.error || 'Failed to create admin')
        }
      }
    } catch (error) {
      alert('Error saving admin')
    }
  }

  const handleEdit = (admin: Admin) => {
    setFormData({
      username: admin.username,
      email: admin.email,
      password: '',
      full_name: admin.full_name || '',
      role: admin.role,
      is_super_admin: admin.is_super_admin
    })
    setEditingId(admin.id)
    setShowForm(true)
  }

  const handleRoleUpdate = async (id: number, role: string, isSuperAdmin: boolean) => {
    const token = localStorage.getItem('adminToken')
    const apiUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || ''
    
    try {
      const response = await fetch(`${apiUrl}/api/admin/admins/${id}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role, is_super_admin: isSuperAdmin })
      })
      const data = await response.json()
      if (data.success) {
        fetchAdmins()
      } else {
        alert(data.error || 'Failed to update role')
      }
    } catch (error) {
      alert('Error updating role')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this admin?')) return
    
    try {
      const token = localStorage.getItem('adminToken')
      const apiUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || ''
      const response = await fetch(`${apiUrl}/api/admin/admins/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await response.json()
      if (data.success) {
        fetchAdmins()
      } else {
        alert(data.error || 'Failed to delete admin')
      }
    } catch (error) {
      alert('Error deleting admin')
    }
  }

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      full_name: '',
      role: 'admin',
      is_super_admin: false
    })
    setEditingId(null)
    setShowForm(false)
  }

  if (loading) return <div className={styles.loading}>Loading...</div>

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Admin Rights Management</h2>
        <button onClick={() => setShowForm(true)} className={styles.addButton}>
          + Add New Admin
        </button>
      </div>

      {showForm && (
        <div className={styles.formModal}>
          <div className={styles.formContent}>
            <h3>{editingId ? 'Edit' : 'Add'} Admin</h3>
            <form onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Username *</label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              {!editingId && (
                <div className={styles.formGroup}>
                  <label>Password *</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required={!editingId}
                  />
                </div>
              )}
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  >
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                    <option value="editor">Editor</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.is_super_admin}
                      onChange={(e) => setFormData({ ...formData, is_super_admin: e.target.checked })}
                    />
                    Super Admin
                  </label>
                </div>
              </div>
              <div className={styles.formActions}>
                <button type="submit" className={styles.saveButton}>Save</button>
                <button type="button" onClick={resetForm} className={styles.cancelButton}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className={styles.table}>
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Full Name</th>
              <th>Role</th>
              <th>Super Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.empty}>No admins found</td>
              </tr>
            ) : (
              admins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.username}</td>
                  <td>{admin.email}</td>
                  <td>{admin.full_name || '-'}</td>
                  <td>
                    <select
                      value={admin.role}
                      onChange={(e) => handleRoleUpdate(admin.id, e.target.value, admin.is_super_admin)}
                      className={styles.roleSelect}
                    >
                      <option value="admin">Admin</option>
                      <option value="moderator">Moderator</option>
                      <option value="editor">Editor</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={admin.is_super_admin}
                      onChange={(e) => handleRoleUpdate(admin.id, admin.role, e.target.checked)}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleEdit(admin)} className={styles.editButton}>Edit</button>
                    <button onClick={() => handleDelete(admin.id)} className={styles.deleteButton}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
