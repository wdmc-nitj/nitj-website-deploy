import React, { useState, useEffect } from 'react';
const Dashboard = () => {
  const [adminUser, setAdminUser] = useState(null);  // State to store admin user data
  const [role, setRole] = useState(null);  // Store role separately

  useEffect(() => {
    // Fetch the current admin user details
    const fetchAdminUser = async () => {
      try {
        const response = await fetch('/api/dashboard/get-current-admin', {
          method: 'GET',
          credentials: 'include', // Ensure cookies/session are included
        });
        const data = await response.json();
        if (data.adminUser) {
          setAdminUser(data.adminUser);  // Set admin user data
          setRole(data.adminUser.role);  // Set the user's role from adminUser object
        }
      } catch (error) {
        console.error('Error fetching admin user:', error);
      }
    };

    fetchAdminUser();
  }, []);

  // Example handlers that use the fetched admin user info
  const handleClick = () => {
    window.location.href = '/api/dashboard/upload';
  };

  const navbar = () => {
    window.location.href ='/api/dashboard/navbar';
  };

  const commontemplate = () => {
    window.location.href = '/api/dashboard/store';
  };

  return (
    <div>
      <style>
        {`
          .dashboard-container { display: flex; flex-direction: column; align-items: center; padding: 20px; background-color: #f0f0f0; height: 100vh; }
         .heading {
  font-size: 35px;
  font-weight: 800;
  margin-bottom: 40px;
  color: #333;
  text-align: center;
  line-height: 1.5; /* Adjust this value for more or less space */
}

          .card-container { display: flex; justify-content: space-around; flex-wrap: wrap; width: 100%; max-width: 1200px; }
          .card { background-color: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); width: 220px; padding: 20px; margin: 10px; text-align: center; transition: transform 0.3s ease; }
          .card:hover { transform: scale(1.05); }
          .card-title { font-size: 1.2rem; margin-bottom: 15px; font-weight: 600; color: #333; }
          .custom-btn { background-color: #4da6ff; border: none; color: white; padding: 10px 20px; font-size: 14px; border-radius: 5px; cursor: pointer; transition: background-color 0.3s ease; }
          .custom-btn:hover { background-color: #3399ff; }
        `}
      </style>

      <div className="dashboard-container">
        <div className='heading '>WELCOME TO NITJ ADMIN DASHBOARD</div>
        <div className="card-container">
          {/* Conditionally render cards based on the role */}
          {role && (
            <div className="card">
              <div className="card-title">Upload Image</div>
              <button onClick={handleClick} className="custom-btn">Upload</button>
            </div>
          )}
          
          {role === 'admin' && (
            <div className="card">
              <div className="card-title">NavBar</div>
              <button onClick={navbar} className="custom-btn">Go to Nav</button>
            </div>
          )}

          {role === 'admin' && (
            <div className="card">
              <div className="card-title">Common Template</div>
              <button onClick={commontemplate} className="custom-btn">Go to CT</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
