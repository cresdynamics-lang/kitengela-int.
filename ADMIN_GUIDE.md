# VOSH Church Kitengela - Admin Dashboard Guide

## Quick Start

### Access Admin Dashboard
1. Navigate to: http://localhost:3000/admin/login
2. Login credentials:
   - **Username**: `admin`
   - **Password**: `admin123`

### Default Admin Account
- Username: `admin`
- Email: `admin@voshkitengela.org`
- Role: Super Admin
- Password: `admin123`

**⚠️ IMPORTANT**: Change the default password after first login!

## Admin Dashboard Features

### 1. Mass Sermons Management
Manage church sermons with the following features:

**Fields:**
- Title (required)
- Description
- Speaker
- Date (required)
- Video URL
- Audio URL
- Thumbnail URL
- Duration (in minutes)
- Views (auto-tracked)

**Actions:**
- ✅ Create new sermons
- ✅ Edit existing sermons
- ✅ Delete sermons
- ✅ View all sermons in a table

**API Endpoints:**
- `GET /api/admin/mass-sermons` - List all sermons
- `POST /api/admin/mass-sermons` - Create new sermon
- `PUT /api/admin/mass-sermons/:id` - Update sermon
- `DELETE /api/admin/mass-sermons/:id` - Delete sermon

### 2. Weekly Masses Management
Schedule and manage weekly church services:

**Fields:**
- Title (required)
- Week Start Date (required)
- Week End Date (required)
- Service Type (e.g., Sunday Service, Bible Study)
- Date (required)
- Time (required)
- Location
- Speaker
- Description
- Notes

**Actions:**
- ✅ Create new weekly masses
- ✅ Edit existing masses
- ✅ Delete masses
- ✅ View all masses in a table

**API Endpoints:**
- `GET /api/admin/weekly-masses` - List all weekly masses
- `POST /api/admin/weekly-masses` - Create new weekly mass
- `PUT /api/admin/weekly-masses/:id` - Update weekly mass
- `DELETE /api/admin/weekly-masses/:id` - Delete weekly mass

### 3. Update Links Management
Manage important links displayed on the website:

**Fields:**
- Title (required)
- URL (required)
- Description
- Category (e.g., Social Media, Resources)
- Display Order (for sorting)
- Active Status (toggle on/off)

**Actions:**
- ✅ Create new links
- ✅ Edit existing links
- ✅ Delete links
- ✅ Toggle active/inactive status
- ✅ Reorder links by display order

**API Endpoints:**
- `GET /api/admin/update-links` - List all links
- `POST /api/admin/update-links` - Create new link
- `PUT /api/admin/update-links/:id` - Update link
- `DELETE /api/admin/update-links/:id` - Delete link

### 4. Admin Rights Management
Manage admin users and their permissions:

**Fields:**
- Username (required, unique)
- Email (required, unique)
- Password (required for new admins)
- Full Name
- Role (admin, moderator, editor)
- Super Admin (checkbox)

**Roles:**
- **Admin**: Full access to all features
- **Moderator**: Can manage content but not admin rights
- **Editor**: Can only edit content, cannot delete

**Actions:**
- ✅ Create new admin users
- ✅ Edit admin details
- ✅ Change admin roles
- ✅ Grant/revoke super admin status
- ✅ Delete admin users (cannot delete yourself)

**API Endpoints:**
- `GET /api/admin/admins` - List all admins
- `POST /api/admin/admins` - Create new admin
- `PUT /api/admin/admins/:id` - Update admin
- `PUT /api/admin/admins/:id/role` - Update admin role
- `DELETE /api/admin/admins/:id` - Delete admin

## Database Schema

### Tables Created:
1. **admins** - Admin user accounts
2. **mass_sermons** - Church sermons
3. **weekly_masses** - Weekly service schedules
4. **update_links** - Important website links

### Database Connection:
- **Host**: localhost
- **Port**: 5432
- **Database**: voshkitengela
- **User**: postgres
- **Password**: Vosh@kitengela

## Security Features

1. **JWT Authentication**: All admin endpoints require valid JWT token
2. **Password Hashing**: Passwords are hashed using bcrypt
3. **Role-Based Access**: Different roles have different permissions
4. **Session Management**: Tokens expire after 24 hours

## Troubleshooting

### Cannot Login
- Verify default credentials: `admin` / `admin123`
- Check if backend server is running on port 3001
- Check browser console for errors
- Verify database connection

### Database Connection Issues
- Ensure PostgreSQL is running: `sudo systemctl status postgresql`
- Verify database exists: `psql -U postgres -l | grep voshkitengela`
- Check database password in `.env` file

### API Errors
- Check backend server logs
- Verify JWT_SECRET is set in environment
- Ensure all required fields are provided in forms

## Best Practices

1. **Change Default Password**: Immediately change the default admin password
2. **Create Additional Admins**: Don't rely on a single admin account
3. **Regular Backups**: Backup the database regularly
4. **Monitor Activity**: Review admin actions periodically
5. **Use Strong Passwords**: Enforce strong password policies

## API Authentication

All admin API endpoints require authentication:

```javascript
// Include token in request headers
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'
}
```

Tokens are stored in localStorage after login and automatically included in requests.

## Support

For issues or questions:
- Check server logs in backend terminal
- Review browser console for frontend errors
- Verify database connection and tables
- Check API endpoint responses
