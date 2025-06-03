const Settings = () => {
  return (
    <div className="profileCard">
      <div className="profileHeader">
        <h2>Settings</h2>
        <p>Manage your profile settings.</p>
      </div>
      <div className="profileInfo">
        <span className="label">Language:</span>
        <span className="value">English (US)</span>

        <span className="label">Theme:</span>
        <span className="value">Light</span>
      </div>
    </div>
  );
};

export default Settings;
