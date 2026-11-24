import { useState } from "react";
import { LockKeyhole, Settings as SettingsIcon, Trash2, Upload } from "lucide-react";
import PageHeader from "../components/PageHeader";

const initialProfile = {
  firstName: "Alex",
  lastName: "Carter",
  email: "alex.carter@resolve.com",
  phone: "+1 (555) 010-2400",
  gender: "Prefer not to say",
  location: "San Francisco, CA",
};

function Settings() {
  const [activeTab, setActiveTab] = useState("account");
  const [profile, setProfile] = useState(initialProfile);
  const [avatar, setAvatar] = useState("");
  const [notice, setNotice] = useState("");
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });

  const updateProfile = (event) => {
    event.preventDefault();
    setNotice("Profile updated for this session.");
  };

  const resetProfile = () => {
    setProfile(initialProfile);
    setAvatar("");
    setNotice("");
  };

  const updatePassword = (event) => {
    event.preventDefault();
    if (passwords.next !== passwords.confirm) {
      setNotice("New password and confirmation do not match.");
      return;
    }
    if (passwords.next.length < 8) {
      setNotice("Your new password must be at least 8 characters.");
      return;
    }
    setPasswords({ current: "", next: "", confirm: "" });
    setNotice("Password fields validated. Connect an authentication service to save this change.");
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(typeof reader.result === "string" ? reader.result : "");
    reader.readAsDataURL(file);
  };

  return (
    <>
      <PageHeader title="Settings" description="Manage your profile and account security." />
      <section className="surface-panel mx-auto max-w-5xl overflow-hidden">
        <div className="border-b border-stone-100 px-4 sm:px-6">
          <div className="flex gap-5">
            <button onClick={() => { setActiveTab("account"); setNotice(""); }} className={`border-b-2 py-3 text-[11px] font-semibold ${activeTab === "account" ? "border-[#a34b32] text-[#8e3d29]" : "border-transparent text-stone-500"}`} aria-current={activeTab === "account" ? "page" : undefined}>Account Settings</button>
            <button onClick={() => { setActiveTab("password"); setNotice(""); }} className={`border-b-2 py-3 text-[11px] font-semibold ${activeTab === "password" ? "border-[#a34b32] text-[#8e3d29]" : "border-transparent text-stone-500"}`} aria-current={activeTab === "password" ? "page" : undefined}>Password</button>
          </div>
        </div>

        {activeTab === "account" ? (
          <form onSubmit={updateProfile} className="px-4 py-5 sm:px-6">
            <div className="flex flex-wrap items-center gap-4 border-b border-stone-100 pb-5">
              <span className="grid h-16 w-16 place-items-center overflow-hidden rounded-full bg-[#eadbcf] text-lg font-semibold text-[#6b3b29]">
                {avatar ? <img src={avatar} alt="Profile" className="h-full w-full object-cover" /> : `${profile.firstName[0]}${profile.lastName[0]}`}
              </span>
              <div className="flex flex-wrap gap-2">
                <label className="flex cursor-pointer items-center gap-1.5 rounded-md bg-[#a34b32] px-3 py-2 text-[10px] font-semibold text-white hover:bg-[#8e3d29]">
                  <Upload size={12} /> Upload new
                  <input type="file" accept="image/*" className="sr-only" onChange={handleAvatarUpload} />
                </label>
                <button type="button" onClick={() => setAvatar("")} className="flex items-center gap-1.5 rounded-md border border-stone-200 px-3 py-2 text-[10px] text-stone-600"><Trash2 size={12} /> Remove photo</button>
              </div>
              <p className="basis-full text-[9px] text-stone-400 sm:ml-20">JPG or PNG. Use a square image for the best fit.</p>
            </div>

            <div className="grid gap-x-5 gap-y-4 py-5 sm:grid-cols-2">
              <label className="grid gap-1.5 text-[10px] font-medium text-stone-600">First name
                <input required value={profile.firstName} onChange={(event) => setProfile({ ...profile, firstName: event.target.value })} className="form-control" />
              </label>
              <label className="grid gap-1.5 text-[10px] font-medium text-stone-600">Last name
                <input required value={profile.lastName} onChange={(event) => setProfile({ ...profile, lastName: event.target.value })} className="form-control" />
              </label>
              <label className="grid gap-1.5 text-[10px] font-medium text-stone-600">Email
                <input required type="email" value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} className="form-control" />
              </label>
              <label className="grid gap-1.5 text-[10px] font-medium text-stone-600">Phone number
                <input type="tel" value={profile.phone} onChange={(event) => setProfile({ ...profile, phone: event.target.value })} className="form-control" />
              </label>
              <fieldset className="grid gap-2 text-[10px] font-medium text-stone-600">
                <legend>Gender</legend>
                <div className="flex flex-wrap gap-x-4 gap-y-2">
                  {["Female", "Male", "Prefer not to say"].map((gender) => <label className="flex items-center gap-1.5 font-normal" key={gender}><input type="radio" name="gender" checked={profile.gender === gender} onChange={() => setProfile({ ...profile, gender })} className="accent-[#a34b32]" />{gender}</label>)}
                </div>
              </fieldset>
              <label className="grid gap-1.5 text-[10px] font-medium text-stone-600">Location
                <input value={profile.location} onChange={(event) => setProfile({ ...profile, location: event.target.value })} className="form-control" />
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4">
              <p role="status" className="text-[10px] text-green-700">{notice}</p>
              <div className="ml-auto flex gap-2"><button type="button" onClick={resetProfile} className="secondary-button">Cancel</button><button type="submit" className="primary-button"><SettingsIcon size={12} /> Save Changes</button></div>
            </div>
          </form>
        ) : (
          <form onSubmit={updatePassword} className="px-4 py-5 sm:px-6">
            <div className="mb-5 flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-full bg-[#fff1e9] text-[#a34b32]"><LockKeyhole size={15} /></span><div><h2 className="text-xs font-bold">Change Password</h2><p className="text-[9px] text-stone-500">Choose a strong password to keep your account secure.</p></div></div>
            <div className="grid max-w-xl gap-4">
              {[["current", "Current password"], ["next", "New password"], ["confirm", "Confirm new password"]].map(([key, label]) => <label className="grid gap-1.5 text-[10px] font-medium text-stone-600" key={key}>{label}<input required type="password" autoComplete={key === "current" ? "current-password" : "new-password"} value={passwords[key]} onChange={(event) => setPasswords({ ...passwords, [key]: event.target.value })} className="form-control" /></label>)}
              <p className="text-[9px] text-stone-400">Use at least 8 characters.</p>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4">
              <p role="status" className={`text-[10px] ${notice.includes("match") || notice.includes("least") ? "text-rose-600" : "text-green-700"}`}>{notice}</p>
              <div className="ml-auto flex gap-2"><button type="button" onClick={() => { setPasswords({ current: "", next: "", confirm: "" }); setNotice(""); }} className="secondary-button">Cancel</button><button type="submit" className="primary-button">Update Password</button></div>
            </div>
          </form>
        )}
      </section>
    </>
  );
}

export default Settings;
