import React, { useState, useEffect } from 'react';

const UserProfileModal = ({ user, onClose }) => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  // User ရဲ့ ဝယ်ယူမှု စာရင်း (SaleList) ကို Backend API ကနေ ဆွဲယူခြင်း
  useEffect(() => {
    if (user && user.id) {
      fetch(`/api/sales/user/${user.id}`) // သင့် Backend Endpoint URL အတိုင်း ပြင်ပါ
        .then((res) => res.json())
        .then((data) => {
          setSales(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch sale list:", err);
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <div className="modal-overlay">
      <div className="user-profile-card">
        {/* Profile Info Section */}
        <div className="profile-header">
          <img src={user.avatar || "/default-avatar.png"} alt="Profile" />
          <h3>{user.username}</h3>
          <span className="badge">{user.role || 'CUSTOMER'}</span>
        </div>

        <div className="profile-details">
          <p><strong>Username / ID:</strong> {user.username}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.address}</p>
        </div>

        <hr />

        {/* New Sale List / Order History Section */}
        <div className="sale-history-section">
          <h4>ဝယ်ယူထားသည့် စာရင်းများ (Purchase History)</h4>
          
          {loading ? (
            <p>Loading sales history...</p>
          ) : sales.length === 0 ? (
            <p className="no-data">ဝယ်ယူထားသော စာရင်းမရှိသေးပါ။</p>
          ) : (
            <div className="table-responsive">
              <table className="sale-table">
                <thead>
                  <tr>
                    <th>Invoice / ID</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Total (MMK)</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale) => (
                    <tr key={sale.id}>
                      <td>#{sale.invoiceNo || sale.id}</td>
                      <td>{sale.date}</td>
                      <td>
                        {sale.items?.map(i => `${i.name} x${i.qty}`).join(', ')}
                      </td>
                      <td>{sale.totalAmount?.toLocaleString()} MMK</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal Action Buttons */}
        <div className="modal-actions">
          <button onClick={onClose} className="btn-close">Close</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;