const Overview = () => {
  return (
    <div className="profileCard">
      <div className="profileHeader">
        <h2>Overview</h2>
        <p>Welcome to your profile overview.</p>
      </div>
      <div className="profileInfo">
        <span className="label">Account Type:</span>
        <span className="value">Customer</span>

        <span className="label">Status:</span>
        <span className="value">Active</span>

        <span className="label">Member Since:</span>
        <span className="value">June 2025</span>
      </div>
    </div>
  );
};

export default Overview;
