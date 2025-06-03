const Security = () => {
  return (
    <div className="profileCard">
      <div className="profileHeader">
        <h2>Security</h2>
        <p>Update your password and security settings.</p>
      </div>
      <div className="profileInfo">
        <span className="label">Two-Factor Auth:</span>
        <span className="value">Disabled</span>

        <span className="label">Last Password Change:</span>
        <span className="value">2 weeks ago</span>
      </div>
    </div>
  );
};

export default Security;
