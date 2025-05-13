// import React, { useState, useEffect } from 'react';
// const Dashboard = () => {
//   const [adminUser, setAdminUser] = useState(null);  // State to store admin user data
//   const [role, setRole] = useState(null);  // Store role separately

//   useEffect(() => {
//     // Fetch the current admin user details
//     const fetchAdminUser = async () => {
//       try {
//         const response = await fetch('/api/dashboard/get-current-admin', {
//           method: 'GET',
//           credentials: 'include', // Ensure cookies/session are included
//         });
//         const data = await response.json();
//         if (data.adminUser) {
//           setAdminUser(data.adminUser);  // Set admin user data
//           setRole(data.adminUser.role);  // Set the user's role from adminUser object
//         }
//       } catch (error) {
//         console.error('Error fetching admin user:', error);
//       }
//     };

//     fetchAdminUser();
//   }, []);

//   // Example handlers that use the fetched admin user info
//   const handleClick = () => {
//     window.location.href = '/api/dashboard/upload';
//   };

//   const navbar = () => {
//     window.location.href ='/api/dashboard/navbar';
//   };

//   const commontemplate = () => {
//     window.location.href = '/api/dashboard/store';
//   };

//   return (
//     <div>
//       <style>
//         {`
//           .dashboard-container { display: flex; flex-direction: column; align-items: center; padding: 20px; background-color: #f0f0f0; height: 100vh; }
//          .heading {
//   font-size: 35px;
//   font-weight: 800;
//   margin-bottom: 40px;
//   color: #333;
//   text-align: center;
//   line-height: 1.5; /* Adjust this value for more or less space */
// }

//           .card-container { display: flex; justify-content: space-around; flex-wrap: wrap; width: 100%; max-width: 1200px; }
//           .card { background-color: white; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); width: 220px; padding: 20px; margin: 10px; text-align: center; transition: transform 0.3s ease; }
//           .card:hover { transform: scale(1.05); }
//           .card-title { font-size: 1.2rem; margin-bottom: 15px; font-weight: 600; color: #333; }
//           .custom-btn { background-color: #4da6ff; border: none; color: white; padding: 10px 20px; font-size: 14px; border-radius: 5px; cursor: pointer; transition: background-color 0.3s ease; }
//           .custom-btn:hover { background-color: #3399ff; }
//         `}
//       </style>

//       <div className="dashboard-container">
//         <div className='heading '>WELCOME TO NITJ ADMIN DASHBOARD</div>
//         <div className="card-container">
//           {/* Conditionally render cards based on the role */}
//           {role && (
//             <div className="card">
//               <div className="card-title">Upload Image</div>
//               <button onClick={handleClick} className="custom-btn">Upload</button>
//             </div>
//           )}
          
//           {role === 'admin' && (
//             <div className="card">
//               <div className="card-title">NavBar</div>
//               <button onClick={navbar} className="custom-btn">Go to Nav</button>
//             </div>
//           )}

//           {(role === 'admin' || role==='diia') && (
//             <div className="card">
//               <div className="card-title">Common Template</div>
//               <button onClick={commontemplate} className="custom-btn">Go</button>
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [adminUser, setAdminUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminUser = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/dashboard/get-current-admin', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        if (data.adminUser) {
          setAdminUser(data.adminUser);
          setRole(data.adminUser.role);
        }
      } catch (error) {
        console.error('Error fetching admin user:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminUser();
  }, []);

  const handleClick = () => {
    window.location.href = '/api/dashboard/upload';
  };

  const navbar = () => {
    window.location.href = '/api/dashboard/navbar';
  };

  const commontemplate = () => {
    window.location.href = '/api/dashboard/store';
  };

  // Icons as SVG components
  const UploadIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>
  );

  const LayoutIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>
  );

  const DatabaseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
    </svg>
  );

  const UserIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );

  const LightningIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
    </svg>
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <style>
        {`
          /* Global Styles */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }

          html, body {
            height: 100%;
            overflow: hidden;
          }

          .dashboard-wrapper {
            height: 100vh;
            background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%);
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }

          /* Loading State */
          .loading-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background-color: #f5f7fa;
          }

          .spinner {
            width: 48px;
            height: 48px;
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            border-left-color: #3b82f6;
            animation: spin 1s linear infinite;
            margin-bottom: 16px;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Navigation Bar */
          .navbar {
            background-color: #ffffff;
            padding: 16px 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }

          .logo-container {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .logo-icon {
            color: #3b82f6;
          }

          .logo-text {
            font-weight: 700;
            font-size: 20px;
            color: #1f2937;
          }

          .user-profile {
            display: flex;
            align-items: center;
          }

          .user-avatar {
            background-color: #dbeafe;
            border-radius: 50%;
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #3b82f6;
          }

          .user-info {
            margin-left: 12px;
          }

          .user-name {
            font-size: 14px;
            font-weight: 500;
            color: #4b5563;
          }

          .user-role {
            font-size: 12px;
            color: #6b7280;
            text-transform: capitalize;
          }

          /* Main Content */
          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 16px;
            width: 100%;
            flex: 1;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
          }

          .dashboard-header {
            text-align: center;
            margin: 40px 0;
          }

          .dashboard-title {
            font-size: 32px;
            font-weight: 800;
            line-height: 1.2;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 8px;
            margin-bottom: 16px;
          }

          .title-welcome {
            color: #000000;
            white-space: nowrap;
          }

          .title-nitj {
            color: #7c3aed;
            white-space: nowrap;
          }

          .dashboard-subtitle {
            font-size: 16px;
            color: #6b7280;
            max-width: 600px;
            margin: 0 auto;
          }

          /* Card Grid */
          .card-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 32px;
            max-width: 1000px;
            margin: 0 auto;
            flex-grow: 1;
          }

          @media (min-width: 768px) {
            .card-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (min-width: 1024px) {
            .card-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }

          /* Cards */
          .card {
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
          }

          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          }

          /* Card Header Colors */
          .card-header-blue {
            height: 4px;
            background: linear-gradient(to right, #3b82f6, #2563eb);
          }

          .card-header-purple {
            height: 4px;
            background: linear-gradient(to right, #8b5cf6, #7c3aed);
          }

          .card-header-green {
            height: 4px;
            background: linear-gradient(to right, #10b981, #059669);
          }

          .card-body {
            padding: 24px;
          }

          .card-icon-container {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px auto;
          }

          .card-icon-blue {
            background-color: #dbeafe;
            color: #3b82f6;
          }

          .card-icon-purple {
            background-color: #ede9fe;
            color: #8b5cf6;
          }

          .card-icon-green {
            background-color: #d1fae5;
            color: #10b981;
          }

          .card-title {
            font-size: 20px;
            font-weight: 700;
            text-align: center;
            color: #1f2937;
            margin-bottom: 8px;
          }

          .card-description {
            text-align: center;
            color: #6b7280;
            margin-bottom: 24px;
            font-size: 14px;
            line-height: 1.5;
          }

          /* Buttons */
          .btn {
            width: 100%;
            padding: 12px 16px;
            border-radius: 8px;
            font-weight: 500;
            font-size: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            cursor: pointer;
            transition: background-color 0.3s ease;
            color: white;
          }

          .btn-blue {
            background-color: #3b82f6;
          }

          .btn-blue:hover {
            background-color: #2563eb;
          }

          .btn-purple {
            background-color: #8b5cf6;
          }

          .btn-purple:hover {
            background-color: #7c3aed;
          }

          .btn-green {
            background-color: #10b981;
          }

          .btn-green:hover {
            background-color: #059669;
          }

          .btn-icon {
            margin-left: 8px;
          }

          /* Footer */
          .footer {
            background-color: #ffffff;
            border-top: 1px solid #e5e7eb;
            padding: 24px 0;
            width: 100%;
            position: sticky;
            bottom: 0;
            z-index: 10;
          }

          .footer-text {
            text-align: center;
            color: #6b7280;
            font-size: 14px;
          }

          /* Ensure viewport fit for large screens */
          @media (min-width: 1024px) {
            .dashboard-wrapper {
              overflow: hidden;
            }
            .container {
              overflow: hidden;
            }
            .card-grid {
              height: 100%;
              align-content: start;
            }
          }
        `}
      </style>

      <div className="container">
        <header className="dashboard-header">
          <h1 className="dashboard-title">
            <span className="title-welcome">Welcome to</span>
            <span className="title-nitj">NITJ Admin Dashboard</span>
          </h1>
          <p className="dashboard-subtitle">
            Manage your content, configurations, and website components with ease
          </p>
        </header>

        <div className="card-grid">
          {role && (
            <div className="card">
              <div className="card-header-blue"></div>
              <div className="card-body">
                <div className="card-icon-container card-icon-blue">
                  <UploadIcon />
                </div>
                <h3 className="card-title">Upload Image</h3>
                <p className="card-description">Upload and manage images for your website content</p>
                <button onClick={handleClick} className="btn btn-blue">
                  <span>Upload Now</span>
                  <span className="btn-icon"><ArrowRightIcon /></span>
                </button>
              </div>
            </div>
          )}
          
          {role === 'admin' && (
            <div className="card">
              <div className="card-header-purple"></div>
              <div className="card-body">
                <div className="card-icon-container card-icon-purple">
                  <LayoutIcon />
                </div>
                <h3 className="card-title">Navigation Bar</h3>
                <p className="card-description">Configure and customize website navigation structure</p>
                <button onClick={navbar} className="btn btn-purple">
                  <span>Go to Nav</span>
                  <span className="btn-icon"><ArrowRightIcon /></span>
                </button>
              </div>
            </div>
          )}
          
          {(role === 'admin' || role === 'diia') && (
            <div className="card">
              <div className="card-header-green"></div>
              <div className="card-body">
                <div className="card-icon-container card-icon-green">
                  <DatabaseIcon />
                </div>
                <h3 className="card-title">Common Template</h3>
                <p className="card-description">Manage and deploy standardized content templates</p>
                <button onClick={commontemplate} className="btn btn-green">
                  <span>Go to Templates</span>
                  <span className="btn-icon"><ArrowRightIcon /></span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <footer className="footer">
        <div className="container">
          <p className="footer-text">
            © {new Date().getFullYear()} NITJ Admin Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;